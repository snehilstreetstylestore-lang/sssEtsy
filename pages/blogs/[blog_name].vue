<script setup lang="ts">
import { useRoute, useRouter } from '#imports'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const blogSlug = route.params.blog_name as string

// SAME blog data as homepage
const blogs = ref([
  {
    id: 1,
    title: 'Top 10 Tips for E-commerce Success',
    content:
      'Full blog content for E-commerce Success... (replace with real text)',
    image:
      'https://i.pinimg.com/736x/48/da/75/48da757b2582d5790665100aeae4cd4f.jpg',
    slug: 'top-10-tips-for-ecommerce-success'
  },
  {
    id: 2,
    title: 'UI/UX Design Trends 2025',
    content: 'Full blog content for UI/UX Design Trends...',
    image:
      'https://i.pinimg.com/1200x/e0/18/36/e018365c030b36ef5487d35b6aa22116.jpg',
    slug: 'ui-ux-design-trends-2025'
  },
  {
    id: 3,
    title: 'SEO Strategies for Online Shops',
    content: 'Full content for SEO strategies...',
    image:
      'https://i.pinimg.com/1200x/c2/27/78/c22778be59539522822c1a3036e86f93.jpg',
    slug: 'seo-strategies-for-online-shops'
  },
  {
    id: 4,
    title: 'How to Improve Customer Retention',
    content: 'Full content for customer retention...',
    image:
      'https://i.pinimg.com/1200x/51/79/70/51797004ba244bb9aa5e05c772498ee8.jpg',
    slug: 'how-to-improve-customer-retention'
  }
])

// Find blog by slug
const blog = computed(() => blogs.value.find(b => b.slug === blogSlug))

// If not found → go to homepage
if (!blog.value) {
  router.push('/')
}
</script>

<template>
  <div
    v-if="blog"
    class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
  >
    <h1 class="text-4xl font-bold mb-6">{{ blog.title }}</h1>

    <img
      :src="blog.image"
      :alt="blog.title"
      class="w-full h-auto rounded-lg mb-6 shadow-md"
    />

    <p
      class="text-lg text-slate-700 leading-relaxed whitespace-pre-line"
    >
      {{ blog.content }}
    </p>

    <button
      @click="router.back()"
      class="mt-8 px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 transition"
    >
      ← Back
    </button>
  </div>
</template>
