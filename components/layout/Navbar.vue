<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, defineEmits } from 'vue'
import { useRoute, useRouter } from '#imports'
import { ShoppingCart, Heart, User, Search, Menu, LogOut, X } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useUserStore } from '~/stores/user'

const emit = defineEmits(['update:showOverlay'])

// Stores
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()
const searchTerm = ref<string>((route.query.q as string) || '')

const isAuthenticated = computed(() => userStore.isAuthenticated)
const cartCount = computed(() => cartStore.count)
const wishlistCount = computed(() => wishlistStore.count)

// Search
const handleSearch = () => {
  if (!searchTerm.value) return
  router.push({ path: '/search', query: { q: searchTerm.value } })
}

// Profile dropdown
const showDropdown = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const toggleDropdown = () => { showDropdown.value = !showDropdown.value }
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

const handleLogout = () => {
  userStore.logout()
  showDropdown.value = false
  router.push('/')
}

// Sidebar for mobile/tablet
const showSidebar = ref(false)
watch(showSidebar, (val) => emit('update:showOverlay', val))
const toggleSidebar = () => { showSidebar.value = !showSidebar.value }

// Dropdown for desktop triggered by hamburger
const showDesktopDropdown = ref(false)
watch(showDesktopDropdown, (val) => emit('update:showOverlay', val))
const toggleDesktopDropdown = () => { showDesktopDropdown.value = !showDesktopDropdown.value }

// Menu items
const menuItems = [
  'Fashion', 'Electronics', 'Home ', 'Toys', 'Books', 'Beauty',
  'Sports', 'Jewelry', 'Music', 'Health', 'Pets', 'Automotive', 'Outdoors', 'Gaming'
]
</script>

<template>
<header class="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
  <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">

    <!-- Hamburger (mobile/tablet + desktop dropdown) -->
    <div class="flex items-center gap-3">
      <!-- Mobile/Tablet Hamburger -->
      <button
        @click="toggleSidebar"
        class="md:hidden flex items-center justify-center p-3 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition"
      >
        <Menu class="w-6 h-6 text-slate-700" />
      </button>

      <!-- Desktop Hamburger Dropdown -->
      <div class="hidden md:block relative">
        <button
          @click="toggleDesktopDropdown"
          class="flex items-center justify-center p-3 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition"
        >
          <Menu class="w-6 h-6 text-slate-700" />
        </button>

        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <div
            v-if="showDesktopDropdown"
            class="absolute left-0 mt-2 w-96 bg-white border border-slate-200 rounded-xl shadow-lg z-[999] py-4 px-4"
          >
            <div class="grid grid-cols-3 gap-2">
              <a
                v-for="item in menuItems"
                :key="item"
                href="#"
                class="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded"
              >
                {{ item }}
              </a>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center gap-2 shrink-0 px-2 sm:px-0">
      <div class="h-10 w-10 rounded-xl bg-brand-soft border border-brand/20 flex items-center justify-center group-hover:shadow-soft transition-all">
        <span class="text-brand font-bold text-lg">E</span>
      </div>
      <p class="hidden sm:block text-base font-semibold tracking-tight">Etsy Clone</p>
    </NuxtLink>

    <!-- Searchbar (Desktop) -->
    <form class="hidden md:flex flex-1 items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-2 mx-4" @submit.prevent="handleSearch">
      <input v-model="searchTerm" type="text" placeholder="Search for anything" class="flex-1 bg-transparent outline-none text-sm px-2 py-1"/>
      <button type="submit" class="flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
        <Search class="w-4 h-4" />
      </button>
    </form>

    <!-- Right: Icons & Profile -->
    <nav class="flex items-center gap-2 sm:gap-3 ml-auto">
      <NuxtLink to="/cart" class="relative flex items-center justify-center rounded-full p-2 sm:p-3 border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition">
        <ShoppingCart class="w-4 h-4 sm:w-5 sm:h-5" />
        <span v-if="cartCount" class="absolute -top-1.5 -right-1 min-w-[1.25rem] h-5 text-[10px] sm:text-xs px-1 flex items-center justify-center rounded-full bg-brand text-white">{{ cartCount }}</span>
      </NuxtLink>

      <NuxtLink to="/wishlist" class="relative flex items-center justify-center rounded-full p-2 sm:p-3 border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition">
        <Heart class="w-4 h-4 sm:w-5 sm:h-5" />
        <span v-if="wishlistCount" class="absolute -top-1.5 -right-1 min-w-[1.25rem] h-5 text-[10px] sm:text-xs px-1 flex items-center justify-center rounded-full bg-slate-900 text-white">{{ wishlistCount }}</span>
      </NuxtLink>

      <div v-if="!isAuthenticated">
        <NuxtLink to="/auth/login" class="hidden sm:inline-flex items-center text-sm font-medium rounded-full border border-slate-200 px-3 py-2 hover:border-slate-400 hover:bg-slate-50 transition">Sign in</NuxtLink>
      </div>

      <div v-else ref="dropdownRef" class="relative hidden sm:inline-flex items-center">
        <button @click="toggleDropdown" class="flex items-center gap-2 text-sm font-medium rounded-full border border-slate-200 px-3 py-2 hover:border-slate-400 hover:bg-slate-50 transition">
          <User class="w-5 h-5" /> <span>{{ userStore.currentUser?.name || 'Profile' }}</span>
        </button>
        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
          <div v-if="showDropdown" class="absolute right-0 top-full mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-3 z-[999]">
            <NuxtLink to="/dashboard" class="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded" @click="showDropdown = false"><User class="w-4 h-4" /> Dashboard</NuxtLink>
            <button @click="handleLogout" class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"><LogOut class="w-4 h-4" /> Logout</button>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Sidebar Overlay (mobile/tablet) -->
    <transition name="fade">
      <div v-if="showSidebar" class="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm" @click="showSidebar = false"></div>
    </transition>

    <!-- Sidebar (mobile/tablet) -->
    <transition name="slide">
      <div v-if="showSidebar" class="fixed top-0 left-0 z-[999] h-full w-72 bg-white shadow-lg p-6 overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold">Menu</h3>
          <button @click="showSidebar = false"><X class="w-6 h-6" /></button>
        </div>
        <ul class="flex flex-col gap-3">
          <li v-for="item in menuItems" :key="item">
            <a href="#" class="block px-3 py-3 rounded-lg hover:bg-slate-50 text-base font-medium">{{ item }}</a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</header>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from { transform: translateX(-100%); }
.slide-enter-to { transform: translateX(0); }
.slide-leave-from { transform: translateX(0); }
.slide-leave-to { transform: translateX(-100%); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }
</style>
