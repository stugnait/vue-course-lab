<template>
  <div class="product-card">
    <img :src="product.images[0]" :alt="product.title" class="product-image" />
    <h3>{{ product.title }}</h3>
    <p class="price">{{ product.price }} $</p>
    <button @click="addToCart">Add to Cart</button>
    <button @click="addToFavorites">Add to Favorites</button>
    <router-link :to="`/products/${product.category}/${product.id}`">More Details</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Product } from '@/types/products';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCartStore();
    const favoritesStore = useFavoritesStore();

    const addToCart = () => {
      cartStore.addToCart(props.product);
    };

    const addToFavorites = () => {
      favoritesStore.addToFavorites(props.product);
    };

    return {
      addToCart,
      addToFavorites,
    };
  },
});
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}
</style>