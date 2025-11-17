<script setup lang="ts">
import { useWishlistStore } from '~/stores/wishlist'
import { products } from '~/data/products'
import ProductGrid from '~/components/ui/ProductGrid.vue'

const wishlistStore = useWishlistStore()

const wishlistProducts = computed(() =>
  products.filter((p) => wishlistStore.productIds.includes(p.id))
)
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
    <!-- Header -->
    <header class="text-center sm:text-left">
      <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
        Wishlist
      </h1>
      <p class="text-sm sm:text-base text-slate-600 max-w-2xl">
        Items you’ve saved. Your wishlist is stored locally in your browser only.
      </p>
    </header>

    <!-- Wishlist Products -->
    <div>
      <ProductGrid :products="wishlistProducts" />
    </div>

    <!-- Empty State -->
    <p
      v-if="wishlistProducts.length === 0"
      class="text-slate-500 text-center text-sm sm:text-base py-10"
    >
      Your wishlist is empty. Start adding your favorite items!
    </p>
  </div>
</template>
