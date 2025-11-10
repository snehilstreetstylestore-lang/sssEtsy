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
  {
    id: 5,
    slug: 'weddings-party',
    name: 'Weddings & Party',
    description:
      'Invitations, decor, favors, and attire for weddings and celebrations.',
    image:
      'https://i.pinimg.com/1200x/b7/2d/49/b72d497fddc87923d8b52e2c51af7b87.jpg'
  },
  {
    id: 6,
    slug: 'toys-entertainment',
    name: 'Toys & Entertainment',
    description:
      'Whimsical plushies, handmade toys, and creative playtime pieces.',
    image:
      'https://i.pinimg.com/1200x/9c/5b/8b/9c5b8b2b8c2dc9290e8d83f9d7a8a7ad.jpg'
  },
  {
    id: 7,
    slug: 'craft-supplies-tools',
    name: 'Craft Supplies & Tools',
    description:
      'Everything you need for DIY projects — yarns, beads, patterns, and tools.',
    image:
      'https://i.pinimg.com/1200x/5e/26/14/5e2614ff4a7480a0d06c3e43b66b50d1.jpg'
  },
  {
    id: 8,
    slug: 'vintage-finds',
    name: 'Vintage Finds',
    description:
      'Curated antiques, retro treasures, and timeless secondhand pieces.',
    image:
      'https://i.pinimg.com/1200x/4b/5c/2d/4b5c2dc3c693db1cb92357a5c45cfbf3.jpg'
  },
  {
    id: 9,
    slug: 'beauty-care',
    name: 'Beauty & Self-Care',
    description:
      'Natural skincare, handmade soaps, and wellness products crafted with love.',
    image:
      'https://i.pinimg.com/1200x/79/65/12/796512b6f12646e71b8b72850e0a0e9c.jpg'
  },
  {
    id: 10,
    slug: 'pets-supplies',
    name: 'Pets & Supplies',
    description:
      'Cozy beds, accessories, and playful treats for your furry friends.',
    image:
      'https://i.pinimg.com/1200x/54/56/8c/54568c4420f6ff05f84495d1f0f7b8e3.jpg'
  }
]
