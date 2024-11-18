<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Кошик</h1>
    <div v-if="cart.length === 0" class="text-center">Ваш кошик порожній.</div>
    <div v-else>
      <table class="w-full table-auto">
        <thead>
        <tr>
          <th class="px-4 py-2">Продукт</th>
          <th class="px-4 py-2">Ціна</th>
          <th class="px-4 py-2">Дії</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cart" :key="item.id" class="text-center">
          <td class="border px-4 py-2">
            <router-link :to="`/product/${item.id}`" class="text-blue-500 hover:underline">
              {{ item.title }}
            </router-link>
          </td>
          <td class="border px-4 py-2">{{ item.price }} грн</td>
          <td class="border px-4 py-2">
            <button @click="removeFromCart(item.id)" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Видалити
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="mt-4 text-right">
        <span class="font-semibold">Разом: {{ totalPrice }} грн</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCartStore } from '@/store/useCartStore';


export default defineComponent({
  name: 'CartView',
  setup() {
    const cartStore = useCartStore();

    const cart = computed(() => cartStore.cart);

    const removeFromCart = (productId: number) => {
      cartStore.removeFromCart(productId);
    };

    const totalPrice = computed(() => {
      return cart.value.reduce((total, item) => total + item.price, 0);
    });

    return {
      cart,
      removeFromCart,
      totalPrice,
    };
  },
});
</script>

<style scoped>

</style>
