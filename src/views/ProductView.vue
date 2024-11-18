<template>
  <div v-if="loading" class="text-center">Завантаження...</div>
  <div v-else-if="error" class="text-center text-red-500">
    {{ error }}
    <button @click="loadProduct" class="ml-2 btn">Спробувати знову</button>
  </div>
  <div v-else-if="product" class="flex flex-col md:flex-row space-x-0 md:space-x-6">
    <img :src="product.images[0]" alt="" class="w-full md:w-1/2 h-auto object-cover rounded" />
    <div class="mt-4 md:mt-0">
      <h1 class="text-3xl font-bold mb-2">{{ product.title }}</h1>
      <p class="text-gray-700 mb-4">{{ product.description }}</p>
      <p class="text-2xl font-semibold mb-4">{{ product.price }} грн</p>
      <div class="flex space-x-4">
        <button @click="addToCart(product)" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Додати в кошик
        </button>
        <button @click="toggleFavorite" :class="favoriteClass" class="px-4 py-2 rounded">
          {{ isFavorite ? 'Видалити з улюбленого' : 'Додати в улюблене' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import type { Product } from '@/types/Product';

export default defineComponent({
  name: 'ProductView',
  setup() {
    const route = useRoute();
    const productStore = useProductStore();
    const cartStore = useCartStore();
    const favoriteStore = useFavoriteStore();

    const { product, loading, error, getProductById } = productStore;

    const loadProduct = async () => {
      const id = Number(route.params.id);
      await getProductById(id);
    };

    const addToCart = (product: Product) => {
      cartStore.addToCart(product);
    };

    const isFavorite = computed(() => {
      return favoriteStore.favorites.some((item) => item.id === product?.id);
    });

    const toggleFavorite = () => {
      if (product) {
        if (isFavorite.value) {
          favoriteStore.removeFromFavorites(product.id);
        } else {
          favoriteStore.addToFavorites(product);
        }
      }
    };

    const favoriteClass = computed(() => {
      return isFavorite.value
        ? 'bg-red-600 text-white hover:bg-red-700'
        : 'bg-yellow-500 text-white hover:bg-yellow-600';
    });

    onMounted(() => {
      loadProduct();
    });

    return {
      product,
      loading,
      error,
      addToCart,
      toggleFavorite,
      isFavorite,
      favoriteClass,
      loadProduct,
    };
  },
});
</script>

<style scoped>
.btn {
  @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
}
</style>
