<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from '#imports'
import { products } from '~/data/products'
import { shops } from '~/data/shops'
import { useCartStore } from '~/stores/cart'
import { useWishlistStore } from '~/stores/wishlist'
import BaseButton from '~/components/ui/BaseButton.vue'
import ProductGrid from '~/components/ui/ProductGrid.vue'

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
const toggleWishlist = () => product.value && wishlistStore.toggle(product.value.id)
const isWishlisted = computed(() => (product.value ? wishlistStore.isInWishlist(product.value.id) : false))
</script>

<template>
  <div v-if="product" class="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
    <!-- Product Section -->
    <section
      class="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 lg:p-8 shadow-sm"
    >
      <!-- Left: Images -->
      <div class="flex flex-col gap-3 flex-1 justify-center items-center">
        <!-- Main Image -->
        <div class="relative rounded-2xl overflow-hidden border border-slate-100 flex justify-center items-center w-full">
          <img
            :src="displayedImage"
            :alt="product.name"
            class="max-w-full max-h-[280px] sm:max-h-[360px] lg:max-h-[420px] object-contain rounded-2xl"
          />
        </div>

        <!-- Thumbnails -->
        <div
          v-if="product.images.length > 1"
          class="flex gap-2 overflow-x-auto py-2 sm:py-0 scrollbar-hide justify-center"
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
            <img :src="img" :alt="product.name" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Right: Details -->
      <div class="flex-1 space-y-4 sm:space-y-5">
        <!-- Title & Description -->
        <div>
          <h1 class="text-xl sm:text-2xl font-semibold tracking-tight">
            {{ product.name }}
          </h1>
          <p class="text-slate-600 mt-1 text-sm sm:text-base leading-relaxed">
            {{ product.description }}
          </p>
          <p class="text-sm text-slate-700 mt-2">
            ★ {{ product.rating.toFixed(1) }} · {{ product.ratingCount }} reviews
          </p>
        </div>

        <!-- Price & Stock -->
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

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
          <BaseButton class="flex-1" @click="addToCart" :disabled="!product.inStock">
            Add to cart
          </BaseButton>
          <BaseButton class="flex-1" variant="secondary" @click="toggleWishlist">
            <span v-if="isWishlisted">❤️ Wishlisted</span>
            <span v-else>🤍 Add to wishlist</span>
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

  <!-- Fallback -->
  <p v-else class="text-sm sm:text-base text-slate-600 text-center py-10">
    Product not found.
  </p>
</template>

<style scoped>
/* Smooth image hover */
img {
  transition: transform 0.3s ease;
}
img:hover {
  transform: scale(1.02);
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
