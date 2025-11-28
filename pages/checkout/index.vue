<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'
import { useOrderStore } from '~/stores/order'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const orderStore = useOrderStore()

// Default testing values
const fullName = ref("Test User")
const email = ref("test@example.com")
const address = ref("123 Test Road")
const city = ref("Mumbai")
const country = ref("IN")
const zip = ref("400001")

onMounted(async () => {
  await cartStore.hydrate()
  await userStore.hydrate()

  // Overwrite defaults only if logged-in user exists
  if (userStore.currentUser) {
    fullName.value = userStore.currentUser.name || fullName.value
    email.value = userStore.currentUser.email || email.value
  }
})

// Payment
const paymentMethod = ref<'card' | 'cod'>('card')
const codFee = 99
const shippingFee = 49
const freeShippingThreshold = 500

const couponCode = ref('')
const discount = ref(0)

// Cart info
const items = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.subtotal)
const shipping = computed(() =>
  subtotal.value >= freeShippingThreshold ? 0 : shippingFee
)
const total = computed(() => {
  let total = subtotal.value + shipping.value
  if (paymentMethod.value === 'cod') total += codFee
  total -= discount.value
  return total
})

const isShippingOpen = ref(true)
const isPaymentOpen = ref(true)
const isSummaryOpen = ref(true)
const isProcessing = ref(false)

const applyCoupon = () => {
  const code = couponCode.value.toUpperCase()
  if (!code) return alert("Enter coupon")

  if (code === "SAVE50") {
    discount.value = 50
    alert("₹50 Discount Applied")
  } else if (code === "SAVE10P") {
    discount.value = subtotal.value * 0.1
    alert("10% Discount Applied")
  } else {
    alert("Invalid Coupon Code")
  }
}

const handleCheckout = async () => {
  if (!items.value.length) return alert("Cart empty!")
  if (!email.value) return alert("Email required!")

  try {
    isProcessing.value = true
    await cartStore.loadOrCreateCart()

    await cartStore.setShippingAddress({
      first_name: fullName.value.split(" ")[0] || fullName.value,
      last_name: fullName.value.split(" ")[1] || "",
      address_1: address.value,
      city: city.value,
      country_code: country.value.toUpperCase(),
      postal_code: zip.value,
      email: email.value,
    })

    const order = await orderStore.createOrder()
    if (!order?.id) return alert("Order failed!")

    router.push(`/order-success/${order.id}`)
  } catch (err: any) {
    alert(err?.message || "Checkout Failed!")
  } finally {
    isProcessing.value = false
  }
}
</script>

<template>
  <div class="flex flex-col px-4 sm:px-6 lg:px-8 py-6 gap-6 w-full">

    <!-- Shipping Info -->
    <div class="section">
      <button class="section-header" @click="isShippingOpen = !isShippingOpen">
        Shipping Information
        <span>{{ isShippingOpen ? "−" : "+" }}</span>
      </button>

      <div v-show="isShippingOpen" class="section-content">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input v-model="fullName" class="input" placeholder="Full Name" />
          <input v-model="email" class="input" placeholder="Email" />
          <input v-model="address" class="input sm:col-span-2" placeholder="Address" />
          <input v-model="city" class="input" placeholder="City" />
          <input v-model="country" class="input" placeholder="Country Code (IN)" />
          <input v-model="zip" class="input" placeholder="ZIP Code" />
        </div>
      </div>
    </div>

    <!-- Payment -->
    <div class="section">
      <button class="section-header" @click="isPaymentOpen = !isPaymentOpen">
        Payment Method
        <span>{{ isPaymentOpen ? "−" : "+" }}</span>
      </button>

      <div v-show="isPaymentOpen" class="section-content">
        <label class="payment-option">
          <input type="radio" v-model="paymentMethod" value="card" /> Pay Online (Default)
        </label>
        <label class="payment-option">
          <input type="radio" v-model="paymentMethod" value="cod" /> Cash on Delivery (+₹99)
        </label>
      </div>
    </div>

    <!-- Order Summary -->
    <div class="section">
      <button class="section-header" @click="isSummaryOpen = !isSummaryOpen">
        Order Summary
        <span>{{ isSummaryOpen ? "−" : "+" }}</span>
      </button>

      <div v-show="isSummaryOpen" class="section-content space-y-4">
        <div v-for="item in items" :key="item.id" class="flex justify-between text-sm">
          <span>{{ item.title }} × {{ item.quantity }}</span>
          <span>₹{{ item.total }}</span>
        </div>

        <div class="divider"></div>

        <div class="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{{ subtotal }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Shipping</span>
          <span>₹{{ shipping }}</span>
        </div>
        <div class="flex justify-between text-sm" v-if="discount > 0">
          <span>Discount</span>
          <span>-₹{{ discount }}</span>
        </div>
        <div class="flex justify-between text-sm" v-if="paymentMethod === 'cod'">
          <span>COD Fee</span>
          <span>₹{{ codFee }}</span>
        </div>

        <div class="total-row">
          <span>Total</span>
          <span>₹{{ total }}</span>
        </div>

        <div class="coupon-box">
          <input class="input" placeholder="Coupon Code" v-model="couponCode" />
          <button class="apply-btn" @click="applyCoupon">Apply</button>
        </div>
      </div>
    </div>

    <!-- Checkout -->
    <button @click="handleCheckout" :disabled="isProcessing"
      class="place-order-btn disabled:opacity-50 disabled:cursor-not-allowed">
      {{ isProcessing ? "Processing..." : "Place Order" }}
    </button>
  </div>
</template>

<style scoped>
.section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.section-header {
  width: 100%;
  padding: 18px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}
.section-content {
  padding: 18px;
  border-top: 1px solid #e2e8f0;
}
.input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px;
}
.payment-option {
  display: flex;
  gap: 8px;
  font-size: 15px;
}
.divider {
  border-top: 1px solid #e5e7eb;
}
.total-row {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin-top: 6px;
}
.coupon-box {
  display: flex;
  gap: 8px;
}
.apply-btn {
  background: #0284c7;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
}
.place-order-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
  color: white;
  font-weight: 600;
  border-radius: 12px;
  margin-top: 12px;
}
</style>
