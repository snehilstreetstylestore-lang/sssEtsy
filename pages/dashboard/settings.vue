<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

// Mock shop settings data
interface ShopSetting {
  id: number
  title: string
  description: string
  action: string
}

const settings: ShopSetting[] = [
  {
    id: 1,
    title: 'Shop Profile',
    description: 'Update your shop name, logo, banner, and description.',
    action: 'Edit Profile'
  },
  {
    id: 2,
    title: 'Announcements',
    description: 'Set up shop announcements for promotions or updates.',
    action: 'Manage Announcements'
  },
  {
    id: 3,
    title: 'Policies',
    description: 'Configure shipping, returns, and payment policies.',
    action: 'Edit Policies'
  },
  {
    id: 4,
    title: 'Notifications',
    description: 'Adjust email and push notifications settings.',
    action: 'Manage Notifications'
  }
]
</script>

<template>
  <div class="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
    <!-- Header -->
    <div class="space-y-1">
      <h1 class="text-lg sm:text-xl font-semibold tracking-tight">Shop Settings</h1>
      <p class="text-sm sm:text-base text-slate-600">
        Configure your mock shop profile, announcements, and policies in this conceptual settings space.
      </p>
    </div>

    <!-- Settings Grid -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="setting in settings"
        :key="setting.id"
        class="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col justify-between hover:shadow-sm transition cursor-pointer"
      >
        <div class="space-y-2">
          <h2 class="text-sm sm:text-base font-semibold text-slate-800">{{ setting.title }}</h2>
          <p class="text-xs sm:text-sm text-slate-500 line-clamp-3">{{ setting.description }}</p>
        </div>
        <button
          class="mt-3 self-start px-3 py-1.5 text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200 rounded-md transition"
        >
          {{ setting.action }}
        </button>
      </div>
    </section>

    <!-- Empty state for mobile if no settings -->
    <p v-if="settings.length === 0" class="text-sm text-slate-600 text-center py-6">
      No settings available.
    </p>
  </div>
</template>

<style scoped>
/* Smooth hover effect for cards */
div:hover {
  transition: all 0.2s ease-in-out;
}

/* Clamp text for descriptions */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
