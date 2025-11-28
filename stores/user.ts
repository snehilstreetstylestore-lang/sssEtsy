import { defineStore } from "pinia"
import { useCartStore } from "./cart"
import type { User } from "~/data/users"

interface UserState {
  currentUser: User | null
}

const STORAGE_KEY = "etsy-user"

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    currentUser: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.currentUser,
  },

  actions: {
    // Register user locally
    async register(details: {
      first_name?: string
      last_name?: string
      email: string
      phone?: string
    }) {
      console.log("📝 Register locally →", details)

      // Create user locally
      this.currentUser = {
        name: `${details.first_name || ""} ${details.last_name || ""}`,
        email: details.email,
      }

      this.persist()
      console.log("✅ User registered and persisted →", this.currentUser)

      // Ensure cart is linked to this user
      await this.ensureCart()
    },

    // Login locally (just by email, no backend auth)
    async login(email: string) {
      console.log("🔑 Login locally →", email)

      if (process.client) {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const user = JSON.parse(stored)
          if (user?.email === email) {
            this.currentUser = user
            console.log("✅ User loaded from storage →", this.currentUser)
          } else {
            this.currentUser = { name: "", email }
            console.log("ℹ New user session started →", this.currentUser)
          }
        } else {
          this.currentUser = { name: "", email }
          console.log("ℹ New user session started →", this.currentUser)
        }

        this.persist()
        await this.ensureCart()
      }
    },

    // Create or ensure cart is ready and linked to this user
    async ensureCart() {
      console.log("🛒 ensureCart → checking or creating cart")

      try {
        const cartStore = useCartStore()

        // If user has a cartId saved, try loading that cart
        let cartId: string | null = null
        if (this.currentUser && process.client) {
          const storedUser = localStorage.getItem(STORAGE_KEY)
          if (storedUser) {
            const user = JSON.parse(storedUser)
            cartId = user?.cartId || null
          }
        }

        const result = await cartStore.loadOrCreateCart(cartId)

        if (result?.createdNewCart) {
          console.log("🎉 Cart created →", result.cart?.id)
        } else if (result?.cart?.id) {
          console.log("📦 Existing cart restored →", result.cart?.id)
        } else {
          console.warn("⚠ Cart missing! Cart Store returned:", result)
        }

        // Save cartId in user local storage
        if (result?.cart?.id && this.currentUser) {
          this.currentUser.cartId = result.cart.id
          this.persist()
          console.log("💾 Cart ID saved to user →", result.cart.id)
        }
      } catch (err: any) {
        console.error("❌ ensureCart error:", err)
      }
    },

    // Logout locally
    logout() {
      console.log("🚪 Logging out user")
      this.currentUser = null
      this.persist()
      console.log("✅ User state cleared and persisted")
    },

    // Persist user in localStorage
    persist() {
      if (process.client) {
        console.log("💾 Persisting user locally →", this.currentUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.currentUser))
      }
    },

    // Hydrate user from localStorage
    hydrate() {
      if (process.client) {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          console.log("💡 Hydrating user from storage")
          this.currentUser = JSON.parse(stored)
          console.log("✅ User hydrated →", this.currentUser)

          // Ensure cart is ready after hydration
          this.ensureCart()
        } else {
          console.log("ℹ No stored user found")
        }
      }
    },
  },
})
