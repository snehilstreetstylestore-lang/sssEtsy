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
  <div class="space-y-4">
    <header class="flex items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-semibold tracking-tight">
          Search
        </h1>
        <p class="text-sm text-slate-600">
          Results are filtered locally from mock JSON.
        </p>
      </div>
      <p v-if="hasSearch" class="text-xs text-slate-500">
        Showing results for
        <span class="font-medium text-slate-900">
          "{{ q }}"
        </span>
      </p>
    </header>

    <ProductGrid :products="resultProducts" />
  </div>
</template>
