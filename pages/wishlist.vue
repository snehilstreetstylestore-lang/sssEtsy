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
  <div class="space-y-4">
    <header>
      <h1 class="text-xl font-semibold tracking-tight mb-1">
        Wishlist
      </h1>
      <p class="text-sm text-slate-600">
        Items you have saved. All data is stored locally in your browser only.
      </p>
    </header>

    <ProductGrid :products="wishlistProducts" />
  </div>
</template>
