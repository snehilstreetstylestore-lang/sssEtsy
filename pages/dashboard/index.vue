<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

import { useUserStore } from '~/stores/user'
import { products } from '~/data/products'
import BaseButton from '~/components/ui/BaseButton.vue'
import { Star, MessageSquare, Eye, TrendingUp, ShoppingBag } from 'lucide-vue-next'

// ✅ Import Chart.js and vue-chartjs
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const userStore = useUserStore()
const userProducts = computed(() => products.slice(0, 4))

// Chart data
const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: '#10b981',
      data: [240, 320, 290, 400, 360, 500, 420],
      borderRadius: 6,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: '#f1f5f9' } },
  },
}

const comments = [
  { name: 'Aarav Sharma', message: 'Absolutely loved the craftsmanship! Shipping was quick too.', rating: 5 },
  { name: 'Mia Patel', message: 'The product quality is good but packaging could be improved.', rating: 4 },
  { name: 'Liam Smith', message: 'Nice design and fits perfectly in my living room.', rating: 5 },
]
</script>

<template>
  <div class="space-y-6 px-4 sm:px-6 lg:px-8 py-5 bg-slate-50 min-h-screen">
    <!-- Header -->
    <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="flex-1">
        <h1 class="text-lg sm:text-xl font-semibold tracking-tight text-slate-800">
          Seller Overview
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Insight into your store’s performance, engagement, and listings.
        </p>
      </div>
      <BaseButton variant="secondary" class="whitespace-nowrap text-sm sm:text-base px-3 py-1.5">
        View Shop Preview
      </BaseButton>
    </header>

    <!-- Stats Overview -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div class="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md">
        <Eye class="w-6 h-6 text-emerald-500" />
        <div>
          <p class="text-xs text-slate-500">Total Views</p>
          <p class="text-lg font-semibold">12,456</p>
        </div>
      </div>

      <div class="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md">
        <ShoppingBag class="w-6 h-6 text-blue-500" />
        <div>
          <p class="text-xs text-slate-500">Total Sales</p>
          <p class="text-lg font-semibold">789</p>
        </div>
      </div>

      <div class="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md">
        <TrendingUp class="w-6 h-6 text-purple-500" />
        <div>
          <p class="text-xs text-slate-500">Conversion Rate</p>
          <p class="text-lg font-semibold">4.8%</p>
        </div>
      </div>

      <div class="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md">
        <Star class="w-6 h-6 text-yellow-400" />
        <div>
          <p class="text-xs text-slate-500">Avg. Rating</p>
          <p class="text-lg font-semibold">4.7 / 5</p>
        </div>
      </div>
    </section>

    <!-- Chart -->
    <section class="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md">
      <h2 class="text-sm sm:text-base font-semibold mb-3">Weekly Sales Overview</h2>
      <div class="h-56 w-full">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </section>

    <!-- Recent Products -->
    <section>
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-sm sm:text-base font-semibold">Recent Listings</h2>
        <BaseButton variant="ghost" size="sm" class="whitespace-nowrap text-xs sm:text-sm px-2 py-1">
          Add New Listing
        </BaseButton>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="product in userProducts"
          :key="product.id"
          class="bg-white rounded-xl border border-slate-100 p-3 hover:shadow-md transition flex flex-col"
        >
          <div class="h-40 w-full rounded-lg overflow-hidden bg-slate-100">
            <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover" />
          </div>
          <div class="mt-2 flex-1 flex flex-col justify-between">
            <p class="font-medium text-sm truncate">{{ product.name }}</p>
            <div class="flex items-center justify-between text-xs text-slate-500 mt-1">
              <span>{{ product.currency }} {{ product.price }}</span>
              <div class="flex items-center gap-1">
                <Star class="w-3.5 h-3.5 text-yellow-400" />
                {{ product.rating.toFixed(1) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Feedback -->
    <section class="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md">
      <h2 class="text-sm sm:text-base font-semibold mb-3">Customer Feedback</h2>
      <div class="space-y-3">
        <div
          v-for="comment in comments"
          :key="comment.name"
          class="border border-slate-100 rounded-xl p-3 hover:bg-slate-50 transition"
        >
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-800">{{ comment.name }}</p>
            <div class="flex">
              <Star
                v-for="n in comment.rating"
                :key="n"
                class="w-4 h-4 text-yellow-400"
              />
            </div>
          </div>
          <p class="text-xs text-slate-600 mt-1">{{ comment.message }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
div:hover {
  transition: all 0.2s ease-in-out;
}
</style>
