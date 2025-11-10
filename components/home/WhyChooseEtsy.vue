<script setup lang="ts">
import { ShoppingBagIcon, GlobeAltIcon, ShieldCheckIcon, TruckIcon, ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    icon: ShoppingBagIcon,
    title: 'Unique Products',
    description: 'Find one-of-a-kind items crafted by independent sellers worldwide.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Marketplace',
    description: 'Shop from sellers across the globe with ease and security.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Secure Payments',
    description: 'Your transactions are protected with safe and reliable payment methods.',
  },
  {
    icon: TruckIcon,
    title: 'Fast Shipping',
    description: 'Get your orders delivered quickly and track them every step of the way.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Direct Communication',
    description: 'Connect directly with sellers to ask questions or request custom items.',
  },
  {
    icon: StarIcon,
    title: 'Trusted Reviews',
    description: 'Read honest reviews from other buyers to make confident purchases.',
  },
]
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 bg-yellow-200">
    <!-- Section Header -->
    <div class="max-w-3xl mx-auto text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900">Why Choose Etsy?</h2>
      <p class="mt-4 text-slate-700">
        Etsy is more than a marketplace. It’s a community where creativity, uniqueness, and safety come together.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="bg-yellow-100 rounded-2xl p-6 flex flex-col items-center text-center"
      >
        <div class="bg-yellow-300 p-4 rounded-full mb-4">
          <component :is="feature.icon" class="w-8 h-8 text-slate-900"/>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-slate-900">{{ feature.title }}</h3>
        <p class="text-sm text-slate-700">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Responsive text and spacing handled via Tailwind, no shadows */
</style>
