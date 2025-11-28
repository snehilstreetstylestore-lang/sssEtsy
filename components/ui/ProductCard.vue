<script setup lang="ts">
import type { Product } from '~/types/medusa'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import BaseButton from '~/components/ui/BaseButton.vue'
import { Heart } from 'lucide-vue-next'
import { ref, computed } from 'vue'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const adding = ref(false)

// Safely pick first variant
const variant = computed(() => props.product?.variants?.[0] || null)

// Price with fallback
const priceText = computed(() => {
  const price = variant.value?.prices?.[0]?.amount
  return price ? `₹ ${(price / 100).toFixed(2)}` : "Price on checkout"
})

// Wishlist
const toggleWishlist = () => wishlistStore.toggle(props.product.id)
const isWishlisted = computed(() => wishlistStore.isInWishlist(props.product.id))

// Add to cart handler
const addToCart = async () => {
  if (!variant.value?.id) return console.warn("No variant available")

  try {
    adding.value = true

    if (!cartStore.cart?.id) {
      await cartStore.createCart()
    } else if (!cartStore.cart.items) {
      await cartStore.fetchCart()
    }

    await cartStore.addToCart(variant.value.id, 1)

  } catch (err) {
    console.error("Add to Cart failed:", err)
  } finally {
    adding.value = false
  }
}

const productImg = computed(() =>
  props.product.images?.[0]?.url || props.product.thumbnail || "/placeholder.png"
)
</script>

<template>
  <article
    class="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition relative"
  >

    <!-- Product Image -->
    <NuxtLink
      :to="`/product/${product.handle || product.id}`"
      class="relative block bg-gray-100 rounded-t-xl aspect-[4/5]"
    >
      <img
        :src="productImg"
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Wishlist Button -->
      <button
        type="button"
        class="absolute top-2 right-2 rounded-full bg-white shadow p-1.5 hover:scale-110 transition"
        @click.prevent.stop="toggleWishlist"
      >
        <Heart
          :class="[isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700']"
          class="w-4 h-4"
        />
      </button>
    </NuxtLink>

    <!-- Product Info -->
    <div class="flex flex-col px-3.5 pt-3 pb-4">
      <NuxtLink
        :to="`/product/${product.handle || product.id}`"
        class="text-sm font-medium line-clamp-2 hover:text-purple-600 transition"
      >
        {{ product.title }}
      </NuxtLink>

      <p
        v-if="product.subtitle"
        class="text-[13px] text-gray-500 mt-1 line-clamp-2"
      >
        {{ product.subtitle }}
      </p>

      <span class="font-semibold text-sm tracking-wide mt-2">
        {{ priceText }}
      </span>

      <BaseButton
        size="sm"
        class="w-full mt-3"
        :disabled="adding || !variant?.id"
        @click="addToCart"
      >
        {{ adding ? "Adding..." : "Add to cart" }}
      </BaseButton>
    </div>
  </article>
</template>

<style scoped>
article {
  transition: transform 0.25s, box-shadow 0.25s;
}
article:hover {
  transform: translateY(-4px);
}
</style>
