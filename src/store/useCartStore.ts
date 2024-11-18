import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from '@/types/Product';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Product[]>([]);

  const addToCart = (product: Product) => {
    const exists = cart.value.find((item) => item.id === product.id);
    if (!exists) {
      cart.value.push(product);
    }
  };

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
  };

  const clearCart = () => {
    cart.value = [];
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
}, {
  persist: true,
});
