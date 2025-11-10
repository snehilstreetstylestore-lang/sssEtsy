import { defineStore } from 'pinia'
import type { User } from '~/data/users'
import { mockUser } from '~/data/users'

interface UserState {
  currentUser: User | null
}

const STORAGE_KEY = 'etsy-clone-user'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    currentUser: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.currentUser
  },
  actions: {
    login(email: string, _password: string) {
      // Mock login: any email logs in as mock user with that email
      this.currentUser = { ...mockUser, email }
      this.persist()
    },
    register(name: string, email: string, _password: string) {
      this.currentUser = { ...mockUser, name, email }
      this.persist()
    },
    logout() {
      this.currentUser = null
      if (process.client) {
        localStorage.removeItem(STORAGE_KEY)
      }
    },
    persist() {
      if (process.client && this.currentUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.currentUser))
      }
    },
    hydrate() {
      if (process.client) {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            this.currentUser = JSON.parse(stored)
          } catch {
            this.currentUser = null
          }
        }
      }
    }
  }
})
