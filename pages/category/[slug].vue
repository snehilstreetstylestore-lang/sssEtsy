<script setup lang="ts">
definePageMeta({
  ssr: false
})

import { useRoute, onMounted, onUnmounted } from '#imports'
import { ref, computed, watch } from 'vue'
import { useProductStore } from '~/stores/products'

// 🧭 Routing
const route = useRoute()
const slug = computed(() => route.params.slug as string)

// 🛍 Medusa Product Store
const productStore = useProductStore()

// 🧭 Category Name mapping (based on slug = Medusa Collection ID)
const category = computed(() => {
  return {
    slug: slug.value,
    name: slug.value.replace(/-/g, ' ').toUpperCase(),
    description: `Explore all products in ${slug.value}.`
  }
})

// 🔀 Fetch Products by Category from Medusa API
const filteredBySlug = computed(() =>
  productStore.products.filter((p: any) =>
    p.collection?.handle === slug.value
  )
)

watch(
  slug,
  () => {
    productStore.fetchProducts() // Refresh if slug changes
  },
  { immediate: true }
)

// 🧭 UI State for Filter Drawer
const showDrawer = ref(false)

// 📱 Detect screen width
const isMobile = ref(false)
const checkScreen = () => (isMobile.value = window.innerWidth < 1024)

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})
onUnmounted(() => window.removeEventListener('resize', checkScreen))

// 🎛 Filters
const minPrice = ref(0)
const maxPrice = ref(20000)
const sortOption = ref('default')

// 🔍 UI filtered + sorted products
const filteredProducts = computed(() => {
  let list = [...filteredBySlug.value]

  list = list.filter((p: any) => {
    const price = (p.variants?.[0]?.prices?.[0]?.amount || 0) / 100
    return price >= minPrice.value && price <= maxPrice.value
  })

  if (sortOption.value === 'priceAsc')
    list.sort((a: any, b: any) => a.variants[0].prices[0].amount - b.variants[0].prices[0].amount)
  else if (sortOption.value === 'priceDesc')
    list.sort((a: any, b: any) => b.variants[0].prices[0].amount - a.variants[0].prices[0].amount)
  else if (sortOption.value === 'nameAsc')
    list.sort((a: any, b: any) => a.title.localeCompare(b.title))

  return list
})

// 🧾 Pagination
const page = ref(1)
const pageSize = 12
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredProducts.value.slice(start, start + pageSize)
})
</script>

<template>
  <div
    v-if="category"
    class="relative bg-slate-50 min-h-screen px-4 sm:px-8 py-8 flex flex-col items-center"
  >
    <!-- Header -->
    <header class="text-center mb-8">
      <p class="text-xs text-slate-500 uppercase tracking-wide">Category</p>
      <h1 class="text-3xl font-semibold tracking-tight mt-1">{{ category.name }}</h1>
      <p class="text-sm text-slate-600 max-w-2xl mx-auto mt-2">
        {{ category.description }}
      </p>
    </header>

    <!-- Product Grid -->
    <section class="w-full max-w-7xl">
      <p class="text-sm text-slate-600 mb-4 text-right">
        {{ filteredProducts.length }} items found
      </p>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
      >
        <motion-div
          v-for="product in paginatedProducts"
          :key="product.id"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3 }"
        >
          <ProductCard :product="product" />
        </motion-div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-10 gap-2">
        <button
          @click="page--"
          :disabled="page === 1"
          class="px-4 py-2 border rounded-lg text-sm hover:bg-amber-100 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          @click="page++"
          :disabled="page * pageSize >= filteredProducts.length"
          class="px-4 py-2 border rounded-lg text-sm hover:bg-amber-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  </div>

  <p v-else class="text-sm text-slate-600 text-center mt-20">
    Category not found.
  </p>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
motion-div {
  display: block;
}
</style>
