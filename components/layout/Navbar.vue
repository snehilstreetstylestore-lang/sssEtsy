<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from '#imports'
import { ShoppingCart, Heart, User, Search, Menu } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useUserStore } from '~/stores/user'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()
const searchTerm = ref<string>((route.query.q as string) || '')

const isAuthenticated = computed(() => userStore.isAuthenticated)
const cartCount = computed(() => cartStore.count)
const wishlistCount = computed(() => wishlistStore.count)

const handleSearch = () => {
  if (!searchTerm.value) return
  router.push({ path: '/search', query: { q: searchTerm.value } })
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-slate-100">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 shrink-0">
        <div class="h-9 w-9 rounded-xl bg-brand-soft border border-brand/20 flex items-center justify-center group-hover:shadow-soft transition-all">
          <span class="text-brand font-bold text-lg">E</span>
        </div>
        <p class="hidden sm:block text-base font-semibold tracking-tight">Etsy Clone</p>
      </NuxtLink>

      <!-- Searchbar (Desktop Only) -->
      <form
        class="hidden md:flex flex-1 items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 mx-4"
        @submit.prevent="handleSearch"
      >
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search for anything"
          class="flex-1 bg-transparent outline-none text-sm px-2"
        />
        <button
          type="submit"
          class="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition"
        >
          <Search class="w-4 h-4" />
        </button>
      </form>

      <!-- Icons & User -->
      <nav class="flex items-center gap-2 sm:gap-3 ml-auto">
        <!-- Cart -->
        <NuxtLink
          to="/cart"
          class="relative flex items-center justify-center rounded-full border border-slate-200 p-2 hover:border-slate-400 hover:bg-slate-50 transition"
        >
          <ShoppingCart class="w-4 h-4" />
          <span
            v-if="cartCount"
            class="absolute -top-1.5 -right-0.5 min-w-[1.25rem] h-5 text-[10px] px-1 flex items-center justify-center rounded-full bg-brand text-white"
          >
            {{ cartCount }}
          </span>
        </NuxtLink>

        <!-- Wishlist -->
        <NuxtLink
          to="/wishlist"
          class="relative flex items-center justify-center rounded-full border border-slate-200 p-2 hover:border-slate-400 hover:bg-slate-50 transition"
        >
          <Heart class="w-4 h-4" />
          <span
            v-if="wishlistCount"
            class="absolute -top-1.5 -right-0.5 min-w-[1.25rem] h-5 text-[10px] px-1 flex items-center justify-center rounded-full bg-slate-900 text-white"
          >
            {{ wishlistCount }}
          </span>
        </NuxtLink>

        <!-- User / Sign In -->
        <NuxtLink
          v-if="!isAuthenticated"
          to="/auth/login"
          class="hidden sm:inline-flex items-center text-xs sm:text-sm font-medium rounded-full border border-slate-200 px-3 py-1.5 hover:border-slate-400 hover:bg-slate-50 transition"
        >
          Sign in
        </NuxtLink>

        <NuxtLink
          v-else
          to="/dashboard"
          class="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium rounded-full border border-slate-200 px-3 py-1.5 hover:border-slate-400 hover:bg-slate-50 transition"
        >
          <User class="w-4 h-4" />
          <span>Dashboard</span>
        </NuxtLink>

        <!-- Mobile Search / Menu -->
        <div class="md:hidden flex items-center gap-2">
          <button
            @click="$emit('openMobileSearch')"
            class="flex items-center justify-center p-2 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition"
          >
            <Search class="w-4 h-4 text-slate-600" />
          </button>

          <button
            @click="$emit('openMobileMenu')"
            class="flex items-center justify-center p-2 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-400 transition"
          >
            <Menu class="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  transition: all 0.2s ease-in-out;
}
</style>
