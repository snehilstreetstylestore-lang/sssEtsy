<script setup lang="ts">

definePageMeta({
  ssr: false
})


import { useRoute, onMounted, onUnmounted } from '#imports'
import { ref, computed, watch } from 'vue'
import { categories } from '~/data/categories'
import { getProductsByCategory } from '~/data/products'
import ProductCard from '~/components/ui/ProductCard.vue'

// 🧭 Routing
const route = useRoute()
const slug = computed(() => route.params.slug as string)

// 🗂 Category + Products
const category = computed(() => categories.find((c) => c.slug === slug.value))
const allProducts = ref(getProductsByCategory(slug.value) || [])

// 🧭 UI State for Left Arrow Drawer
const showDrawer = ref(false)

// ✅ Watch for category changes
watch(slug, () => {
  allProducts.value = getProductsByCategory(slug.value) || []
})

// ✅ Detect screen width
const isMobile = ref(false)
onMounted(() => {
  const checkScreen = () => (isMobile.value = window.innerWidth < 1024)
  checkScreen()
  window.addEventListener('resize', checkScreen)
  onUnmounted(() => window.removeEventListener('resize', checkScreen))
})

// 🎛️ Filters
const minPrice = ref(0)
const maxPrice = ref(1000)
const sortOption = ref('default')

// 🔍 Real-time Filtered Products
const filteredProducts = computed(() => {
  let list = [...allProducts.value]

  // Price filter
  list = list.filter(
    (p) => p.price >= minPrice.value && p.price <= maxPrice.value
  )

  // Sorting logic
  if (sortOption.value === 'priceAsc') list.sort((a, b) => a.price - b.price)
  else if (sortOption.value === 'priceDesc') list.sort((a, b) => b.price - a.price)
  else if (sortOption.value === 'nameAsc') list.sort((a, b) => a.name.localeCompare(b.name))

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
    <!-- 🧭 Header -->
    <header class="text-center mb-8">
      <p class="text-xs text-slate-500 uppercase tracking-wide">Category</p>
      <h1 class="text-3xl font-semibold tracking-tight mt-1">
        {{ category.name }}
      </h1>
      <p class="text-sm text-slate-600 max-w-2xl mx-auto mt-2">
        {{ category.description || 'Explore trending handmade and creative items.' }}
      </p>
    </header>

    <!-- 🧭 Floating Drawer Toggle -->
    <button
      @click="showDrawer = !showDrawer"
      class="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 bg-amber-500 text-white p-2 rounded-r-xl shadow-lg hover:bg-amber-600 transition"
    >
      <span v-if="!showDrawer">←</span>
      <span v-else>→</span>
    </button>

    <!-- 🧰 Slide-out Filter Drawer -->
    <transition name="slide">
      <aside
        v-if="showDrawer"
        class="fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 shadow-xl p-5 z-30 flex flex-col space-y-5"
      >
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-lg font-semibold">Filters</h3>
          <button @click="showDrawer = false" class="text-slate-400 hover:text-slate-600">✖</button>
        </div>

        <!-- 💰 Price Filter -->
        <div>
          <h4 class="font-medium text-sm mb-1">Price Range</h4>
          <div class="flex gap-2 items-center">
            <input
              v-model.number="minPrice"
              type="number"
              placeholder="Min"
              class="w-1/2 border rounded px-2 py-1 text-sm"
            />
            <input
              v-model.number="maxPrice"
              type="number"
              placeholder="Max"
              class="w-1/2 border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <!-- 🔽 Sorting -->
        <div>
          <h4 class="font-medium text-sm mb-1">Sort By</h4>
          <select
            v-model="sortOption"
            class="w-full border rounded px-2 py-1 text-sm"
          >
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A–Z</option>
          </select>
        </div>
      </aside>
    </transition>

    <!-- 🛍️ Product Grid -->
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
/* 🎬 Drawer Slide Animation */
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

/* 🎬 Product enter animation */
motion-div {
  display: block;
}
</style>
