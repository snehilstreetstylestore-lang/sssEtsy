<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import BaseButton from '~/components/ui/BaseButton.vue'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

const cartStore = useCartStore()
const router = useRouter()

// Hydrate cart from backend/localStorage
onMounted(async () => {
  await cartStore.hydrate()
  await cartStore.fetchCart()
})

const items = computed(() => cartStore.items)

// Qty Handler + Remove
const changeQty = (lineId: string, qty: number) =>
  cartStore.setQuantity(lineId, qty)

const remove = (lineId: string) =>
  cartStore.removeFromCart(lineId)

// Checkout button
const goCheckout = () => {
  if (!cartStore.count) return
  router.push('/checkout')
}

// Safe currency code
const currency = computed(() => cartStore.cart?.region?.currency_code?.toUpperCase() || 'USD')
</script>

<template>
  <div class="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
    <header class="space-y-1">
      <h1 class="text-2xl font-semibold tracking-tight">Your Cart</h1>
      <p class="text-sm text-slate-600">Review your items before checkout.</p>
    </header>

    <div v-if="items.length" class="grid md:grid-cols-[2fr,1fr] gap-6 items-start">
      
      <!-- Cart Items List -->
      <div class="space-y-4">
        <div
          v-for="item in items"
          :key="item.id"
          class="bg-white rounded-2xl border border-slate-100 p-3 flex gap-3 items-start hover:shadow-md transition"
        >
          <!-- Thumbnail -->
          <div
            class="h-20 w-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 flex justify-center items-center"
          >
            <img
              :src="item.thumbnail || '/default-product.jpg'"
              :alt="item.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium line-clamp-1">{{ item.title }}</p>
            <p class="text-xs text-slate-500">{{ item.variant?.title }}</p>
            <p class="mt-1 text-sm font-semibold">
              {{ currency }} {{ (item.unit_price / 100).toFixed(2) }}
            </p>

            <!-- Qty Control -->
            <div class="mt-2 flex gap-3 items-center text-xs">
              <div class="flex items-center gap-2 border border-slate-200 rounded-full px-2 py-1">
                <button
                  class="w-6 h-6 flex items-center justify-center rounded-full border text-slate-700"
                  @click="changeQty(item.id, item.quantity - 1)"
                >-</button>

                <span>{{ item.quantity }}</span>
                
                <button
                  class="w-6 h-6 flex items-center justify-center rounded-full border text-slate-700"
                  @click="changeQty(item.id, item.quantity + 1)"
                >+</button>
              </div>

              <button class="hover:text-red-500 text-slate-500"
                @click="remove(item.id)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="bg-white rounded-2xl border p-4 space-y-4 sticky top-6">
        <h2 class="text-sm font-semibold">Summary</h2>

        <div class="flex justify-between text-sm">
          <span>Items</span>
          <span>{{ cartStore.count }}</span>
        </div>

        <div class="flex justify-between text-sm">
          <span>Total</span>
          <span class="font-semibold">
            {{ currency }} {{ cartStore.total.toFixed(2) }}
          </span>
        </div>

        <BaseButton class="w-full" :disabled="!cartStore.count" @click="goCheckout">
          Proceed to Checkout
        </BaseButton>
      </aside>
    </div>

    <!-- Empty Cart -->
    <p v-else class="text-sm text-slate-600">
      Cart is empty. Add some items to view here.
    </p>
  </div>
</template>

<style scoped>
button {
  transition: 0.2s ease;
}
button:hover {
  background-color: #f0f0f0;
}
</style>
