import type { Shop } from './shops'

export interface Product {
  id: number
  slug: string
  name: string
  description: string
  price: number
  currency: string
  categorySlug: string
  shopId: number
  images: string[]
  badges: string[]
  rating: number
  ratingCount: number
  inStock: boolean
  tags: string[]
}

export const products: Product[] = [
  {
    id: 101,
    slug: 'gold-vermeil-orbit-hoops',
    name: 'Gold Vermeil Orbit Hoops',
    description: 'Lightweight everyday hoops with a subtle orbital ring detail.',
    price: 46,
    currency: 'USD',
    categorySlug: 'jewelry-accessories',
    shopId: 1,
    images: ['https://i.pinimg.com/736x/ab/8b/c5/ab8bc5edae05de050fccb14a28773a56.jpg'],
    badges: ['Bestseller', 'Handmade'],
    rating: 4.9,
    ratingCount: 287,
    inStock: true,
    tags: ['earrings', 'gold', 'minimal']
  },
  {
    id: 102,
    slug: 'linen-wrap-dress-sand',
    name: 'Linen Wrap Dress in Sand',
    description: 'Soft washed linen wrap dress with side ties and pockets.',
    price: 89,
    currency: 'USD',
    categorySlug: 'clothing-shoes',
    shopId: 2,
    images: ['https://i.pinimg.com/1200x/4f/a0/c3/4fa0c395efd7db0a3eac7792d348e002.jpg'],
    badges: ['Sustainable', 'Made to order'],
    rating: 4.8,
    ratingCount: 152,
    inStock: true,
    tags: ['dress', 'linen', 'wrap']
  },
  {
    id: 103,
    slug: 'hand-thrown-stoneware-mug',
    name: 'Hand-thrown Stoneware Mug',
    description: 'Wheel-thrown ceramic mug with satin glaze for your morning brew.',
    price: 32,
    currency: 'USD',
    categorySlug: 'home-living',
    shopId: 2,
    images: ['https://i.pinimg.com/736x/6c/81/98/6c8198068efe0de1f544073ddae9d4c0.jpg'],
    badges: ['Small batch'],
    rating: 4.7,
    ratingCount: 94,
    inStock: true,
    tags: ['mug', 'ceramic', 'kitchen']
  },
  {
    id: 104,
    slug: 'signed-riso-print-city-lights',
    name: 'Signed Riso Print "City Lights"',
    description: 'Two-color risograph print, signed and numbered by the artist.',
    price: 54,
    currency: 'USD',
    categorySlug: 'art-collectibles',
    shopId: 1,
    images: ['https://i.pinimg.com/736x/b2/af/38/b2af38ad699e5429c5a3058e16157d1a.jpg'],
    badges: ['Limited run'],
    rating: 4.9,
    ratingCount: 41,
    inStock: true,
    tags: ['print', 'art', 'illustration']
  },
  {
    id: 105,
    slug: 'boho-macrame-wall-hanging',
    name: 'Boho Macramé Wall Hanging',
    description: 'Handwoven wall hanging made with organic cotton rope.',
    price: 65,
    currency: 'USD',
    categorySlug: 'home-living',
    shopId: 2,
    images: ['https://i.pinimg.com/736x/6b/1a/6a/6b1a6a4e450d3f5a3c13e5c2c2ce7dfb.jpg'],
    badges: ['Handmade'],
    rating: 4.8,
    ratingCount: 80,
    inStock: true,
    tags: ['decor', 'wall', 'boho']
  },
  {
    id: 106,
    slug: 'vintage-leather-boots',
    name: 'Vintage Leather Boots',
    description: 'Classic brown leather boots with worn-in patina and stitched sole.',
    price: 120,
    currency: 'USD',
    categorySlug: 'clothing-shoes',
    shopId: 1,
    images: ['https://i.pinimg.com/736x/87/6d/04/876d041c1c48ec83e0ee0c71c54747f4.jpg'],
    badges: ['Vintage'],
    rating: 4.7,
    ratingCount: 64,
    inStock: true,
    tags: ['boots', 'leather', 'vintage']
  },
  {
    id: 107,
    slug: 'personalized-name-necklace',
    name: 'Personalized Name Necklace',
    description: 'Custom gold-plated name pendant on a dainty chain.',
    price: 58,
    currency: 'USD',
    categorySlug: 'jewelry-accessories',
    shopId: 1,
    images: ['https://i.pinimg.com/736x/59/92/fb/5992fb24ff8b18a2ee330dc19f8f4053.jpg'],
    badges: ['Customizable'],
    rating: 4.9,
    ratingCount: 215,
    inStock: true,
    tags: ['necklace', 'custom', 'gold']
  },
  {
    id: 108,
    slug: 'handmade-ceramic-vase',
    name: 'Handmade Ceramic Vase',
    description: 'Minimal matte white vase crafted from natural clay.',
    price: 48,
    currency: 'USD',
    categorySlug: 'home-living',
    shopId: 2,
    images: ['https://i.pinimg.com/736x/ba/da/4b/bada4b7a29a16e81289eafecf9f38a14.jpg'],
    badges: ['Handcrafted'],
    rating: 4.8,
    ratingCount: 112,
    inStock: true,
    tags: ['vase', 'ceramic', 'decor']
  },
  {
    id: 109,
    slug: 'abstract-watercolor-print',
    name: 'Abstract Watercolor Print',
    description: 'Soft-toned watercolor art print on premium textured paper.',
    price: 39,
    currency: 'USD',
    categorySlug: 'art-collectibles',
    shopId: 1,
    images: ['https://i.pinimg.com/736x/35/73/70/35737029d58a6d9c089d3eab3a1a6239.jpg'],
    badges: ['Trending'],
    rating: 4.7,
    ratingCount: 56,
    inStock: true,
    tags: ['art', 'print', 'watercolor']
  },
  {
    id: 110,
    slug: 'linen-table-runner',
    name: 'Linen Table Runner',
    description: 'Rustic washed linen runner for cozy home gatherings.',
    price: 42,
    currency: 'USD',
    categorySlug: 'home-living',
    shopId: 2,
    images: ['https://i.pinimg.com/736x/b4/b3/49/b4b3493a915f26c139c82dbe7f87b5f2.jpg'],
    badges: ['Eco-friendly'],
    rating: 4.6,
    ratingCount: 33,
    inStock: true,
    tags: ['table', 'linen', 'decor']
  },
  {
    id: 111,
    slug: 'wedding-calligraphy-set',
    name: 'Wedding Calligraphy Invitation Set',
    description: 'Elegant invitation suite printed on cotton paper with ribbon ties.',
    price: 120,
    currency: 'USD',
    categorySlug: 'weddings-party',
    shopId: 1,
    images: ['https://i.pinimg.com/736x/fc/32/90/fc3290a76409b802c372bb56416a5c67.jpg'],
    badges: ['Handmade'],
    rating: 4.9,
    ratingCount: 87,
    inStock: true,
    tags: ['wedding', 'stationery', 'invitation']
  },
  {
    id: 112,
    slug: 'hand-knit-baby-blanket',
    name: 'Hand Knit Baby Blanket',
    description: 'Soft cotton baby blanket in neutral cream tones.',
    price: 68,
    currency: 'USD',
    categorySlug: 'toys-entertainment',
    shopId: 2,
    images: ['https://i.pinimg.com/736x/64/2a/2c/642a2c42de9ec0cb9d1f747458b9df52.jpg'],
    badges: ['Gift favorite'],
    rating: 4.8,
    ratingCount: 45,
    inStock: true,
    tags: ['baby', 'blanket', 'handmade']
  }
]

export const getProductsByCategory = (slug: string) =>
  products.filter(p => p.categorySlug === slug)

export const getProductsByShop = (shopId: number) =>
  products.filter(p => p.shopId === shopId)

export const searchProducts = (term: string) => {
  const q = term.toLowerCase()
  return products.filter(
    p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
  )
}
