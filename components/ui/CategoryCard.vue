<script setup lang="ts">
import type { Category } from '~/data/categories'

interface Props {
  category: Category
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center">
    <NuxtLink
      :to="`/category/${category.slug}`"
      class="group relative w-full max-w-[200px] 
             min-w-[120px] min-h-[120px] 
             aspect-square
             bg-white border border-slate-200 overflow-hidden rounded-2xl 
             shadow-sm transition-all duration-300 
             hover:shadow-lg hover:-translate-y-1 hover:scale-[1.04]"
    >
      <img
        :src="category.image || '/default-collection.jpg'"
        :alt="category.name"
        class="w-full h-full object-cover rounded-2xl 
               transition-transform duration-300 group-hover:scale-110"
      />

      <div
        class="absolute inset-0 bg-black/20 opacity-0
               group-hover:opacity-40 transition-opacity duration-300 rounded-2xl"
      ></div>
    </NuxtLink>

    <h3
      class="mt-2 text-sm sm:text-base font-medium text-slate-800 
             text-center truncate w-full px-2 hover:text-slate-900 transition-colors"
    >
      {{ category.name }}
    </h3>
  </div>
</template>

<style scoped>
.group:hover img {
  transform: scale(1.1);
}
</style>
