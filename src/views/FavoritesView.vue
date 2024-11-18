<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Улюблене</h1>
    <div v-if="favorites.length === 0" class="text-center">Ваш список улюбленого порожній.</div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductItem
          v-for="item in favorites"
          :key="item.id"
          :product="item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useFavoriteStore } from '@/store/useFavoriteStore';
import ProductItem from '../components/ProductItem.vue';


export default defineComponent({
  name: 'FavoritesView',
  components: {
    ProductItem,
  },
  setup() {
    const favoriteStore = useFavoriteStore();

    const favorites = computed(() => favoriteStore.favorites);

    return {
      favorites,
    };
  },
});
</script>

<style scoped>

</style>
