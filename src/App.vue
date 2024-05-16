<script setup lang="ts">
import { Notifications } from '@kyvg/vue3-notification';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <RouterView />
  <Notifications position="top center" width="100%"/>
</template>

<style scoped>
</style>
