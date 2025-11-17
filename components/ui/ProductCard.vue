<script setup lang="ts">
import type { Product } from '~/data/products'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import BaseButton from '~/components/ui/BaseButton.vue'
import { Heart } from 'lucide-vue-next'
import { onMounted, ref, computed } from 'vue'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Detect client + touch devices
const isClient = ref(false)
const isTouchDevice = ref(false)

onMounted(() => {
  isClient.value = true
  isTouchDevice.value = window.matchMedia('(hover: none), (pointer: coarse)').matches
})

const toggleWishlist = () => {
  wishlistStore.toggle(props.product.id)
}

const addToCart = () => {
  cartStore.addToCart(props.product.id, 1)
}

const isWishlisted = computed(() => wishlistStore.isInWishlist(props.product.id))
</script>

<template>
  <article
    v-if="product"
    :class="[
      'group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col transition-all duration-300',
      !isTouchDevice && 'hover:shadow-lg hover:border-slate-200 hover:-translate-y-1 hover:scale-[1.01]'
    ]"
  >
    <!-- 🖼 Product Image -->
    <NuxtLink
      :to="`/product/${product.slug}`"
      class="relative block aspect-[4/5] overflow-hidden bg-slate-100 rounded-t-2xl"
    >
      <img
        :src="product.images?.[0] || '/images/placeholder.png'"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 ease-out"
        :class="!isTouchDevice && 'group-hover:scale-[1.08]'"
        loading="lazy"
      />

      <!-- 🏷 Product Badges -->
      <div
        v-if="product.badges?.length"
        class="absolute top-2 left-2 flex flex-wrap gap-1"
      >
        <span
          v-for="badge in product.badges"
          :key="badge"
          class="inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/90 border border-slate-200 backdrop-blur-sm"
        >
          {{ badge }}
        </span>
      </div>

      <!-- ❤️ Wishlist Button -->
      <button
        type="button"
        class="absolute top-2 right-2 rounded-full bg-white/90 border border-slate-200 
               p-1.5 hover:border-slate-400 hover:bg-white transition"
        @click.prevent.stop="toggleWishlist"
      >
        <Heart
          :class="[
            'w-4 h-4 transition-colors duration-200',
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-700'
          ]"
        />
      </button>

      <!-- ✨ Hover Overlay (desktop only) -->
      <div
        v-if="!isTouchDevice"
        class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
    </NuxtLink>

    <!-- 📄 Product Info -->
    <div class="flex-1 flex flex-col px-3.5 pt-3 pb-3">
      <!-- 🏷 Title -->
      <NuxtLink
        :to="`/product/${product.slug}`"
        class="text-sm font-medium line-clamp-2 hover:underline"
      >
        {{ product.name }}
      </NuxtLink>

      <!-- ✍️ Description -->
      <p class="mt-1 text-xs text-slate-500 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- 💰 Price + Rating -->
      <div class="mt-3 flex items-center justify-between text-sm">
        <div class="font-semibold">
          {{ product.currency }} {{ product.price }}
        </div>
        <div class="text-xs text-slate-500">
          ★ {{ product.rating.toFixed(1) }} · {{ product.ratingCount }} reviews
        </div>
      </div>

      <!-- 🛒 Add to Cart -->
      <div class="mt-3">
        <BaseButton
          size="sm"
          class="w-full"
          @click="addToCart"
        >
          Add to cart
        </BaseButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
article {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

/* Extra hover detail only for pointer devices */
@media (hover: hover) and (pointer: fine) {
  article:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.08);
  }
}
</style>
