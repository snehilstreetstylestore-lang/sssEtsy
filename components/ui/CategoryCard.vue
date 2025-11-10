<script setup lang="ts">
import type { Category } from '~/data/categories'

interface Props {
  category: Category
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- Card -->
    <NuxtLink
      :to="`/category/${category.slug}`"
      class="group relative w-full max-w-[220px] 
             aspect-[4/5] sm:aspect-[4/5] md:aspect-[4/5] lg:aspect-[4/5] 
             bg-white border border-slate-200 overflow-hidden rounded-2xl 
             shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
    >
      <!-- Image -->
      <img
        :src="category.image"
        :alt="category.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
      />

      <!-- Overlay effect on hover -->
      <div
        class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl"
      ></div>
    </NuxtLink>

    <!-- Title below card -->
    <h3
      class="mt-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-slate-800 
             text-center truncate w-full px-2 hover:text-slate-900 transition-all"
    >
      {{ category.name }}
    </h3>
  </div>
</template>

<style scoped>
/* Optional: smooth scaling effect for smaller screens */
.group:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>
