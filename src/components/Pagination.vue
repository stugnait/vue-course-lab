<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
      Previous
    </button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['changePage'],
  setup(props, { emit }) {
    const changePage = (page: number) => {
      if (page >= 1 && page <= props.totalPages) {
        emit('changePage', page);
      }
    };

    return {
      changePage,
    };
  },
});
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>