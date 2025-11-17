<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '~/components/layout/Navbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

// Track if Navbar overlay (categories dropdown/sidebar) is active
const showOverlay = ref(false)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar/Header -->
    <Navbar v-model:show-overlay="showOverlay" />

    <!-- Page Content -->
    <main
      :class="{ 'blur-sm pointer-events-none': showOverlay }"
      class="flex-1 transition-all duration-300"
    >
      <NuxtPage />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style>
/* Smooth blur transition */
.blur-sm {
  filter: blur(4px);
}
</style>
