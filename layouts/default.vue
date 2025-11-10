<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <!-- 🧭 Navbar -->
    <Navbar />

    <!-- 🌐 Main Content -->
    <main class="flex-1">
      <div class="w-full  py-6 sm:py-8 flex flex-col">
        <slot />
      </div>
    </main>

    <!-- ⚓ Footer -->
    <AppFooter />
  </div>
</template>
