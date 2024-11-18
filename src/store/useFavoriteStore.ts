import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '@/types/Product';

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<Product[]>([]);

  const addToFavorites = (product: Product) => {
    const exists = favorites.value.find((item) => item.id === product.id);
    if (!exists) {
      favorites.value.push(product);
    }
  };

  const removeFromFavorites = (productId: number) => {
    favorites.value = favorites.value.filter((item) => item.id !== productId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
  };
}, {
  persist: true,
});
