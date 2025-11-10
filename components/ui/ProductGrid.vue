<script setup lang="ts">
import type { Product } from '~/data/products'
import ProductCard from './ProductCard.vue'

// ✅ Define props properly
const { products } = defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div v-if="products && products.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>

  <p v-else class="text-sm text-slate-500">
    No products found for this view.
  </p>
</template>
