<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports'
import { useMotion } from '@vueuse/motion'

// Shared blog data
const blogs = ref([
  {
    id: 1,
    title: 'Top 10 Tips for E-commerce Success',
    excerpt:
      'Discover essential strategies to boost your online store sales and conversions.',
    content:
      'Full blog content for E-commerce Success... (you can write real content here)',
    image:
      'https://i.pinimg.com/736x/48/da/75/48da757b2582d5790665100aeae4cd4f.jpg',
    slug: 'top-10-tips-for-ecommerce-success'
  },
  {
    id: 2,
    title: 'UI/UX Design Trends 2025',
    excerpt:
      'Stay ahead with the latest UI/UX design patterns and trends for modern apps.',
    content: 'Full blog content for UI/UX Design Trends...',
    image:
      'https://i.pinimg.com/1200x/e0/18/36/e018365c030b36ef5487d35b6aa22116.jpg',
    slug: 'ui-ux-design-trends-2025'
  },
  {
    id: 3,
    title: 'SEO Strategies for Online Shops',
    excerpt:
      'Learn how to optimize your e-commerce site for search engines and grow traffic.',
    content: 'Full content for SEO strategies...',
    image:
      'https://i.pinimg.com/1200x/c2/27/78/c22778be59539522822c1a3036e86f93.jpg',
    slug: 'seo-strategies-for-online-shops'
  },
  {
    id: 4,
    title: 'How to Improve Customer Retention',
    excerpt:
      'Practical tips to increase customer loyalty and repeat purchases.',
    content: 'Full content for customer retention...',
    image:
      'https://i.pinimg.com/1200x/51/79/70/51797004ba244bb9aa5e05c772498ee8.jpg',
    slug: 'how-to-improve-customer-retention'
  }
])

const router = useRouter()

const goToBlog = (slug: string) => {
  router.push(`/blogs/${slug}`)
}
</script>

<template>
  <section class="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
    <h2 class="text-3xl font-bold mb-6">Latest Blog Posts</h2>

    <div class="flex gap-6 overflow-x-auto pb-4">
      <motion-div
        v-for="blog in blogs"
        :key="blog.id"
        @click="goToBlog(blog.slug)"
        class="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0 cursor-pointer hover:shadow-xl transition"
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 0.4 } }"
        :hovered="{ scale: 1.03 }"
      >
        <img :src="blog.image" :alt="blog.title" class="w-full h-44 object-cover" />
        <div class="p-4 flex flex-col justify-between h-full">
          <h3 class="font-semibold text-lg mb-2 line-clamp-2">
            {{ blog.title }}
          </h3>
          <p class="text-sm text-slate-600 line-clamp-3 mb-4">
            {{ blog.excerpt }}
          </p>
          <p class="text-emerald-600 font-semibold mt-auto">Read More →</p>
        </div>
      </motion-div>
    </div>
  </section>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
