export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export const users: User[] = [
  {
    id: 1,
    name: 'Demo Seller',
    email: 'demo.seller@example.com',
    avatar: 'https://i.pinimg.com/736x/1f/3c/5c/1f3c5cf22e5e7b1c2fde7617d275ff5c.jpg'
  },
  {
    id: 2,
    name: 'Mira Kapoor',
    email: 'mira.kapoor@example.com',
    avatar: 'https://i.pinimg.com/736x/f3/5c/bb/f35cbb51b183fe94a2cf57b6f6921a91.jpg'
  },
  {
    id: 3,
    name: 'Riya Sharma',
    email: 'riya.sharma@example.com',
    avatar: 'https://i.pinimg.com/736x/7b/da/48/7bda4863a67d28597a539e946b8d0028.jpg'
  },
  {
    id: 4,
    name: 'Kabir Mehta',
    email: 'kabir.mehta@example.com',
    avatar: 'https://i.pinimg.com/736x/b5/1c/31/b51c31cbda607e5737e1e5fffa8e4085.jpg'
  },
  {
    id: 5,
    name: 'Aria D’Souza',
    email: 'aria.dsouza@example.com',
    avatar: 'https://i.pinimg.com/736x/4a/30/f0/4a30f0d5eae4b90873144d23221b8a9b.jpg'
  },
  {
    id: 6,
    name: 'Ishaan Verma',
    email: 'ishaan.verma@example.com',
    avatar: 'https://i.pinimg.com/736x/33/8a/a9/338aa94799f067e14b36c26e5e1cfab3.jpg'
  },
  {
    id: 7,
    name: 'Tanya Sen',
    email: 'tanya.sen@example.com',
    avatar: 'https://i.pinimg.com/736x/0a/a1/17/0aa117cc90a9efc995c2cc982fae3244.jpg'
  },
  {
    id: 8,
    name: 'Rehaan Ali',
    email: 'rehaan.ali@example.com',
    avatar: 'https://i.pinimg.com/736x/2f/45/76/2f45761a8f8701b5e59bcd54ff97c5f1.jpg'
  },
  {
    id: 9,
    name: 'Diya Kapoor',
    email: 'diya.kapoor@example.com',
    avatar: 'https://i.pinimg.com/736x/aa/0b/6f/aa0b6f7131d3f1e27f0cb789870b5f8a.jpg'
  },
  {
    id: 10,
    name: 'Liam Carter',
    email: 'liam.carter@example.com',
    avatar: 'https://i.pinimg.com/736x/57/f7/11/57f711fb9de1e73d620c9d2e0d8a6b12.jpg'
  },
  {
    id: 11,
    name: 'Aanya Patel',
    email: 'aanya.patel@example.com',
    avatar: 'https://i.pinimg.com/736x/d2/58/93/d2589384b2cfa734b4e4ac7d9d7c9b42.jpg'
  },
  {
    id: 12,
    name: 'Noah Kim',
    email: 'noah.kim@example.com',
    avatar: 'https://i.pinimg.com/736x/91/d9/7b/91d97b5b6c56e33e18f1debb324a39c1.jpg'
  }
]

// Default user (for fallback)
export const mockUser: User = users[0]
