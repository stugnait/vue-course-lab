<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Список товарів</h1>

    <div class="mb-4">
      <h2 class="text-lg font-semibold mb-2">Фільтри</h2>
      <div class="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">

        <div>
          <label for="filterName" class="block text-sm font-medium text-gray-700">Назва товару</label>
          <input
            id="filterName"
            v-model="filterName"
            type="text"
            placeholder="Введіть назву"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Ціна</label>
          <div class="flex space-x-2">
            <input
              v-model.number="filterMinPrice"
              type="number"
              placeholder="Мінімальна"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <input
              v-model.number="filterMaxPrice"
              type="number"
              placeholder="Максимальна"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>

        <div>
          <label for="filterCategory" class="block text-sm font-medium text-gray-700">Категорія</label>
          <select
            id="filterCategory"
            v-model="filterCategory"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Всі категорії</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="mb-4 flex justify-between items-center">
      <button @click="loadProducts" class="btn">Оновити товари</button>
      <div>
        <span class="mr-2">Сторінка {{ currentPage }} з {{ totalPages }}</span>
        <button @click="prevPage" :disabled="currentPage === 1" class="btn mr-2">Попередня</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="btn">Наступна</button>
      </div>
    </div>

    <div v-if="loading" class="text-center">Завантаження...</div>
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
      <button @click="loadProducts" class="ml-2 btn">Спробувати знову</button>
    </div>

    <div v-else>
      <div v-if="paginatedProducts.length === 0" class="text-center">Немає товарів для відображення.</div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" v-else>
        <ProductItem v-for="product in paginatedProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/store/useProductStore';
import { storeToRefs } from 'pinia';
import ProductItem from '../components/ProductItem.vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    ProductItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const productStore = useProductStore();

    const { products, loading, error, categories } = storeToRefs(productStore);
    const { getAllProducts, getAllCategories } = productStore;

    const filterName = ref('');
    const filterMinPrice = ref<number | null>(null);
    const filterMaxPrice = ref<number | null>(null);
    const filterCategory = ref<string | null>(null);

    const currentPage = ref(1);
    const productsPerPage = 6;

    const syncFiltersWithRoute = () => {
      const query = route.query;

      filterName.value = typeof query.name === 'string' ? query.name : '';
      filterMinPrice.value = typeof query.minPrice === 'string' ? parseFloat(query.minPrice) || null : null;
      filterMaxPrice.value = typeof query.maxPrice === 'string' ? parseFloat(query.maxPrice) || null : null;
      filterCategory.value = typeof query.category === 'string' ? query.category : '';
      currentPage.value = typeof query.page === 'string' ? parseInt(query.page) || 1 : 1;
    };

    watch(
      () => route.query,
      () => {
        syncFiltersWithRoute();
      },
      { immediate: true }
    );

    watch(
      [filterName, filterMinPrice, filterMaxPrice, filterCategory, currentPage],
      ([newName, newMinPrice, newMaxPrice, newCategory, newPage]) => {
        router.push({
          path: route.path,
          query: {
            name: newName || undefined,
            minPrice: newMinPrice != null ? newMinPrice.toString() : undefined,
            maxPrice: newMaxPrice != null ? newMaxPrice.toString() : undefined,
            category: newCategory || undefined,
            page: newPage !== 1 ? newPage.toString() : undefined,
          },
        });
      },
      { deep: true }
    );

    const loadProducts = async () => {
      await getAllProducts({ limit: 1000 });
      await getAllCategories();
    };

    onMounted(() => {
      loadProducts();
    });

    const filteredProducts = computed(() => {
      let filtered = products.value;

      if (filterName.value) {
        const nameLower = filterName.value.toLowerCase();
        filtered = filtered.filter((product) => product.title.toLowerCase().includes(nameLower));
      }

      if (filterMinPrice.value != null) {
        filtered = filtered.filter((product) => product.price >= filterMinPrice.value!);
      }

      if (filterMaxPrice.value != null) {
        filtered = filtered.filter((product) => product.price <= filterMaxPrice.value!);
      }

      if (filterCategory.value) {
        const categoryId = parseInt(filterCategory.value);
        filtered = filtered.filter((product) => product.category.id === categoryId);
      }

      return filtered;
    });

    const totalPages = computed(() => Math.ceil(filteredProducts.value.length / productsPerPage));

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * productsPerPage;
      const end = start + productsPerPage;
      return filteredProducts.value.slice(start, end);
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    watch(
      [filterName, filterMinPrice, filterMaxPrice, filterCategory],
      () => {
        if (currentPage.value !== 1) {
          currentPage.value = 1;
        }
      }
    );

    return {
      loading,
      error,
      categories,
      filterName,
      filterMinPrice,
      filterMaxPrice,
      filterCategory,
      currentPage,
      totalPages,
      paginatedProducts,
      loadProducts,
      prevPage,
      nextPage,
    };
  },
});
</script>

<style scoped>
.btn {
  @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
