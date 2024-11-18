<template>
  <div class="bg-gray-100 p-4 rounded mb-6">
    <h3 class="text-lg mb-4">Фільтри</h3>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block mb-1">Назва продукту</label>
        <input
          v-model="localFilters.title"
          type="text"
          placeholder="Введіть назву"
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <div class="flex space-x-4">
        <div class="flex-1">
          <label class="block mb-1">Мінімальна ціна</label>
          <input
            v-model.number="localFilters.price_min"
            type="number"
            placeholder="0"
            class="w-full px-3 py-2 border rounded"
          />
        </div>
        <div class="flex-1">
          <label class="block mb-1">Максимальна ціна</label>
          <input
            v-model.number="localFilters.price_max"
            type="number"
            placeholder="1000"
            class="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
      <div>
        <label class="block mb-1">Категорія</label>
        <select v-model="localFilters.category" class="w-full px-3 py-2 border rounded">
          <option value="">Всі категорії</option>
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Застосувати
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchCategories } from '@/api/categories';
import type { Category } from '@/types/Product';

export default defineComponent({
  name: 'Filters',
  props: {
    filters: {
      type: Object,
      required: true,
    },
  },
  emits: ['apply-filters'],
  setup(props, { emit }) {
    const localFilters = ref({ ...props.filters });
    const categories = ref<Category[]>([]);

    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        categories.value = data;
      } catch (error) {
        console.error('Помилка при завантаженні категорій:', error);
      }
    };

    const onSubmit = () => {
      emit('apply-filters', localFilters.value);
    };

    onMounted(() => {
      loadCategories();
    });

    return {
      localFilters,
      categories,
      onSubmit,
    };
  },
});
</script>

<style scoped>

</style>
