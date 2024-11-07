<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
    <img :src="product.images[0]" :alt="product.title" />
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }} $</p>
    <button @click="addToCart">Add to Cart</button>
    <button @click="addToFavorites">Add to Favorites</button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/store/products';
import { useCartStore } from '@/store/cart';
import { useFavoritesStore } from '@/store/favorites';
import type { Product } from '@/types/products';

export default defineComponent({
  name: 'ProductDetails',
  setup() {
    const route = useRoute();
    const productsStore = useProductsStore();
    const cartStore = useCartStore();
    const favoritesStore = useFavoritesStore();

    const product = ref<Product | null>(null);

    const fetchProduct = async () => {
      const productId = Number(route.params.id);
      product.value = await productsStore.getProductById(productId);
    };

    const addToCart = () => {
      if (product.value) {
        cartStore.addToCart(product.value);
      }
    };

    const addToFavorites = () => {
      if (product.value) {
        favoritesStore.addToFavorites(product.value);
      }
    };

    onMounted(() => {
      fetchProduct();
    });

    return {
      product,
      addToCart,
      addToFavorites,
    };
  },
});
</script>

<style scoped>
/* your styles here */
</style>