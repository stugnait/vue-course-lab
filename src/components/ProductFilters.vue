<template>
  <div class="filters">
    <input
        type="text"
        v-model="localFilters.search"
        placeholder="Search..."
        @input="updateFilters"
    />
    <input
        type="number"
        v-model.number="localFilters.minPrice"
        placeholder="Min Price"
        @input="updateFilters"
    />
    <input
        type="number"
        v-model.number="localFilters.maxPrice"
        placeholder="Max Price"
        @input="updateFilters"
    />
    <select v-model="localFilters.category" @change="updateFilters">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import type { PropType } from 'vue';
import type { Category } from '@/types/category';

export default defineComponent({
  name: 'ProductFilters',
  props: {
    filters: {
      type: Object as PropType<{
        search: string;
        minPrice: number | null;
        maxPrice: number | null;
        category: number | null;
      }>,
      required: true,
    },
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
  },
  emits: ['updateFilters'],
  setup(props, { emit }) {
    const localFilters = reactive({
      search: props.filters.search,
      minPrice: props.filters.minPrice,
      maxPrice: props.filters.maxPrice,
      category: props.filters.category,
    });

    const updateFilters = () => {
      emit('updateFilters', { ...localFilters });
    };

    return {
      localFilters,
      categories: props.categories,
      updateFilters,
    };
  },
});
</script>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
