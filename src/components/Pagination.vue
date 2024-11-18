<template>
  <div class="flex justify-center items-center space-x-4 mt-6">
    <button
      @click="$emit('prev')"
      :disabled="page === 1"
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
    >
      Попередня
    </button>
    <span>Сторінка {{ page }} з {{ totalPages }}</span>
    <button
      @click="$emit('next')"
      :disabled="page === totalPages"
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
    >
      Наступна
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped>

</style>
