import { defineStore } from 'pinia'
import { products } from '~/data/products'

export interface CartItem {
  productId: number
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const STORAGE_KEY = 'etsy-clone-cart'

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: []
  }),
  getters: {
    count: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    detailedItems: (state) => {
      return state.items.map((item) => {
        const product = products.find((p) => p.id === item.productId)
        return {
          product,
          quantity: item.quantity
        }
      }).filter((i) => i.product)
    },
    total: (state) =>
      state.items.reduce((total, item) => {
        const product = products.find((p) => p.id === item.productId)
        return product ? total + product.price * item.quantity : total
      }, 0)
  },
  actions: {
    addToCart(productId: number, quantity = 1) {
      const existing = this.items.find((i) => i.productId === productId)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ productId, quantity })
      }
      this.persist()
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter((i) => i.productId !== productId)
      this.persist()
    },
    setQuantity(productId: number, quantity: number) {
      if (quantity <= 0) {
        this.removeFromCart(productId)
        return
      }
      const existing = this.items.find((i) => i.productId === productId)
      if (existing) {
        existing.quantity = quantity
        this.persist()
      }
    },
    clearCart() {
      this.items = []
      this.persist()
    },
    persist() {
      if (process.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
      }
    },
    hydrate() {
      if (process.client) {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            this.items = JSON.parse(stored)
          } catch {
            this.items = []
          }
        }
      }
    }
  }
})
