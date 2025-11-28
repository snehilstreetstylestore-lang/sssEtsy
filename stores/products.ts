// ~/stores/products.ts
import { defineStore } from 'pinia'
import { useMedusa } from '../composable/useMedusa'

export interface Product {
  id: string
  title: string
  name?: string
  description?: string
  thumbnail?: string
  images?: string[]
  variants?: any[]
  product_categories?: any[]
  price?: number
  currency?: string
  inStock?: boolean
}

interface Category {
  id: string
  name: string
  handle?: string
}

interface ProductState {
  products: Product[]
  categories: Category[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
}

export const useProductStore = defineStore('products', {
  state: (): ProductState => ({
    products: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null
  }),

  getters: {
    allProducts: (state) => state.products,

    productById: (state) => (id: string) =>
      state.products.find((p) => p.id === id),

    // Filter products by category ID or handle
    getProductsByCategory: (state) => (category: string) =>
      state.products.filter((p) =>
        p.product_categories?.some(
          (c: any) => c.id === category || c.handle === category
        )
      )
  },

  actions: {
    formatProduct(p: any): Product {
      return {
        id: p.id,
        title: p.title || p.name,
        name: p.title || p.name,
        description: p.description,
        thumbnail: p.thumbnail || p.images?.[0]?.url || '/default-product.jpg',
        images: p.images?.map((i: any) => i.url),
        variants: p.variants || [],
        product_categories: p.categories || p.product_categories || [],
        price: p.variants?.[0]?.prices?.[0]?.amount || p.price || 0,
        currency:
          p.variants?.[0]?.prices?.[0]?.currency_code || 'usd',
        inStock: p.variants?.[0]?.inventory_quantity > 0
      }
    },

    async fetchProducts() {
      const { call } = useMedusa()
      try {
        this.loading = true
        this.error = null

        const data: any = await call(
          'store/products?expand=categories,variants,variants.prices,images'
        )

        this.products = data.products.map((p: any) => this.formatProduct(p))
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
  const { call } = useMedusa()

  try {
    this.loading = true
    this.error = null

    const data: any = await call(
      'store/product-categories'
    )

    this.categories = data.product_categories || []
    console.log("📦 Categories fetched:", this.categories.length)
  } catch (err: any) {
    console.error("❌ Failed to fetch categories:", err)
    this.error = err.message || "Error fetching categories"
  } finally {
    this.loading = false
  }
}

,

    async fetchProductById(id: string) {
      const { call } = useMedusa()

      try {
        this.loading = true
        this.error = null

        const data: any = await call(
          `store/products/${id}?expand=categories,variants,variants.prices,images`
        )

        this.selectedProduct = this.formatProduct(data.product)
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch product details'
      } finally {
        this.loading = false
      }
    }
  }
})
