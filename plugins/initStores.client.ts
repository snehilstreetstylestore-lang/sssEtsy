import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import { useUserStore } from '~/stores/user'

export default defineNuxtPlugin(() => {
  const cart = useCartStore()
  const wishlist = useWishlistStore()
  const user = useUserStore()

  cart.hydrate()
  wishlist.hydrate()
  user.hydrate()
})
