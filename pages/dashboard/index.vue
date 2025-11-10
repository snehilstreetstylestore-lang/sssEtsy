<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

import { useUserStore } from '~/stores/user'
import { products } from '~/data/products'
import BaseButton from '~/components/ui/BaseButton.vue'

const userStore = useUserStore()
const userProducts = computed(() => products.slice(0, 3))
</script>

<template>
  <div class="space-y-5 px-4 sm:px-6 lg:px-8 py-4">
    <!-- Navbar / Header -->
    <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
      <div class="flex-1 min-w-0">
        <h1 class="text-base sm:text-lg font-semibold tracking-tight">
          Seller overview
        </h1>
        <p class="text-xs sm:text-sm text-slate-600 mt-1">
          Dashboard overview of your shop, metrics, and recent listings.
        </p>
      </div>
      <BaseButton variant="secondary" class="whitespace-nowrap mt-2 sm:mt-0 text-sm sm:text-base px-3 py-1.5">
        View shop preview
      </BaseButton>
    </header>

    <!-- Metrics Grid -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <!-- User Info -->
      <div class="bg-slate-900 text-white rounded-2xl p-3 flex flex-col gap-1">
        <p class="text-[10px] sm:text-xs text-slate-200">Signed in as</p>
        <p class="text-sm font-semibold line-clamp-1">{{ userStore.currentUser?.name || 'Guest' }}</p>
        <p class="text-[10px] sm:text-xs text-slate-300 line-clamp-1">{{ userStore.currentUser?.email || 'No email set' }}</p>
      </div>

      <!-- Views Metric -->
      <div class="bg-white rounded-2xl border border-slate-100 p-3 flex flex-col gap-1">
        <p class="text-[10px] sm:text-xs text-slate-500">Mock metrics</p>
        <p class="text-xl sm:text-2xl font-semibold mt-0.5">428</p>
        <p class="text-[10px] sm:text-xs text-slate-500">Views across your listings</p>
      </div>

      <!-- Conversion Metric -->
      <div class="bg-white rounded-2xl border border-slate-100 p-3 flex flex-col gap-1">
        <p class="text-[10px] sm:text-xs text-slate-500">Conversion rate</p>
        <p class="text-xl sm:text-2xl font-semibold mt-0.5">3.2%</p>
        <p class="text-[10px] sm:text-xs text-slate-500">Example metric for layout only</p>
      </div>
    </section>

    <!-- Recent Listings -->
    <section>
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2">
        <h2 class="text-sm sm:text-base font-semibold">Recent listings</h2>
        <BaseButton variant="ghost" size="sm" class="whitespace-nowrap px-2 py-1 text-xs sm:text-sm">
          Add new listing
        </BaseButton>
      </div>

      <!-- Listings -->
      <div class="space-y-1.5">
        <div
          v-for="product in userProducts"
          :key="product.id"
          class="bg-white rounded-xl border border-slate-100 p-2.5 flex items-center gap-2.5 hover:shadow-md transition cursor-pointer"
        >
          <!-- Product Image -->
          <div class="h-12 w-12 sm:h-14 sm:w-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
            <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover">
          </div>

          <!-- Product Info -->
          <div class="flex-1 min-w-0 flex flex-col justify-between">
            <p class="text-sm font-medium line-clamp-1">{{ product.name }}</p>
            <p class="text-[10px] sm:text-xs text-slate-500 line-clamp-2">
              {{ product.currency }} {{ product.price }} · {{ product.rating.toFixed(1) }} rating
            </p>
          </div>

          <!-- Edit Button -->
          <button class="text-[10px] sm:text-xs text-slate-500 hover:text-slate-900 whitespace-nowrap">
            Edit
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Smooth hover effect for cards */
div:hover {
  transition: all 0.2s ease-in-out;
}

/* Text clamping for small screens */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
