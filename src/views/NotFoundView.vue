<template>
  <div class="text-center">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-xl mb-6">Сторінку не знайдено</p>
    <router-link to="/" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Повернутися на головну
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFoundView',
});
</script>

<style scoped>
</style>
