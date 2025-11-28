import { defineStore } from "pinia"
import { useMedusa } from "../composable/useMedusa"
import { useCartStore } from "./cart"
import { useUserStore } from "./user"

interface OrderState {
  orders: any[]
  lastOrder: any | null
  loading: boolean
}

export const useOrderStore = defineStore("order", {
  state: (): OrderState => ({
    orders: [],
    lastOrder: null,
    loading: false,
  }),

  getters: {
    hasLastOrder: (state) => !!state.lastOrder,
  },

  actions: {
    /**
     * Create Order by Completing Cart (Medusa v2)
     * Handles payment sessions automatically
     */
    async createOrder() {
      const cartStore = useCartStore()
      const userStore = useUserStore()
      const { call } = useMedusa()

      console.log("🚀 createOrder CALLED")
      console.log("🛒 Cart before hydrate:", cartStore.cart)
      console.log("👤 User:", userStore.currentUser)

      // Ensure cart is loaded
      await cartStore.hydrate()
      console.log("🛒 Cart after hydrate:", cartStore.cart)

      if (!cartStore.cart?.id) {
        console.error("⛔ Missing Cart ID")
        throw new Error("🛒 No active cart found!")
      }

      if (!userStore.currentUser) {
        console.error("⛔ User not logged in")
        throw new Error("🔐 User not logged in → Order requires account")
      }

      this.loading = true
      try {
        console.log("📦 Creating payment sessions for cart:", cartStore.cart.id)
        await cartStore.createPaymentSessions()

        console.log("💳 Selecting manual (COD) payment method")
        await cartStore.selectManualPayment()

        console.log("📦 Completing cart:", cartStore.cart.id)
        const res = await cartStore.completeCart()
        console.log("📥 Complete cart response:", res)

        const order = res?.order
        console.log("🧾 Extracted Order:", order)

        if (!order) {
          console.error("❌ Backend did NOT return an order")
          throw new Error("⚠ No order returned from backend")
        }

        this.lastOrder = order
        this.orders.unshift(order)

        localStorage.setItem("lastOrder", JSON.stringify(order))

        console.log("🗑 Clearing cart + initializing fresh cart")
        await cartStore.clearCart()
        await cartStore.loadOrCreateCart()

        console.log("📦 Fetching updated user orders")
        await this.fetchMyOrders()

        console.log("🎉 ORDER CREATED SUCCESSFULLY → ID:", order.id)
        return order
      } catch (err: any) {
        console.error("🔥 Full Error:", err)
        throw new Error(err?.message || "Order failed")
      } finally {
        console.log("🔁 Reset loading state")
        this.loading = false
      }
    },

    /**
     * Fetch Order by ID
     */
    async fetchOrder(orderId: string) {
      const { call } = useMedusa()
      console.log(`🔍 Fetching Order ID: ${orderId}`)
      try {
        const res = await call(`store/orders/${orderId}`)
        console.log("📥 Order fetch response:", res)
        return res.order
      } catch (err) {
        console.error(`❌ Failed to fetch order: ${orderId}`, err)
        return null
      }
    },

    /**
     * Fetch customer orders
     */
    async fetchMyOrders() {
      const userStore = useUserStore()
      const { call } = useMedusa()

      if (!userStore.currentUser) {
        console.warn("⚠ User not logged in → Skipping orders fetch")
        return
      }

      console.log("📦 Fetching all user orders")
      this.loading = true
      try {
        const res = await call(`store/customers/me/orders`)
        console.log("📥 Orders Response:", res)
        this.orders = res.orders || []
      } catch (err) {
        console.error("❌ Failed to fetch orders", err)
      } finally {
        this.loading = false
      }
    },

    hydrateLastOrder() {
      const saved = localStorage.getItem("lastOrder")
      console.log("💾 Hydrating lastOrder:", saved)
      if (saved) this.lastOrder = JSON.parse(saved)
    },

    clearLastOrder() {
      console.log("🧹 Clearing lastOrder")
      this.lastOrder = null
      localStorage.removeItem("lastOrder")
    },
  },
})
