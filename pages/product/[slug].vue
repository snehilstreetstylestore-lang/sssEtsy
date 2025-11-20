<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, navigateTo } from '#imports'
import { products } from '~/data/products'
import { shops } from '~/data/shops'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'

import BaseButton from '~/components/ui/BaseButton.vue'
import ProductGrid from '~/components/ui/ProductGrid.vue'
import { Heart, Share2 } from 'lucide-vue-next'

// ⭐ NEW — Shop Component
import Shop from '~/components/productDetail/shop.vue'

// ⭐ Chatbox popup toggle
const showChatbox = ref(false)

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const product = computed(() => products.find((p) => p.slug === slug.value))
const shop = computed(() =>
  product.value ? shops.find((s) => s.id === product.value?.shopId) : null
)
const relatedProducts = computed(() =>
  product.value
    ? products.filter(
        (p) =>
          p.categorySlug === product.value?.categorySlug &&
          p.id !== product.value.id
      )
    : []
)

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const selectedImage = ref<string | null>(null)
const displayedImage = computed(() => selectedImage.value || product.value?.images[0])
const selectImage = (img: string) => (selectedImage.value = img)

const addToCart = () => product.value && cartStore.addToCart(product.value.id, 1)
const buyNow = () => {
  if (!product.value) return
  cartStore.addToCart(product.value.id, 1)
  navigateTo('/checkout')
}

const toggleWishlist = () => product.value && wishlistStore.toggle(product.value.id)
const isWishlisted = computed(() =>
  product.value ? wishlistStore.isInWishlist(product.value.id) : false
)

const copied = ref(false)
const shareProduct = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    alert('Could not copy link')
  }
}

// ⭐ REVIEW SYSTEM
const reviews = ref([
  { id: 1, user: 'Aditi', rating: 5, comment: 'Amazing quality! Loved it.', date: '2025-02-01' },
  { id: 2, user: 'Rohan', rating: 4, comment: 'Very good but delivery was slow.', date: '2025-01-29' },
  { id: 3, user: 'Neha', rating: 5, comment: 'Exactly as shown. Perfect!', date: '2025-01-15' }
])

const newRating = ref(0)
const newComment = ref('')

const avgRating = computed(() => {
  if (!reviews.value.length) return 0
  return (reviews.value.reduce((a, b) => a + b.rating, 0) / reviews.value.length).toFixed(1)
})

const addReview = () => {
  if (!newRating.value || !newComment.value) return
  reviews.value.unshift({
    id: Date.now(),
    user: 'Guest User',
    rating: newRating.value,
    comment: newComment.value,
    date: new Date().toISOString().split('T')[0]
  })
  newRating.value = 0
  newComment.value = ''
}
</script>

<template>
  <div v-if="product" class="space-y-8 px-4 sm:px-6 lg:px-8 py-6">

    <!-- PRODUCT SECTION -->
    <section
      class="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 lg:p-8 shadow-sm"
    >
      <!-- Left: Images -->
      <div class="flex flex-col gap-3 flex-1 items-center justify-center w-full">
        <div class="relative rounded-2xl overflow-hidden border border-slate-100 flex justify-center items-center w-full bg-slate-50">
          <img :src="displayedImage" :alt="product.name" class="main-product-image" />
        </div>

        <div
          v-if="product.images.length > 1"
          class="flex gap-2 overflow-x-auto py-2 sm:py-0 scrollbar-hide justify-center w-full"
        >
          <div
            v-for="(img, index) in product.images"
            :key="index"
            @click="selectImage(img)"
            class="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border cursor-pointer transition-all duration-200"
            :class="selectedImage === img ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-slate-400'"
          >
            <img :src="img" :alt="product.name" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div class="flex-1 space-y-4 sm:space-y-5">
        <div class="flex justify-between items-start flex-wrap gap-2">
          <h1 class="text-xl sm:text-2xl font-semibold tracking-tight">{{ product.name }}</h1>

          <div class="flex gap-2 items-center">
            <button type="button" class="rounded-full bg-white border p-2" @click.stop="toggleWishlist">
              <Heart :class="['w-5 h-5', isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-700']" />
            </button>

            <button type="button" class="rounded-full bg-white border p-2 relative" @click.stop="shareProduct">
              <Share2 class="w-5 h-5 text-slate-700" />
              <span v-if="copied" class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Copied!
              </span>
            </button>
          </div>
        </div>

        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">{{ product.description }}</p>

        <div class="bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm w-max animate-bounce">
          ⭐ {{ avgRating }} / 5 — Avg Rating
        </div>

        <p class="text-sm text-slate-700">★ {{ product.rating.toFixed(1) }} · {{ product.ratingCount }} reviews</p>

        <div class="flex items-center gap-3 mt-2">
          <p class="text-2xl sm:text-3xl font-semibold">{{ product.currency }} {{ product.price }}</p>
          <span class="text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
            :class="product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'">
            {{ product.inStock ? 'In stock' : 'Out of stock' }}
          </span>
        </div>

        <div class="flex flex-col sm:flex-row gap-2 mt-3">
          <BaseButton class="flex-1 bg-amber-500 text-white" @click="buyNow">Buy Now</BaseButton>
          <BaseButton class="flex-1 bg-white border border-amber-500 text-amber-600" @click="addToCart">
            Add to Cart
          </BaseButton>
        </div>
      </div>
    </section>



    <!-- REVIEW SECTION -->
    <section class="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
      <h2 class="text-lg font-semibold">Ratings & Reviews</h2>

      <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
        <div class="text-4xl font-bold text-amber-500">{{ avgRating }}</div>
        <div class="flex flex-col text-slate-600 text-sm">
          <span>Based on {{ reviews.length }} reviews</span>
          <span class="text-amber-500 text-lg">★★★★★</span>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-base font-semibold">Write a Review</h3>

        <select v-model="newRating" class="w-full border rounded-lg p-2 text-sm">
          <option value="0">Select Rating</option>
          <option v-for="n in 5" :value="n">{{ n }} Star</option>
        </select>

        <textarea v-model="newComment" rows="3" class="w-full border rounded-lg p-3 text-sm" placeholder="Write your review..."></textarea>

        <BaseButton class="bg-amber-500 text-white" @click="addReview">Submit Review</BaseButton>
      </div>

      <div class="space-y-4">
        <div v-for="review in reviews" :key="review.id" class="border-b pb-3">
          <div class="flex justify-between items-center">
            <p class="font-semibold text-sm">{{ review.user }}</p>
            <p class="text-xs text-slate-500">{{ review.date }}</p>
          </div>
          <p class="text-amber-500">★ {{ review.rating }}/5</p>
          <p class="text-sm text-slate-700">{{ review.comment }}</p>
        </div>
      </div>
    </section>

        <!-- ⭐ NEW — SHOP PROFILE COMPONENT -->
    <section v-if="shop">
      <Shop :shop="shop" :reviews="reviews" @open-chat="showChatbox = true" />
    </section>

    <!-- Related Products -->
    <section v-if="relatedProducts.length">
      <h2 class="text-base sm:text-lg font-semibold mb-4">More from this category</h2>
      <ProductGrid :products="relatedProducts" />
    </section>

    <!-- ⭐ FLOATING CHATBOX POPUP -->
    <div
      v-if="showChatbox"
      class="fixed bottom-4 right-4 w-80 h-96 rounded-xl shadow-xl bg-white border p-3 flex flex-col z-50"
    >
      <div class="flex justify-between items-center border-b pb-2">
        <p class="font-semibold text-sm">Chat with Seller</p>
        <button @click="showChatbox = false" class="text-slate-500 text-sm">✕</button>
      </div>

      <div class="flex-1 overflow-y-auto p-2 text-sm text-slate-700">
        <p class="bg-slate-100 px-3 py-2 rounded-lg w-max">Hello! How can I help you?</p>
      </div>

      <div class="flex gap-2">
        <input class="flex-1 border rounded-lg px-3 py-2 text-sm" placeholder="Type a message..." />
        <button class="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm">Send</button>
      </div>
    </div>
  </div>

  <p v-else class="text-center text-slate-600 py-10">Product not found.</p>
</template>

<style scoped>
.main-product-image {
  width: 100%;
  max-width: 420px;
  max-height: 420px;
  object-fit: contain;
  margin: auto;
  transition: 0.3s;
}
@media (max-width: 1024px) {
  .main-product-image {
    max-width: 320px;
    max-height: 320px;
  }
}
@media (hover: hover) {
  .main-product-image:hover {
    transform: scale(1.04);
  }
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
