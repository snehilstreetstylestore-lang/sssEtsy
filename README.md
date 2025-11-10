# Etsy Clone UI – Nuxt 4

Front-end only Etsy style marketplace UI built with:

- Nuxt 4 (latest)
- Vue 3 with `<script setup>`
- Tailwind CSS
- Pinia for global state (cart, wishlist, user)
- @vueuse/motion for animations
- lucide-vue-next for icons
- Mock JSON data only – no API calls

## Getting started

```bash
npm install
npm run dev
```

Then open the local development URL printed in your terminal.

## Features

- Home, Category, Product, Shop, Cart, Wishlist, Search and Seller Dashboard pages
- Reusable components: Navbar, Footer, ProductCard, CategoryCard, ProductGrid, FiltersSidebar, Pagination, Modal, Buttons and Loader
- Local cart, wishlist and user state persisted to `localStorage`
- Smooth hover and enter animations via `@vueuse/motion`
- Mobile-first responsive layout with Tailwind
