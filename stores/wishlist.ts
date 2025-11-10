import { defineStore } from 'pinia'

interface WishlistState {
  productIds: number[]
}

const STORAGE_KEY = 'etsy-clone-wishlist'

export const useWishlistStore = defineStore('wishlist', {
  state: (): WishlistState => ({
    productIds: []
  }),
  getters: {
    count: (state) => state.productIds.length
  },
  actions: {
    toggle(productId: number) {
      if (this.productIds.includes(productId)) {
        this.productIds = this.productIds.filter((id) => id !== productId)
      } else {
        this.productIds.push(productId)
      }
      this.persist()
    },
    isInWishlist(productId: number) {
      return this.productIds.includes(productId)
    },
    persist() {
      if (process.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.productIds))
      }
    },
    hydrate() {
      if (process.client) {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            this.productIds = JSON.parse(stored)
          } catch {
            this.productIds = []
          }
        }
      }
    }
  }
})
