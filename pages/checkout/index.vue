<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import BaseButton from '~/components/ui/BaseButton.vue'

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

// Coupon code state
const couponCode = ref('')
const discount = ref(0)

// Free shipping
const freeShippingThreshold = 500
const shippingFee = ref(49)

// Computed cart items and totals
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

// Collapsible state
const isShippingOpen = ref(true)
const isPaymentOpen = ref(true)
const isSummaryOpen = ref(true)

// Apply coupon code
const applyCoupon = () => {
  if (!couponCode.value) return alert('Enter a coupon code!')
  if (couponCode.value.toUpperCase() === 'SAVE50') {
    discount.value = 50
    alert('Coupon applied: $50 discount!')
  } else if (couponCode.value.toUpperCase() === 'SAVE10P') {
    discount.value = subtotal.value * 0.1
    alert(`Coupon applied: 10% off ($${discount.value.toFixed(2)})`)
  } else {
    alert('Invalid coupon code')
  }
}

// Checkout handler
const handleCheckout = () => {
  if (!fullName.value || !email.value || !address.value || !city.value || !country.value || !zip.value) {
    alert('Please fill in all fields')
    return
  }
  alert(
    `Order placed successfully!\nPayment Method: ${paymentMethod.value.toUpperCase()}\nTotal: $${total.value.toFixed(2)}`
  )
  cartStore.clearCart()
  couponCode.value = ''
  discount.value = 0
}
</script>

<template>
  <div class="flex flex-col px-4 sm:px-6 lg:px-8 py-6 gap-6 w-full">

    <!-- Shipping Information -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <button @click="isShippingOpen = !isShippingOpen" class="w-full text-left p-6 flex justify-between items-center font-semibold text-lg">
        <span>Shipping Information</span>
        <span>{{ isShippingOpen ? '−' : '+' }}</span>
      </button>
      <div v-show="isShippingOpen" class="p-6 border-t border-slate-100 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input v-model="fullName" type="text" placeholder="Full Name" class="input" />
          <input v-model="email" type="email" placeholder="Email" class="input" />
          <input v-model="address" type="text" placeholder="Address" class="input sm:col-span-2" />
          <input v-model="city" type="text" placeholder="City" class="input" />
          <input v-model="country" type="text" placeholder="Country" class="input" />
          <input v-model="zip" type="text" placeholder="ZIP / Postal Code" class="input" />
        </div>
      </div>
    </div>

    <!-- Payment Method -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <button @click="isPaymentOpen = !isPaymentOpen" class="w-full text-left p-6 flex justify-between items-center font-semibold text-lg">
        <span>Payment Method</span>
        <span>{{ isPaymentOpen ? '−' : '+' }}</span>
      </button>
      <div v-show="isPaymentOpen" class="p-6 border-t border-slate-100 flex flex-col gap-3 mt-2">
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" v-model="paymentMethod" value="card" class="form-radio" />
          Credit / Debit Card
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" v-model="paymentMethod" value="paypal" class="form-radio" />
          PayPal
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <input type="radio" v-model="paymentMethod" value="cod" class="form-radio" />
          Cash on Delivery (+$99)
        </label>
      </div>
    </div>

    <!-- Order Summary + Coupon -->
    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col">
      <button @click="isSummaryOpen = !isSummaryOpen" class="w-full text-left p-6 flex justify-between items-center font-semibold text-lg">
        <span>Order Summary</span>
        <span>{{ isSummaryOpen ? '−' : '+' }}</span>
      </button>

      <div v-show="isSummaryOpen" class="p-6 border-t border-slate-100 flex flex-col">
        <div class="divide-y divide-slate-100 max-h-80 overflow-y-auto flex-1">
          <div v-for="item in detailedItems" :key="item.product?.id" class="flex justify-between py-2 items-center">
            <div class="flex items-center gap-3">
              <img :src="item.product?.images[0]" :alt="item.product?.name" class="w-12 h-12 object-cover rounded" />
              <p class="text-sm line-clamp-1">{{ item.product?.name }}</p>
            </div>
            <p class="text-sm font-semibold">${{ (item.product?.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>

        <div class="mt-4 space-y-1">
          <div class="flex justify-between font-medium text-sm">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div v-if="paymentMethod === 'cod'" class="flex justify-between font-medium text-sm text-emerald-600">
            <span>COD Fee</span>
            <span>${{ codFee }}</span>
          </div>
          <div class="flex justify-between font-medium text-sm text-slate-600">
            <span>Shipping</span>
            <span>{{ shipping.value === 0 ? 'Free' : `$${shipping.value}` }}</span>
          </div>
          <div v-if="discount" class="flex justify-between font-medium text-sm text-green-600">
            <span>Discount</span>
            <span>-${{ discount.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Coupon Code Below Summary -->
        <div class="bg-slate-50 rounded-lg p-4 mt-3 flex gap-3 items-center">
          <input v-model="couponCode" type="text" placeholder="Enter coupon code" class="input flex-1" />
          <BaseButton @click="applyCoupon">Apply</BaseButton>
        </div>
        <p v-if="discount" class="text-green-600 text-sm mt-1">Discount applied: ${{ discount.toFixed(2) }}</p>

        <div class="flex justify-between font-semibold text-lg mt-3 border-t border-slate-200 pt-3">
          <span>Total</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>

        <BaseButton class="w-full mt-4" @click="handleCheckout">
          Place Order
        </BaseButton>
      </div>
    </div>

  </div>
</template>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #1e293b;
  outline: none;
  transition: border-color 0.2s;
}
.input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}
.form-radio {
  accent-color: #10b981;
}
button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
