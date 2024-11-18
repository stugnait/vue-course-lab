<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useProductStore } from '@/store/useProductStore';
import Filters from './Filters.vue';
import ProductItem from './ProductItem.vue';
import Pagination from './Pagination.vue';
import { useRoute, useRouter } from 'vue-router';
import type { Product } from '@/types/Product';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'ProductList',
  components: {
    Filters,
    ProductItem,
    Pagination,
  },
  setup() {
    const productStore = useProductStore();
    const { products, loading, error } = storeToRefs(productStore); // Використовуємо storeToRefs
    const { getAllProducts, getAllCategories } = productStore;

    const route = useRoute();
    const router = useRouter();

    const page = ref<number>(Number(route.query.page) || 1);
    const limit = 9;

    const filters = ref({
      title: (route.query.title as string) || '',
      price_min: Number(route.query.price_min) || null,
      price_max: Number(route.query.price_max) || null,
      category: (route.query.category as string) || '',
    });

    const applyFilters = (newFilters: any) => {
      filters.value = newFilters;
      page.value = 1;
      updateRoute();
    };

    const updateRoute = () => {
      const query: any = {
        page: page.value,
        ...filters.value,
      };
      router.push({ query });
    };

    const loadProducts = async () => {
      const params: any = {
        limit: 1000,
      };

      if (filters.value.title) params.title = filters.value.title;
      if (filters.value.price_min) params.price_min = filters.value.price_min;
      if (filters.value.price_max) params.price_max = filters.value.price_max;
      if (filters.value.category) params.category = filters.value.category;

      await getAllProducts(params);
    };

    const filteredProducts = computed(() => {
      return products.value.filter((product: Product) => { // Додаємо тип
        const matchesTitle = filters.value.title
          ? product.title.toLowerCase().includes(filters.value.title.toLowerCase())
          : true;
        const matchesPriceMin = filters.value.price_min
          ? product.price >= filters.value.price_min
          : true;
        const matchesPriceMax = filters.value.price_max
          ? product.price <= filters.value.price_max
          : true;
        const matchesCategory = filters.value.category
          ? product.category.name === filters.value.category
          : true;
        return matchesTitle && matchesPriceMin && matchesPriceMax && matchesCategory;
      });
    });

    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / limit));

    const paginatedProducts = computed(() => {
      const start = (page.value - 1) * limit;
      return filteredProducts.value.slice(start, start + limit);
    });

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        updateRoute();
      }
    };

    const nextPage = () => {
      if (page.value < totalPages.value) {
        page.value++;
        updateRoute();
      }
    };

    watch(
      () => route.query,
      () => {
        page.value = Number(route.query.page) || 1;
        filters.value.title = (route.query.title as string) || '';
        filters.value.price_min = Number(route.query.price_min) || null;
        filters.value.price_max = Number(route.query.price_max) || null;
        filters.value.category = (route.query.category as string) || '';
        loadProducts();
      },
      { immediate: true }
    );

    onMounted(() => {
      loadProducts();
      getAllCategories();
    });

    return {
      loading,
      error,
      paginatedProducts,
      page,
      totalPages,
      applyFilters,
      prevPage,
      nextPage,
      loadProducts,
      filters,
    };
  },
});
</script>
