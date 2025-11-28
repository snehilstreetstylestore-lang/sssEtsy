<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRoute, navigateTo } from "#imports"
import { useCartStore } from "~/stores/cart"
import { useWishlistStore } from "~/stores/wishlist"
import { useMedusa } from "~/composable/useMedusa"

import BaseButton from "~/components/ui/BaseButton.vue"
import ProductGrid from "~/components/ui/ProductGrid.vue"
import { Heart, Share2 } from "lucide-vue-next"
import Shop from "~/components/productDetail/shop.vue"

const showChatbox = ref(false)
const { call } = useMedusa()

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const product = ref<any>(null)
const relatedProducts = ref<any[]>([])
const shop = ref<any>(null) // optional shop info

// ⭐ Fetch product from Medusa backend
const fetchProduct = async () => {
  const { products } = await call(`/store/products?handle=${slug.value}`)
  if (products?.length) {
    product.value = products[0]
    fetchRelated()
    fetchShop()
  }
}

// ⭐ Fetch related products by collection
const fetchRelated = async () => {
  const collectionId = product.value?.collection_id
  if (!collectionId) return
  const { products: list } = await call(`/store/products?collection_id=${collectionId}`)
  relatedProducts.value = list.filter((p: any) => p.id !== product.value?.id)
}

// ⭐ Optional: fetch shop info (mock for now)
const fetchShop = async () => {
  shop.value = {
    id: "shop1",
    name: "Creative Store",
    avatar: "/default-shop-avatar.png"
  }
}

onMounted(() => {
  fetchProduct()
  cartStore.hydrate()
})

// Images
const selectedImage = ref<string | null>(null)
const displayedImage = computed(() => selectedImage.value || product.value?.thumbnail)
const selectImage = (img: string) => (selectedImage.value = img)

// ⭐ Add to Cart
const addToCart = async () => {
  const variant = product.value?.variants?.[0]
  if (!variant) return alert("No variant found")
  await cartStore.addToCart(variant.id, 1)
}

// ⭐ Buy Now
const buyNow = async () => {
  await addToCart()
  navigateTo("/checkout")
}

// Wishlist
const toggleWishlist = () => product.value && wishlistStore.toggle(product.value.id)
const isWishlisted = computed(() =>
  product.value ? wishlistStore.isInWishlist(product.value.id) : false
)

// Share
const copied = ref(false)
const shareProduct = async () => {
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}

// Reviews (local only)
const reviews = ref([
  { id: 1, user: "Aditi", rating: 5, comment: "Amazing quality! Loved it.", date: "2025-02-01" },
  { id: 2, user: "Rohan", rating: 4, comment: "Very good but delivery was slow.", date: "2025-01-29" },
  { id: 3, user: "Neha", rating: 5, comment: "Exactly as shown. Perfect!", date: "2025-01-15" }
])
const newRating = ref(0)
const newComment = ref("")
const avgRating = computed(() => {
  if (!reviews.value.length) return 0
  return (reviews.value.reduce((a, b) => a + b.rating, 0) / reviews.value.length).toFixed(1)
})
const addReview = () => {
  if (!newRating.value || !newComment.value) return
  reviews.value.unshift({
    id: Date.now(),
    user: "Guest User",
    rating: newRating.value,
    comment: newComment.value,
    date: new Date().toISOString().split("T")[0]
  })
  newRating.value = 0
  newComment.value = ""
}
</script>

<template>
  <div v-if="product" class="space-y-8 px-4 sm:px-6 lg:px-8 py-6">

    <!-- PRODUCT SECTION -->
    <section class="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 lg:p-8 shadow-sm">
      
      <!-- Left: Images -->
      <div class="flex flex-col gap-3 flex-1 items-center justify-center w-full">
        <div class="relative rounded-2xl overflow-hidden border border-slate-100 flex justify-center items-center w-full bg-slate-50">
          <img :src="displayedImage" :alt="product.title" class="main-product-image" />
        </div>

        <div v-if="product.images.length > 1" class="flex gap-2 overflow-x-auto py-2 sm:py-0 scrollbar-hide justify-center w-full">
          <div
            v-for="(img, index) in product.images"
            :key="index"
            @click="selectImage(img)"
            class="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border cursor-pointer transition-all duration-200"
            :class="selectedImage === img ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-slate-400'"
          >
            <img :src="img" :alt="product.title" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div class="flex-1 space-y-4 sm:space-y-5">
        <div class="flex justify-between items-start flex-wrap gap-2">
          <h1 class="text-xl sm:text-2xl font-semibold tracking-tight">{{ product.title }}</h1>

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

        <div class="flex items-center gap-3 mt-2">
          <p class="text-2xl sm:text-3xl font-semibold">{{ product.variants[0]?.prices[0]?.amount / 100 | currency(product.variants[0]?.prices[0]?.currency_code) }}</p>
          <span class="text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
            :class="product.inventory_quantity > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'">
            {{ product.inventory_quantity > 0 ? 'In stock' : 'Out of stock' }}
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

    <!-- Related Products -->
    <section v-if="relatedProducts.length" class="mt-8">
      <h2 class="text-base sm:text-lg font-semibold mb-4">More from this category</h2>
      <ProductGrid :products="relatedProducts" />
    </section>

    <!-- Review Section -->
    <section class="bg-white border rounded-2xl p-6 shadow-sm space-y-6 mt-6">
      <h2 class="text-lg font-semibold">Ratings & Reviews</h2>
      <div v-for="review in reviews" :key="review.id" class="border-b pb-3">
        <div class="flex justify-between items-center">
          <p class="font-semibold text-sm">{{ review.user }}</p>
          <p class="text-xs text-slate-500">{{ review.date }}</p>
        </div>
        <p class="text-amber-500">★ {{ review.rating }}/5</p>
        <p class="text-sm text-slate-700">{{ review.comment }}</p>
      </div>
    </section>
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
