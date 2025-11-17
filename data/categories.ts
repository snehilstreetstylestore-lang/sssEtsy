export interface Category {
  id: number
  slug: string
  name: string
  description: string
  image: string
}

export const categories: Category[] = [
  {
    id: 1,
    slug: 'jewelry-accessories',
    name: 'Jewelry & Accessories',
    description:
      'Handcrafted earrings, necklaces, and unique custom-made adornments.',
    image:
      'https://i.pinimg.com/1200x/61/8e/86/618e86914fcb22d4ef7199e0874ca8b6.jpg'
  },
  {
    id: 2,
    slug: 'clothing-shoes',
    name: 'Clothing & Shoes',
    description:
      'Boutique fashion, independent labels, and one-of-a-kind handmade garments.',
    image:
      'https://i.pinimg.com/736x/0b/bf/cd/0bbfcdf036a7787b551ae85f31a35606.jpg'
  },
  {
    id: 3,
    slug: 'home-living',
    name: 'Home & Living',
    description:
      'Ceramics, candles, textiles, and artful home decor for curated living.',
    image:
      'https://i.pinimg.com/1200x/3e/ae/8b/3eae8b2dd8464cdbe933d9357a388fa4.jpg'
  },
  {
    id: 4,
    slug: 'art-collectibles',
    name: 'Art & Collectibles',
    description:
      'Original paintings, prints, and handmade sculptures by small creators.',
    image:
      'https://i.pinimg.com/1200x/f7/ea/d0/f7ead02fe6955e841c431fba560bf439.jpg'
  },

  /* ⭐ Your updated categories below ⭐ */

  {
    id: 5,
    slug: 'weddings-party',
    name: 'Weddings & Party',
    description:
      'Invitations, decor, favors, and attire for weddings and celebrations.',
    image:
      'https://i.pinimg.com/1200x/bb/a7/88/bba788ae746ae2ea8b62f212681ca21d.jpg' // NEW
  },
  {
    id: 6,
    slug: 'toys-entertainment',
    name: 'Toys & Entertainment',
    description:
      'Whimsical plushies, handmade toys, and creative playtime pieces.',
    image:
      'https://i.pinimg.com/736x/38/a9/9e/38a99ef27007cfae409d65c0b935c9d8.jpg' // NEW
  },
  {
    id: 7,
    slug: 'craft-supplies-tools',
    name: 'Craft Supplies & Tools',
    description:
      'Everything you need for DIY projects — yarns, beads, patterns, and tools.',
    image:
      'https://i.pinimg.com/1200x/ef/b5/db/efb5dbe54b686f3a87342f04eed1c3cb.jpg' // NEW
  },
  {
    id: 8,
    slug: 'vintage-finds',
    name: 'Vintage Finds',
    description:
      'Curated antiques, retro treasures, and timeless secondhand pieces.',
    image:
      'https://i.pinimg.com/736x/57/de/2d/57de2d3acd67e0d1524a80bcd59225d6.jpg' // NEW
  },
  {
    id: 9,
    slug: 'beauty-care',
    name: 'Beauty & Self-Care',
    description:
      'Natural skincare, handmade soaps, and wellness products crafted with love.',
    image:
      'https://i.pinimg.com/736x/47/cf/6b/47cf6b8b8809d8ca7659b8a8421306c9.jpg' // NEW
  },
  {
    id: 10,
    slug: 'pets-supplies',
    name: 'Pets & Supplies',
    description:
      'Cozy beds, accessories, and playful treats for your furry friends.',
    image:
      'https://i.pinimg.com/736x/6a/89/48/6a8948b559735c80860cdf2169efc874.jpg' // NEW
  }
]
