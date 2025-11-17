<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import BaseButton from '~/components/ui/BaseButton.vue'
import { useMotion } from '@vueuse/motion'
import { useRouter } from 'vue-router'

const router = useRouter()

const cartStore = useCartStore()
const userStore = useUserStore()

if (process.client) {
  cartStore.hydrate()
  userStore.hydrate()
}

// Form state
const fullName = ref(userStore.currentUser?.name || '')
const email = ref(userStore.currentUser?.email || '')
const address = ref('')
const city = ref('')
const country = ref('')
const zip = ref('')

const paymentMethod = ref<'card' | 'paypal' | 'cod'>('card')

// COD surcharge
const codFee = 99

// Coupon
const couponCode = ref('')
const discount = ref(0)

// Shipping
const freeShippingThreshold = 500
const shippingFee = ref(49)

const detailedItems = computed(() => cartStore.detailedItems)
const subtotal = computed(() => cartStore.total)

const shipping = computed(() =>
  subtotal.value >= freeShippingThreshold ? 0 : shippingFee.value
)

const total = computed(() => {
  let t = subtotal.value + shipping.value
  if (paymentMethod.value === 'cod') t += codFee
  t -= discount.value
  return t
})

// Sections
const isShippingOpen = ref(true)
const isPaymentOpen = ref(true)

// Apply coupon
const applyCoupon = () => {
  if (!couponCode.value) return window.alert('Enter a coupon code!')
  if (couponCode.value.toUpperCase() === 'SAVE50') {
    discount.value = 50
    window.alert('Coupon applied: ₹50 discount!')
  } else if (couponCode.value.toUpperCase() === 'SAVE10P') {
    discount.value = subtotal.value * 0.1
    window.alert(`Coupon applied: 10% off (₹${discount.value.toFixed(2)})`)
  } else {
    window.alert('Invalid coupon code')
  }
}

// Enhanced checkout
const handleCheckout = () => {
  if (!fullName.value || !email.value || !address.value || !city.value || !country.value || !zip.value) {
    window.alert('Please fill in all fields')
    return
  }

  // Clear everything
  cartStore.clearCart()
  couponCode.value = ''
  discount.value = 0

  // Redirect to Thank You Page
  router.push('/thank-you')
}
</script>

<template>
  <div class="flex flex-col px-4 sm:px-6 lg:px-8 py-6 gap-6 w-full">

    <!-- Shipping Information -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 0.5 } }"
      class="bg-white rounded-2xl border border-slate-100 shadow-sm"
    >
      <button
        @click="isShippingOpen = !isShippingOpen"
        class="w-full text-left p-6 flex justify-between items-center font-semibold text-lg"
      >
        <span>Shipping Information</span>
        <span>{{ isShippingOpen ? '−' : '+' }}</span>
      </button>

      <motion-div
        v-show="isShippingOpen"
        :initial="{ opacity: 0, height: 0 }"
        :enter="{ opacity: 1, height: 'auto', transition: { duration: 0.4 } }"
        :leave="{ opacity: 0, height: 0, transition: { duration: 0.3 } }"
        class="p-6 border-t border-slate-100 space-y-4"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input v-model="fullName" type="text" placeholder="Full Name" class="input" />
          <input v-model="email" type="email" placeholder="Email" class="input" />
          <input v-model="address" type="text" placeholder="Address" class="input sm:col-span-2" />
          <input v-model="city" type="text" placeholder="City" class="input" />
          <input v-model="country" type="text" placeholder="Country" class="input" />
          <input v-model="zip" type="text" placeholder="ZIP / Postal Code" class="input" />
        </div>
      </motion-div>
    </div>

    <!-- Payment Method -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }"
      class="bg-white rounded-2xl border border-slate-100 shadow-sm"
    >
      <button
        @click="isPaymentOpen = !isPaymentOpen"
        class="w-full text-left p-6 flex justify-between items-center font-semibold text-lg"
      >
        <span>Payment Method</span>
        <span>{{ isPaymentOpen ? '−' : '+' }}</span>
      </button>

      <motion-div
        v-show="isPaymentOpen"
        :initial="{ opacity: 0, height: 0 }"
        :enter="{ opacity: 1, height: 'auto', transition: { duration: 0.4 } }"
        :leave="{ opacity: 0, height: 0, transition: { duration: 0.3 } }"
        class="p-6 border-t border-slate-100 flex flex-col gap-3"
      >
        <label class="payment-option">
          <input type="radio" v-model="paymentMethod" value="card" />
          Credit / Debit Card
        </label>
        <label class="payment-option">
          <input type="radio" v-model="paymentMethod" value="paypal" />
          PayPal
        </label>
        <label class="payment-option">
          <input type="radio" v-model="paymentMethod" value="cod" />
          Cash on Delivery (+₹99)
        </label>
      </motion-div>
    </div>

    <!-- Order Summary -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }"
      class="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col"
    >
      <div class="w-full text-left p-6 flex justify-between items-center font-semibold text-lg border-b border-slate-100">
        <span>Order Summary</span>
      </div>

      <div class="p-6 flex flex-col">

        <!-- Cart Items -->
        <div class="divide-y divide-slate-100 max-h-80 overflow-y-auto flex-1">
          <motion-div
            v-for="item in detailedItems"
            :key="item.product?.id"
            :initial="{ opacity: 0, y: 10 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 0.3 } }"
            class="flex justify-between py-2 items-center"
          >
            <div class="flex items-center gap-3">
              <img
                :src="item.product?.images[0]"
                :alt="item.product?.name"
                class="w-12 h-12 object-cover rounded-lg shadow"
              />
              <p class="text-sm font-medium">{{ item.product?.name }}</p>
            </div>
            <p class="text-sm font-semibold">₹{{ (item.product?.price * item.quantity).toFixed(2) }}</p>
          </motion-div>
        </div>

        <!-- Summary -->
        <div class="mt-4 space-y-1">
          <div class="flex justify-between font-medium text-sm">
            <span>Subtotal</span>
            <span>₹{{ subtotal.toFixed(2) }}</span>
          </div>

          <div v-if="paymentMethod === 'cod'" class="flex justify-between font-medium text-sm text-emerald-600">
            <span>COD Fee</span>
            <span>₹99</span>
          </div>

          <div class="flex justify-between font-medium text-sm text-slate-600">
            <span>Shipping</span>
            <span>{{ shipping.value === 0 ? 'Free' : `₹${shipping.value}` }}</span>
          </div>

          <div v-if="discount" class="flex justify-between font-medium text-sm text-green-600">
            <span>Discount</span>
            <span>-₹{{ discount.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Coupon -->
        <div class="bg-slate-50 rounded-lg p-4 mt-3 flex gap-3 items-center">
          <input v-model="couponCode" type="text" placeholder="Enter coupon code" class="input flex-1" />
          <BaseButton @click="applyCoupon">Apply</BaseButton>
        </div>

        <p v-if="discount" class="text-green-600 text-sm mt-1">
          Discount applied: ₹{{ discount.toFixed(2) }}
        </p>

        <!-- Total -->
        <div class="flex justify-between font-semibold text-lg mt-3 border-t border-slate-200 pt-3">
          <span>Total</span>
          <span>₹{{ total.toFixed(2) }}</span>
        </div>

        <!-- Place Order Button -->
        <motion-div
          :initial="{ scale: 1 }"
          :hovered="{ scale: 1.04 }"
          class="w-full mt-5"
        >
          <button
            @click="handleCheckout"
            class="place-order-btn w-full py-3 text-white font-semibold rounded-xl shadow-lg"
          >
            Place Order
          </button>
        </motion-div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  color: #1e293b;
  transition: all 0.2s ease;
}
.input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
}

.payment-option {
  display: flex;
  gap: 10px;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 10px;
  transition: 0.2s ease;
}
.payment-option:hover {
  background: #f0fdf4;
  color: #059669;
}

.place-order-btn {
  background: linear-gradient(135deg, #10b981, #059669);
  transition: 0.25s ease;
}
.place-order-btn:hover {
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);
}
</style>
