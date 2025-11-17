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
</script>

<template>
  <div v-if="product" class="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
    <!-- Product Section -->
    <section
      class="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 lg:p-8 shadow-sm"
    >
      <!-- Left: Images -->
      <div class="flex flex-col gap-3 flex-1 items-center justify-center w-full">
        <!-- Main Image -->
        <div
          class="relative rounded-2xl overflow-hidden border border-slate-100 flex justify-center items-center w-full bg-slate-50"
        >
          <img
            :src="displayedImage"
            :alt="product.name"
            class="main-product-image"
          />
        </div>

        <!-- Thumbnails -->
        <div
          v-if="product.images.length > 1"
          class="flex gap-2 overflow-x-auto py-2 sm:py-0 scrollbar-hide justify-center w-full"
        >
          <div
            v-for="(img, index) in product.images"
            :key="index"
            @click="selectImage(img)"
            class="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border cursor-pointer transition-all duration-200"
            :class="selectedImage === img
              ? 'border-emerald-500 ring-2 ring-emerald-200'
              : 'border-slate-200 hover:border-slate-400'"
          >
            <img
              :src="img"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Right: Details -->
      <div class="flex-1 space-y-4 sm:space-y-5">
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-start flex-wrap gap-2">
            <h1 class="text-xl sm:text-2xl font-semibold tracking-tight">
              {{ product.name }}
            </h1>

            <!-- Wishlist + Share -->
            <div class="flex gap-2 items-center">
              <button
                type="button"
                class="rounded-full bg-white border border-slate-200 p-2 shadow-sm hover:bg-slate-50 transition"
                @click.prevent.stop="toggleWishlist"
              >
                <Heart
                  :class="[ 'w-5 h-5 transition-colors duration-200', isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-700' ]"
                />
              </button>

              <button
                type="button"
                class="rounded-full bg-white border border-slate-200 p-2 shadow-sm hover:bg-slate-50 transition relative"
                @click.prevent.stop="shareProduct"
              >
                <Share2 class="w-5 h-5 text-slate-700" />
                <span
                  v-if="copied"
                  class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full shadow-sm"
                >
                  Copied!
                </span>
              </button>
            </div>
          </div>

          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
            {{ product.description }}
          </p>
          <p class="text-sm text-slate-700">
            ★ {{ product.rating.toFixed(1) }} · {{ product.ratingCount }} reviews
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 mt-2">
          <p class="text-2xl sm:text-3xl font-semibold">
            {{ product.currency }} {{ product.price }}
          </p>
          <span
            class="text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
            :class="product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'"
          >
            {{ product.inStock ? 'In stock' : 'Out of stock' }}
          </span>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
          <BaseButton
            class="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium"
            @click="buyNow"
            :disabled="!product.inStock"
          >
            Buy Now
          </BaseButton>
          <BaseButton
            class="flex-1 bg-white border border-amber-500 text-amber-600 hover:bg-amber-50 font-medium"
            @click="addToCart"
            :disabled="!product.inStock"
          >
            Add to Cart
          </BaseButton>
        </div>

        <!-- Shop Info -->
        <div
          v-if="shop"
          class="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <div class="h-12 w-12 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
            <img :src="shop.avatar" :alt="shop.name" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1">
            <p class="text-xs text-slate-500 uppercase tracking-wide">Shop</p>
            <NuxtLink
              :to="`/shop/${shop.slug}`"
              class="text-sm sm:text-base font-semibold hover:underline"
            >
              {{ shop.name }}
            </NuxtLink>
            <p class="text-xs sm:text-sm text-slate-500">{{ shop.tagline }}</p>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">
              ★ {{ shop.rating.toFixed(1) }} · {{ shop.sales }} sales
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section v-if="relatedProducts.length">
      <h2 class="text-base sm:text-lg font-semibold mb-4 tracking-tight">
        More from this category
      </h2>
      <ProductGrid :products="relatedProducts" />
    </section>
  </div>

  <p v-else class="text-sm sm:text-base text-slate-600 text-center py-10">
    Product not found.
  </p>
</template>

<style scoped>
.main-product-image {
  width: 100%;
  height: auto;
  max-width: 420px;
  max-height: 420px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

/* Center perfectly for smaller screens */
@media (max-width: 1024px) {
  .main-product-image {
    max-width: 320px;
    max-height: 320px;
    margin: 0 auto;
  }
}

/* Hover effect for desktop only */
@media (hover: hover) and (pointer: fine) {
  .main-product-image:hover {
    transform: scale(1.04);
  }
}

/* Disable hover effect for touch devices */
@media (hover: none) and (pointer: coarse) {
  .main-product-image:hover {
    transform: none !important;
  }
}

/* Hide horizontal scrollbar for thumbnails */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
