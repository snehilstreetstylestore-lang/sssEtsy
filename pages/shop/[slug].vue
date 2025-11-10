<script setup lang="ts">
import { useRoute } from '#imports'
import { shops } from '~/data/shops'
import { getProductsByShop } from '~/data/products'
import ProductGrid from '~/components/ui/ProductGrid.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const shop = computed(() => shops.find((s) => s.slug === slug.value))
const products = computed(() =>
  shop.value ? getProductsByShop(shop.value.id) : []
)
</script>

<template>
  <div v-if="shop" class="space-y-6">
    <section class="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div class="h-40 w-full bg-slate-200 overflow-hidden">
        <img
          :src="shop.banner"
          :alt="shop.name"
          class="w-full h-full object-cover"
        >
      </div>
      <div class="p-4 flex items-start gap-4">
        <div class="h-16 w-16 rounded-full bg-slate-200 overflow-hidden -mt-10 border-4 border-white shadow-sm">
          <img
            :src="shop.avatar"
            :alt="shop.name"
            class="w-full h-full object-cover"
          >
        </div>
        <div class="flex-1">
          <h1 class="text-lg font-semibold tracking-tight">
            {{ shop.name }}
          </h1>
          <p class="text-xs text-slate-600">
            {{ shop.tagline }}
          </p>
          <p class="text-xs text-slate-500 mt-1">
            ★ {{ shop.rating.toFixed(1) }} · {{ shop.sales }} sales
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-sm font-semibold mb-3 tracking-tight">
        Items from this shop
      </h2>
      <ProductGrid :products="products" />
    </section>
  </div>
  <p v-else class="text-sm text-slate-600">
    Shop not found.
  </p>
</template>
