<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50">
    <!-- 🧭 Navbar -->
    <Navbar />

    <!-- 🌐 Main Content -->
    <main class="flex-1">
      <div
        class="flex flex-col md:flex-row w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8 gap-6"
      >
        <!-- 📂 Sidebar -->
        <aside
          class="bg-white rounded-2xl shadow-soft p-4 space-y-2 border border-slate-100 md:w-56 flex-shrink-0"
        >
          <NuxtLink
            to="/dashboard"
            class="block px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
          >
            Overview
          </NuxtLink>
          <NuxtLink
            to="/dashboard/products"
            class="block px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
          >
            Products
          </NuxtLink>
          <NuxtLink
            to="/dashboard/orders"
            class="block px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
          >
            Orders
          </NuxtLink>
          <NuxtLink
            to="/dashboard/settings"
            class="block px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
          >
            Shop Settings
          </NuxtLink>
        </aside>

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
