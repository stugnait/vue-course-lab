<template>
  <div>
    <h1>Products</h1>
    <ProductFilters
        :filters="filters"
        :categories="categories"
        @updateFilters="updateFilters"
    />
    <ProductList :products="products" />
    <Pagination
        :currentPage="filters.page"
        :totalPages="totalPages"
        @changePage="changePage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from '@/store/products';
import ProductFilters from '@/components/ProductFilters.vue';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'Products',
  components: {
    ProductFilters,
    ProductList,
    Pagination,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const productsStore = useProductsStore();

    const filters = reactive({
      category: Number(route.params.category) || null,
      search: (Array.isArray(route.query.search) ? route.query.search[0] : route.query.search) || '',
      minPrice: Number(route.query.minPrice) || 0,
      maxPrice: Number(route.query.maxPrice) || Infinity,
      page: Number(route.query.page) || 1,
    });

    const updateFilters = (newFilters: any) => {
      Object.assign(filters, newFilters);
      router.push({ query: { ...filters } });
    };

    const fetchProducts = () => {
      productsStore.fetchProducts(filters);
    };

    onMounted(() => {
      productsStore.fetchCategories();
      fetchProducts();
    });

    watch(
        () => route.fullPath,
        () => {
          Object.assign(filters, {
            category: Number(route.params.category) || null,
            search: (Array.isArray(route.query.search) ? route.query.search[0] : route.query.search) || '',
            minPrice: Number(route.query.minPrice) || 0,
            maxPrice: Number(route.query.maxPrice) || Infinity,
            page: Number(route.query.page) || 1,
          });
          fetchProducts();
        }
    );

    return {
      filters,
      products: productsStore.products,
      categories: productsStore.categories,
      totalPages: productsStore.totalPages,
      updateFilters,
      changePage: (page: number) => {
        filters.page = page;
        router.push({ query: { ...filters, page } });
      },
    };
  },
});
</script>

<style scoped>
/* your styles here */
</style>