<template>
  <header class="bg-blue-600 text-white">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold">GoodStore</router-link>
      <div class="space-x-4">
        <router-link to="/" class="hover:underline">Головна</router-link>
        <router-link to="/cart" class="hover:underline">Кошик ({{ cartCount }})</router-link>
        <router-link to="/favorites" class="hover:underline">Улюблене ({{ favoriteCount }})</router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCartStore } from '@/store/useCartStore';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default defineComponent({
  name: 'Header',
  setup() {
    const cartStore = useCartStore();
    const favoriteStore = useFavoriteStore();

    const cartCount = computed(() => cartStore.cart.length);
    const favoriteCount = computed(() => favoriteStore.favorites.length);

    return {
      cartCount,
      favoriteCount,
    };
  },
});
</script>

<style scoped>

</style>
