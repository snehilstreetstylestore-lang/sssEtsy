<script setup lang="ts">
import { useRoute } from '#imports'
import { products, searchProducts } from '~/data/products'
import ProductGrid from '~/components/ui/ProductGrid.vue'

const route = useRoute()

const q = computed(() => (route.query.q as string) || '')
const hasSearch = computed(() => !!q.value)

const resultProducts = computed(() => {
  if (!q.value) return products
  return searchProducts(q.value)
})
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
    <!-- Header -->
    <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight mb-1">
          Search
        </h1>
        <p class="text-sm sm:text-base text-slate-600">
          Results are filtered locally from mock JSON.
        </p>
      </div>

      <p v-if="hasSearch" class="text-xs sm:text-sm text-slate-500">
        Showing results for
        <span class="font-medium text-slate-900">
          "{{ q }}"
        </span>
      </p>
    </header>

    <!-- Product Results -->
    <ProductGrid :products="resultProducts" />

    <!-- Empty State -->
    <p
      v-if="resultProducts.length === 0"
      class="text-center text-slate-500 text-sm sm:text-base py-10"
    >
      No products found for "{{ q }}".
    </p>
  </div>
</template>
