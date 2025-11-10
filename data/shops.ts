export interface Shop {
  id: number
  slug: string
  name: string
  owner: string
  rating: number
  sales: number
  avatar: string
  banner: string
  tagline: string
}

export const shops: Shop[] = [
  {
    id: 1,
    slug: 'aurora-jewelry-studio',
    name: 'Aurora Jewelry Studio',
    owner: 'Mira Kapoor',
    rating: 4.9,
    sales: 1823,
    avatar: 'https://i.pinimg.com/736x/1f/3c/5c/1f3c5cf22e5e7b1c2fde7617d275ff5c.jpg',
    banner: 'https://i.pinimg.com/736x/1f/3c/5c/1f3c5cf22e5e7b1c2fde7617d275ff5c.jpg',
    tagline: 'Minimal jewelry with subtle celestial details.'
  },
  {
    id: 2,
    slug: 'linen-and-loft',
    name: 'Linen & Loft',
    owner: 'Riya Sharma',
    rating: 4.8,
    sales: 1432,
    avatar: 'https://i.pinimg.com/736x/23/36/f2/2336f2c3c18748fc4a6daff3a717cce7.jpg',
    banner: 'https://i.pinimg.com/736x/23/36/f2/2336f2c3c18748fc4a6daff3a717cce7.jpg',
    tagline: 'Soft linens and essentials for everyday living.'
  },
  {
    id: 3,
    slug: 'terra-home-wares',
    name: 'Terra Home Wares',
    owner: 'Kabir Mehta',
    rating: 4.7,
    sales: 1204,
    avatar: 'https://i.pinimg.com/736x/6c/81/98/6c8198068efe0de1f544073ddae9d4c0.jpg',
    banner: 'https://i.pinimg.com/1200x/3e/ae/8b/3eae8b2dd8464cdbe933d9357a388fa4.jpg',
    tagline: 'Earthy ceramics and modern decor for grounded living.'
  },
  {
    id: 4,
    slug: 'studio-nimbus',
    name: 'Studio Nimbus',
    owner: 'Aria D’Souza',
    rating: 4.9,
    sales: 1876,
    avatar: 'https://i.pinimg.com/736x/b2/af/38/b2af38ad699e5429c5a3058e16157d1a.jpg',
    banner: 'https://i.pinimg.com/1200x/f7/ea/d0/f7ead02fe6955e841c431fba560bf439.jpg',
    tagline: 'Limited-edition art prints and creative design pieces.'
  },
  {
    id: 5,
    slug: 'woven-roots',
    name: 'Woven Roots',
    owner: 'Ishaan Verma',
    rating: 4.8,
    sales: 950,
    avatar: 'https://i.pinimg.com/736x/3c/5b/2b/3c5b2b2236b7615a6b0194423b6c6a62.jpg',
    banner: 'https://i.pinimg.com/1200x/5f/f3/0d/5ff30d96c08c8766d833b2c89198b5f9.jpg',
    tagline: 'Handwoven textiles and natural fibers with modern aesthetics.'
  },
  {
    id: 6,
    slug: 'craftora',
    name: 'Craftora',
    owner: 'Tanya Sen',
    rating: 4.6,
    sales: 780,
    avatar: 'https://i.pinimg.com/736x/6f/84/10/6f8410d96cb2ad2c1e88a742a14ff4bb.jpg',
    banner: 'https://i.pinimg.com/1200x/61/8e/86/618e86914fcb22d4ef7199e0874ca8b6.jpg',
    tagline: 'Modern craft meets timeless techniques.'
  },
  {
    id: 7,
    slug: 'atelier-mist',
    name: 'Atelier Mist',
    owner: 'Rehaan Ali',
    rating: 4.9,
    sales: 2020,
    avatar: 'https://i.pinimg.com/736x/f0/b3/a8/f0b3a8cecc2a48286d9f2a47b3e981c5.jpg',
    banner: 'https://i.pinimg.com/1200x/0b/bf/cd/0bbfcdf036a7787b551ae85f31a35606.jpg',
    tagline: 'Artful fashion inspired by nature and form.'
  },
  {
    id: 8,
    slug: 'paperleaf-prints',
    name: 'Paperleaf Prints',
    owner: 'Diya Kapoor',
    rating: 4.8,
    sales: 1345,
    avatar: 'https://i.pinimg.com/736x/a1/f8/2c/a1f82c2832bcefdac93474b1e9178e24.jpg',
    banner: 'https://i.pinimg.com/1200x/73/3a/7e/733a7e728cb09dbf9ab782d1b932d9b1.jpg',
    tagline: 'Original illustrations and botanical fine art prints.'
  }
]
