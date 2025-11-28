import { defineStore } from "pinia"
import { useMedusa } from "../composable/useMedusa"

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: null as any,
    loading: false,
    regionId: null as string | null,
  }),

  getters: {
    items: (state) => state.cart?.items || [],
    count: (state) =>
      state.cart?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0,
    subtotal: (state) => (state.cart?.subtotal ?? 0) / 100,
    shipping: (state) => (state.cart?.shipping_total ?? 0) / 100,
    discount: (state) => (state.cart?.discount_total ?? 0) / 100,
    total: (state) => (state.cart?.total ?? 0) / 100,
    detailedItems: (state) =>
      state.cart?.items?.map((item: any) => ({
        ...item,
        title: item.title,
        quantity: item.quantity,
        price: item.unit_price / 100,
      })) || [],
  },

  actions: {
    async loadOrCreateCart() {
      const { call } = useMedusa()
      this.loading = true
      console.log("🚀 loadOrCreateCart called")

      try {
        let cartId = process.client ? localStorage.getItem("medusa_cart_id") : null
        console.log("🛒 Found cartId in localStorage:", cartId)

        if (cartId) {
          try {
            const res = await call(`store/carts/${cartId}`)
            this.cart = res.cart
            this.regionId = res.cart.region_id || null
            console.log("✅ Loaded existing cart:", this.cart)
            return
          } catch (err) {
            console.warn("⚠ Failed to fetch existing cart, clearing localStorage", err)
            this.clearCart()
          }
        }

        console.log("📦 Creating new cart…")
        await this.createCart()
      } finally {
        this.loading = false
      }
    },

    async createCart() {
      const { call } = useMedusa()
      this.loading = true
      console.log("🚀 createCart called")

      try {
        const res = await call("store/carts", { method: "POST" })
        this.cart = res.cart
        this.regionId = res.cart.region_id || null
        this.save()
        console.log("✅ New cart created:", this.cart)
      } finally {
        this.loading = false
      }
    },

    async fetchCart() {
      if (!this.cart?.id) {
        console.warn("⚠ fetchCart called but no cart ID")
        return
      }
      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}`)
        this.cart = res.cart
        console.log("✅ Cart fetched:", this.cart)
      } finally {
        this.loading = false
      }
    },

    async addToCart(variantId: string, quantity = 1) {
      console.log("➕ addToCart called", { variantId, quantity })
      await this.loadOrCreateCart()
      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}/line-items`, {
          method: "POST",
          body: { variant_id: variantId, quantity },
        })
        this.cart = res.cart
        this.save()
        console.log("✅ Item added to cart:", res.cart)
      } finally {
        this.loading = false
      }
    },

    async removeFromCart(lineId: string) {
      if (!this.cart?.id) {
        console.warn("⚠ removeFromCart called but no cart ID")
        return
      }
      console.log("🗑 removeFromCart called", lineId)
      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}/line-items/${lineId}`, {
          method: "DELETE",
        })
        this.cart = res.cart
        this.save()
        console.log("✅ Item removed from cart:", res.cart)
      } finally {
        this.loading = false
      }
    },

    async setQuantity(lineId: string, quantity: number) {
      console.log("🔄 setQuantity called", { lineId, quantity })
      if (!this.cart?.id) {
        console.warn("⚠ setQuantity called but no cart ID")
        return
      }
      if (quantity <= 0) return this.removeFromCart(lineId)
      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}/line-items/${lineId}`, {
          method: "POST",
          body: { quantity },
        })
        this.cart = res.cart
        this.save()
        console.log("✅ Item quantity updated:", res.cart)
      } finally {
        this.loading = false
      }
    },

    async applyCoupon(code: string) {
      console.log("🏷 applyCoupon called", code)
      await this.loadOrCreateCart()
      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}`, {
          method: "POST",
          body: { discounts: [{ code }] },
        })
        this.cart = res.cart
        this.save()
        console.log("✅ Coupon applied:", res.cart)
      } finally {
        this.loading = false
      }
    },

    async setShippingAddress(payload: any) {
      console.log("🚚 setShippingAddress called", payload)
      await this.loadOrCreateCart()
      if (!payload.country_code || payload.country_code.length !== 2)
        throw new Error("Invalid country code")

      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}`, {
          method: "POST",
          body: { shipping_address: payload },
        })
        this.cart = res.cart
        this.save()
        console.log("✅ Shipping address updated:", res.cart)
      } finally {
        this.loading = false
      }
    },

    async setBillingAddress(payload: any) {
      console.log("💳 setBillingAddress called", payload)
      await this.loadOrCreateCart()
      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}`, {
          method: "POST",
          body: { billing_address: payload },
        })
        this.cart = res.cart
        this.save()
        console.log("✅ Billing address updated:", res.cart)
      } finally {
        this.loading = false
      }
    },

    async createPaymentSessions() {
      console.log("💰 createPaymentSessions called")
      if (!this.cart?.id) {
        console.warn("⚠ createPaymentSessions called but no cart ID")
        return
      }
      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}/payment-sessions`, {
          method: "POST",
        })
        this.cart = res.cart
        console.log("✅ Payment sessions created:", res.cart)
      } finally {
        this.loading = false
      }
    },

    async selectManualPayment() {
      console.log("📝 selectManualPayment called")
      if (!this.cart?.id) {
        console.warn("⚠ selectManualPayment called but no cart ID")
        return
      }
      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}/payment-session`, {
          method: "POST",
          body: { provider_id: "manual" },
        })
        this.cart = res.cart
        this.save()
        console.log("✅ Manual payment selected:", res.cart)
      } finally {
        this.loading = false
      }
    },

    async completeCart() {
      console.log("✅ completeCart called")
      if (!this.cart?.id) {
        console.warn("⛔ No active cart to complete")
        throw new Error("No active cart to complete")
      }
      const { call } = useMedusa()
      this.loading = true
      try {
        const res = await call(`store/carts/${this.cart.id}/complete`, {
          method: "POST",
        })
        console.log("🎉 Cart completed → order created:", res)
        this.clearCart()
        return res
      } finally {
        this.loading = false
      }
    },

    save() {
      if (process.client && this.cart?.id) {
        localStorage.setItem("medusa_cart_id", this.cart.id)
        console.log("💾 Cart saved to localStorage:", this.cart.id)
      }
    },

    async hydrate() {
      console.log("💧 hydrate called")
      await this.loadOrCreateCart()
    },

    clearCart() {
      console.log("🗑 clearCart called")
      this.cart = null
      this.regionId = null
      if (process.client) {
        localStorage.removeItem("medusa_cart_id")
        console.log("🗑 Cart removed from localStorage")
      }
    },
  },
})
