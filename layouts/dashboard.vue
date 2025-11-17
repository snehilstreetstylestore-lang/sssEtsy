<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronRight, X } from 'lucide-vue-next'
import Navbar from '~/components/layout/Navbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

const isSidebarOpen = ref(false)
const isDesktop = ref(false)

// detect screen size for SSR-safe setup
onMounted(() => {
  const checkWidth = () => {
    isDesktop.value = window.innerWidth >= 768
  }
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 relative overflow-hidden">
    <!-- 🧭 Navbar -->
    <Navbar />

    <!-- 📱 Mobile Sidebar Toggle Button -->
    <button
      v-if="!isDesktop"
      @click="toggleSidebar"
      class="fixed top-1/2 left-0 z-30 -translate-y-1/2 bg-black text-white p-2 rounded-r-full shadow-lg hover:bg-slate-800 transition"
      aria-label="Toggle Sidebar"
    >
      <ChevronRight
        v-if="!isSidebarOpen"
        class="w-6 h-6 transition-transform duration-200"
      />
      <X
        v-else
        class="w-6 h-6 transition-transform duration-200"
      />
    </button>

    <!-- 🌐 Main Content -->
    <main class="flex-1">
      <div
        class="flex flex-col md:flex-row w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8 gap-6"
      >
        <!-- 📂 Sidebar (mobile drawer + desktop static) -->
        <transition name="slide">
          <aside
            v-show="isSidebarOpen || isDesktop"
            class="fixed md:static top-0 left-0 z-20 h-full md:h-auto bg-white border border-slate-100 rounded-none md:rounded-2xl p-6 w-64 md:w-56 shadow-lg md:shadow-none flex-shrink-0 transform transition-transform duration-300"
            :class="{
              'translate-x-0': isSidebarOpen,
              '-translate-x-full md:translate-x-0': !isSidebarOpen
            }"
          >
            <nav class="space-y-3 mt-16 md:mt-0">
              <NuxtLink
                to="/dashboard"
                class="block px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
                @click="isSidebarOpen = false"
              >
                Overview
              </NuxtLink>
              <NuxtLink
                to="/dashboard/products"
                class="block px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
                @click="isSidebarOpen = false"
              >
                Products
              </NuxtLink>
              <NuxtLink
                to="/dashboard/orders"
                class="block px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
                @click="isSidebarOpen = false"
              >
                Orders
              </NuxtLink>
              <NuxtLink
                to="/dashboard/settings"
                class="block px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
                @click="isSidebarOpen = false"
              >
                Shop Settings
              </NuxtLink>
            </nav>
          </aside>
        </transition>

        <!-- 🧾 Main Slot -->
        <section
          class="flex-1 bg-white rounded-2xl shadow-soft p-4 sm:p-6 border border-slate-100"
        >
          <slot />
        </section>
      </div>
    </main>

    <!-- ⚓ Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
/* Smooth slide-in transition for mobile sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
