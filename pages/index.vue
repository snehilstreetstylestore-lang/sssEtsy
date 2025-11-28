  <script setup lang="ts">
  import HeroSection from '~/components/ui/HeroSection.vue'
  import CategoryCard from '~/components/ui/CategoryCard.vue'
  import ProductGrid from '~/components/ui/ProductGrid.vue'
  import BaseButton from '~/components/ui/BaseButton.vue'
  import NewsletterSection from '~/components/ui/NewsletterSection.vue'
  import Blogs from '~/components/home/Blogs.vue'
  import { useRouter } from 'vue-router'
  import { computed, onMounted } from 'vue'

  // Stores
  import { useProductStore } from '~/stores/products'
  import { useCartStore } from '~/stores/cart'
  import { useWishlistStore } from '~/stores/wishlist'
  import { useUserStore } from '~/stores/user'

  const router = useRouter()
  const productStore = useProductStore()
  const cartStore = useCartStore()
  const wishlistStore = useWishlistStore()
  const userStore = useUserStore()

  // Load products + categories
  onMounted(async () => {
    console.log("🚀 Fetching Medusa products & categories…")

    await productStore.fetchProducts()
    await productStore.fetchCategories()

    cartStore.hydrate()
    wishlistStore.hydrate()
    userStore.hydrate()
  })

  // Computed
  const featuredProducts = computed(() => productStore.products.slice(0, 4))
  const categories = computed(() => productStore.categories)
  const productsLoading = computed(() => productStore.loadingProducts)
  const categoriesLoading = computed(() => productStore.loadingCategories)
  const error = computed(() => productStore.error)

  // Navigation
  const goToCheckout = () => router.push('/checkout')
  const goToProduct = (id: string) => router.push(`/product/${id}`)

  // Count category items
  const getCountForCategory = (cat: any) => {
    return productStore.products.filter((p) =>
      p.product_categories?.some((c: any) =>
        c.id === cat.id || c.handle === cat.handle
      )
    ).length
  }
  </script>

  <template>
    <div class="space-y-12 pb-10">

      <HeroSection />

      <!-- Product Preview -->
      <section class="grid md:grid-cols-2 gap-8 items-center px-4 sm:px-8">
        <div>
          <h1 class="text-3xl font-semibold tracking-tight mb-3">
            Discover independent shops
          </h1>
          <p class="text-sm text-slate-600 mb-5">
            Browse categories dynamically synced from Medusa backend.
          </p>

          <div class="flex gap-3 flex-wrap">
            <NuxtLink to="/search">
              <BaseButton>Start browsing</BaseButton>
            </NuxtLink>
            <NuxtLink to="/dashboard">
              <BaseButton variant="secondary">Seller dashboard</BaseButton>
            </NuxtLink>
            <BaseButton variant="emerald" @click="goToCheckout">
              Go to checkout
            </BaseButton>
          </div>
        </div>

        <div class="bg-white border shadow p-4 rounded-2xl grid grid-cols-2 gap-4">
          <template v-if="productsLoading">
            <div>Loading products...</div>
          </template>

          <template v-else-if="error">
            <div class="text-red-600">Error: {{ error }}</div>
          </template>

          <template v-else>
            <div
              v-for="product in featuredProducts"
              :key="product.id"
              @click="goToProduct(product.id)"
              class="rounded-xl p-2 bg-slate-50 cursor-pointer"
            >
              <img
                :src="product.thumbnail || product.images?.[0] || '/default-product.jpg'"
                class="w-full h-28 object-cover rounded-lg"
              />
              <p class="text-xs mt-1 line-clamp-2">{{ product.name }}</p>
              <p class="text-xs font-semibold">
                ₹{{ (product.price / 100).toFixed(2) }}
              </p>
            </div>
          </template>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="px-4 sm:px-8">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base font-semibold">Browse by category</h2>
          <NuxtLink to="/search" class="text-xs text-slate-600">
            View all
          </NuxtLink>
        </div>

        <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          <template v-if="categoriesLoading">
            <div class="py-6 px-4">Loading categories…</div>
          </template>

          <template v-else-if="!categories.length">
            <div class="py-6 px-4">⚠ No categories found</div>
          </template>

          <template v-else>
            <div
              v-for="category in categories"
              :key="category.id"
              class="snap-start shrink-0"
            >
              <NuxtLink :to="`/category/${category.handle || category.id}`">
                <CategoryCard
                  :category="{
                    id: category.id,
                    name: category.name,
                    slug: category.handle || category.id,
                    image: '/default-collection.jpg'
                  }"
                />
              </NuxtLink>
              <p class="text-xs text-center mt-1 text-slate-500">
                {{ getCountForCategory(category) }} items
              </p>
            </div>
          </template>
        </div>
      </section>

      <section class="px-4 sm:px-8">
        <h2 class="text-base font-semibold mb-3">Featured Listings</h2>
        <ProductGrid :products="featuredProducts" />
      </section>

      <Blogs />
      <NewsletterSection />
    </div>
  </template>

  <style scoped>
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
  </style>