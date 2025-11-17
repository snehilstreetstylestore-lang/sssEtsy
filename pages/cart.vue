<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { products } from '~/data/products'
import BaseButton from '~/components/ui/BaseButton.vue'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

// Detailed cart items
const detailedItems = computed(() => cartStore.detailedItems)

// Handle quantity change
const handleQuantity = (productId: number, delta: number) => {
  const item = detailedItems.value.find((i) => i.product?.id === productId)
  if (!item || !item.product) return
  const next = item.quantity + delta
  cartStore.setQuantity(productId, next)
}

// Remove item
const removeItem = (productId: number) => cartStore.removeFromCart(productId)

// Navigate to checkout page
const goToCheckout = () => {
  if (cartStore.count === 0) return
  router.push('/checkout')
}

// Buy Along Products (top 8 products not in cart)
const buyAlongProducts = computed(() =>
  products.filter((p) => !detailedItems.value.some(i => i.product?.id === p.id)).slice(0, 8)
)
</script>

<template>
  <div class="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
    <!-- Header -->
    <header class="space-y-1">
      <h1 class="text-2xl font-semibold tracking-tight">Cart</h1>
      <p class="text-sm text-slate-600">
        Review your items and proceed to secure checkout.
      </p>
    </header>

    <!-- Cart Items -->
    <div v-if="detailedItems.length" class="grid md:grid-cols-[2fr,1fr] gap-6 items-start">
      <!-- Items List -->
      <div class="space-y-4">
        <div
          v-for="item in detailedItems"
          :key="item.product?.id"
          class="bg-white rounded-2xl border border-slate-100 p-3 flex gap-3 items-start hover:shadow-sm transition"
        >
          <!-- Thumbnail -->
          <div class="h-20 w-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 flex justify-center items-center">
            <img
              :src="item.product?.images[0]"
              :alt="item.product?.name"
              class="w-full h-full object-cover rounded-lg"
            >
          </div>

          <!-- Product Info -->
          <div class="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <p class="text-sm font-medium line-clamp-1">{{ item.product?.name }}</p>
              <p class="text-xs text-slate-500 line-clamp-2">{{ item.product?.description }}</p>
              <p class="mt-1 text-sm font-semibold">{{ item.product?.currency }} {{ item.product?.price }}</p>
            </div>
            <!-- Quantity Controls -->
            <div class="mt-2 flex flex-wrap items-center gap-3 text-xs">
              <div class="inline-flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1">
                <button
                  class="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                  @click="handleQuantity(item.product!.id, -1)"
                >-</button>
                <span>{{ item.quantity }}</span>
                <button
                  class="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
                  @click="handleQuantity(item.product!.id, 1)"
                >+</button>
              </div>
              <button
                class="text-xs text-slate-500 hover:text-red-500"
                @click="removeItem(item.product!.id)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Sidebar -->
      <aside class="bg-white rounded-2xl border border-slate-100 p-4 space-y-4 sticky top-6">
        <h2 class="text-sm font-semibold">Summary</h2>
        <div class="flex items-center justify-between text-sm">
          <span>Items</span>
          <span>{{ cartStore.count }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span>Total</span>
          <span class="font-semibold">USD {{ cartStore.total.toFixed(2) }}</span>
        </div>
        <BaseButton
          class="w-full"
          :disabled="cartStore.count === 0"
          @click="goToCheckout"
        >
          Proceed to Checkout
        </BaseButton>
      </aside>
    </div>

    <!-- Buy Along Products (Horizontal Scroll) -->
    <section v-if="buyAlongProducts.length" class="space-y-2 mt-6">
      <h2 class="text-lg font-semibold tracking-tight">Buy Along With These</h2>
      <div class="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
        <div
          v-for="product in buyAlongProducts"
          :key="product.id"
          class="flex-shrink-0 w-36 sm:w-44 bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col items-center p-3"
        >
          <div class="w-full h-32 flex justify-center items-center bg-slate-50 rounded-xl overflow-hidden">
            <img :src="product.images[0]" :alt="product.name" class="object-contain w-full h-full"/>
          </div>
          <p class="text-sm font-medium mt-2 line-clamp-2 text-center">{{ product.name }}</p>
          <p class="text-sm font-semibold mt-1">{{ product.currency }} {{ product.price }}</p>
          <BaseButton class="mt-2 w-full text-sm py-1.5" @click="cartStore.addToCart(product.id, 1)">
            Add to Cart
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Empty Cart Message -->
    <div v-else-if="!detailedItems.length" class="text-sm text-slate-600">
      Your cart is empty. Browse products and add items to see them here.
    </div>
  </div>
</template>

<style scoped>
/* Smooth hover effect */
div:hover {
  transition: all 0.2s ease-in-out;
}

/* Hide horizontal scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
