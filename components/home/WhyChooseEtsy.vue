<script setup lang="ts">
import {
  ShoppingBag,
  Globe,
  ShieldCheck,
  Truck,
  MessageCircle,
  Star,
} from 'lucide-vue-next'

const features = [
  {
    icon: ShoppingBag,
    title: 'Unique Products',
    description:
      'Find one-of-a-kind items crafted by independent sellers worldwide.',
  },
  {
    icon: Globe,
    title: 'Global Marketplace',
    description:
      'Shop from sellers across the globe with ease and security.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description:
      'Your transactions are protected with safe and reliable payment methods.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description:
      'Get your orders delivered quickly and track them every step of the way.',
  },
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    description:
      'Connect directly with sellers to ask questions or request custom items.',
  },
  {
    icon: Star,
    title: 'Trusted Reviews',
    description:
      'Read honest reviews from other buyers to make confident purchases.',
  },
]
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 bg-yellow-200">
    <!-- 🌟 Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold text-slate-900">
        Why Choose Etsy?
      </h2>
      <p class="mt-4 text-slate-700 max-w-2xl mx-auto">
        Etsy is more than a marketplace — it’s a global community where creativity,
        uniqueness, and trust come together beautifully.
      </p>
    </div>

    <!-- 💎 Features Grid -->
    <div class="flex flex-wrap justify-center gap-6">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="bg-yellow-100 rounded-2xl p-6 flex flex-col items-center text-center w-full sm:w-[45%] lg:w-[30%] transition hover:shadow-md hover:bg-yellow-50"
      >
        <div
          class="bg-yellow-300 p-4 rounded-full mb-4 shadow-sm flex items-center justify-center"
        >
          <component :is="feature.icon" class="w-8 h-8 text-slate-900" />
        </div>
        <h3 class="text-lg font-semibold mb-2 text-slate-900">
          {{ feature.title }}
        </h3>
        <p class="text-sm text-slate-700 leading-relaxed">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* All responsiveness handled by Tailwind. */
</style>
