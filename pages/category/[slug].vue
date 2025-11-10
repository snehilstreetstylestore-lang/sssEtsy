<script setup lang="ts">
import { useRoute } from '#imports'
import { categories } from '~/data/categories'
import { getProductsByCategory } from '~/data/products'
import ProductCard from '~/components/ui/ProductCard.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const category = computed(() => categories.find((c) => c.slug === slug.value))
const allProducts = computed(() => getProductsByCategory(slug.value))

const priceRange = ref<[number, number]>([0, 200])
const page = ref(1)
const pageSize = 12

const filteredProducts = computed(() => {
  return allProducts.value.filter((p) => {
    return p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
  })
})
</script>

<template>
  <div v-if="category" class="space-y-6">
    <!-- 🧭 Category Header -->
    <header class="space-y-2">
      <p class="text-xs text-slate-500">Category</p>
      <h1 class="text-xl font-semibold tracking-tight">
        {{ category.name }}
      </h1>
      <p class="text-sm text-slate-600">
        {{ category.description }}
      </p>
    </header>

    <!-- 🛍️ Product Grid -->
    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>

  <p v-else class="text-sm text-slate-600">
    Category not found.
  </p>
</template>
