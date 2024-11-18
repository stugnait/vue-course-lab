<template>
  <footer class="bg-gray-800 text-white p-4 mt-8">
    <div class="container mx-auto">
      <h2 class="text-lg mb-2">Наша команда</h2>
      <ul class="space-y-1">
        <li>
          Тесліцький Ігор Юрійович 343-3 - <a href="https://github.com/stugnait" target="_blank" class="text-blue-400 underline">stugnait</a>
        </li>
        <li>
          Пазюк Олександр 343-4 - <a href="https://github.com/xsour" target="_blank" class="text-blue-400 underline">xsour</a>
        </li>
        <li>
          Гавриш Дмитро Олексійович 343-2 - <a href="https://github.com/dimahavrysh" target="_blank" class="text-blue-400 underline">DimaHavrysh</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TeamFooter',
});
</script>

<style scoped>

</style>
