<template>
  <div class="border rounded shadow hover:shadow-lg transition">
    <img :src="product.images[0]" alt="" class="w-full h-48 object-cover rounded-t" />
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">{{ product.title }}</h2>
      <p class="text-gray-700 mb-4">{{ product.price }} грн</p>
      <div class="flex justify-between">
        <router-link :to="`/product/${product.id}`" class="text-blue-500 hover:underline">
          Детальніше
        </router-link>
        <button @click="toggleFavorite" :class="favoriteClass" class="px-3 py-1 rounded">
          {{ isFavorite ? 'Видалити з улюбленого' : 'Додати в улюблене' }}
        </button>
      </div>
      <button @click="addToCart" class="mt-2 w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
        В кошик
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { Product } from '@/types/Product';
import { useCartStore } from '@/store/useCartStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default defineComponent({
  name: 'ProductItem',
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCartStore();
    const favoriteStore = useFavoriteStore();

    const addToCart = () => {
      cartStore.addToCart(props.product);
    };

    const isFavorite = computed(() => {
      return favoriteStore.favorites.some((item) => item.id === props.product.id);
    });

    const toggleFavorite = () => {
      if (isFavorite.value) {
        favoriteStore.removeFromFavorites(props.product.id);
      } else {
        favoriteStore.addToFavorites(props.product);
      }
    };

    const favoriteClass = computed(() => {
      return isFavorite.value
        ? 'bg-red-600 text-white hover:bg-red-700'
        : 'bg-yellow-500 text-white hover:bg-yellow-600';
    });

    return {
      addToCart,
      toggleFavorite,
      isFavorite,
      favoriteClass,
    };
  },
});
</script>

<style scoped>

</style>
