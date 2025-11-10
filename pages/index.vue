<script setup lang="ts">
import HeroSection from '~/components/ui/HeroSection.vue'
import { categories } from '~/data/categories'
import { products } from '~/data/products'
import CategoryCard from '~/components/ui/CategoryCard.vue'
import ProductGrid from '~/components/ui/ProductGrid.vue'
import BaseButton from '~/components/ui/BaseButton.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const featuredProducts = products.slice(0, 4)

const goToCheckout = () => {
  router.push('/checkout')
}

// Why Choose Etsy features
const features = [
  {
    icon: '💎',
    title: 'Unique Products',
    description: 'Find one-of-a-kind items crafted by independent sellers worldwide.',
  },
  {
    icon: '🌎',
    title: 'Global Marketplace',
    description: 'Shop from sellers across the globe with ease and security.',
  },
  {
    icon: '🛡️',
    title: 'Secure Payments',
    description: 'Your transactions are protected with safe and reliable payment methods.',
  },
  {
    icon: '🚚',
    title: 'Fast Shipping',
    description: 'Get your orders delivered quickly and track them every step of the way.',
  },
  {
    icon: '💬',
    title: 'Direct Communication',
    description: 'Connect directly with sellers to ask questions or request custom items.',
  },
  {
    icon: '⭐',
    title: 'Trusted Reviews',
    description: 'Read honest reviews from other buyers to make confident purchases.',
  },
]
</script>

<template>
  <div class="space-y-12 pb-10">
    <!-- 🧡 Hero Section -->
    <HeroSection />

    <!-- 🛍️ Intro Section -->
    <section class="grid md:grid-cols-2 gap-8 items-center px-4 sm:px-8">
      <!-- Text Section -->
      <ClientOnly>
        <div
          v-motion="{
            initial: { opacity: 0, y: 40 },
            enter: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }"
        >
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3">
            Discover independent shops and one-of-a-kind pieces.
          </h1>
          <p class="text-sm text-slate-600 mb-5 max-w-md">
            This is a front-end only Etsy-style experience. Browse mock listings, add items to your cart, and explore how a marketplace UI can be structured in Nuxt 4.
          </p>
          <div class="flex flex-wrap gap-3">
            <!-- Start browsing -->
            <NuxtLink to="/search">
              <BaseButton>Start browsing</BaseButton>
            </NuxtLink>
            <!-- Seller dashboard -->
            <NuxtLink to="/dashboard">
              <BaseButton variant="secondary">Seller dashboard</BaseButton>
            </NuxtLink>
            <!-- Checkout -->
            <BaseButton variant="emerald" @click="goToCheckout">
              Go to checkout
            </BaseButton>
          </div>
        </div>
      </ClientOnly>

      <!-- Product Preview Grid -->
      <ClientOnly>
        <div
          v-motion="{
            initial: { opacity: 0, y: 20 },
            enter: { opacity: 1, y: 0, transition: { duration: 0.45 } }
          }"
          class="bg-white rounded-3xl border border-slate-100 shadow-soft p-4 sm:p-6 grid grid-cols-2 gap-3 sm:gap-4"
        >
          <div
            v-for="product in featuredProducts"
            :key="product.id"
            class="bg-slate-50 rounded-2xl p-3 sm:p-4 flex flex-col hover:shadow-md transition-shadow"
          >
            <div class="aspect-[4/3] mb-2 overflow-hidden rounded-xl bg-slate-100">
              <img
                :src="product.images[0]"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p class="text-xs sm:text-sm font-medium line-clamp-2 mb-1">{{ product.name }}</p>
            <p class="text-[11px] sm:text-xs text-slate-500 mb-1 line-clamp-2">
              {{ product.description }}
            </p>
            <p class="text-xs sm:text-sm font-semibold">
              {{ product.currency }} {{ product.price }}
            </p>
          </div>
        </div>
      </ClientOnly>
    </section>

    <!-- 🧭 Category Section -->
    <section class="px-4 sm:px-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm sm:text-base font-semibold tracking-tight">
          Browse by category
        </h2>
        <NuxtLink
          to="/search"
          class="text-xs sm:text-sm text-slate-600 hover:text-slate-900"
        >
          View all products
        </NuxtLink>
      </div>

      <!-- Horizontal scroll -->
      <div
        class="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
      >
        <div
          v-for="category in categories"
          :key="category.id"
          class="snap-start flex-shrink-0"
        >
          <CategoryCard :category="category" />
        </div>
      </div>
    </section>

    <!-- 🌟 Featured Listings -->
    <section class="px-4 sm:px-8">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm sm:text-base font-semibold tracking-tight">
          Featured listings
        </h2>
        <p class="text-xs text-slate-500">All data is static mock JSON.</p>
      </div>
      <ProductGrid :products="featuredProducts" />
    </section>

    <!-- 🌟 Why Choose Etsy -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-yellow-200">
      <div class="max-w-7xl mx-auto text-center mb-10">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Why Choose Etsy?
        </h2>
        <p class="mt-4 text-slate-700 max-w-2xl mx-auto">
          Etsy is more than a marketplace. It’s a community where creativity, uniqueness, and safety come together.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-yellow-100 rounded-2xl p-6 flex flex-col items-center text-center"
        >
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-slate-700 text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hide scrollbar for a clean look */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
