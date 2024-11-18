<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-6">
      <router-view />
    </main>
    <TeamFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import TeamFooter from './components/TeamFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    TeamFooter,
  },
});
</script>

<style>
</style>
