<script setup lang="ts">
import {
  Instagram,
  Youtube,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-vue-next";
import { ref } from "vue";

const openSections = ref<{ [key: string]: boolean }>({
  Shop: false,
  Sell: false,
  About: false,
  Help: false,
});

const toggleSection = (section: string) => {
  openSections.value[section] = !openSections.value[section];
};
</script>

<template>
  <footer
    class="relative w-full border-t border-slate-200 bg-gradient-to-b from-white to-slate-50 text-slate-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <!-- 🖥️ Desktop Footer -->
      <div class="hidden md:grid grid-cols-4 gap-10">
        <div>
          <h3 class="font-semibold mb-3 text-slate-800 border-b border-slate-200 pb-1">
            Shop
          </h3>
          <ul class="space-y-1.5 text-sm">
            <li v-for="link in ['Gift cards','Etsy Registry','Sitemap','Etsy blog','Etsy United Kingdom','Etsy Germany','Etsy Canada']" :key="link">
              <a href="#" class="hover:text-amber-600 hover:underline underline-offset-4 transition">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-3 text-slate-800 border-b border-slate-200 pb-1">
            Sell
          </h3>
          <ul class="space-y-1.5 text-sm">
            <li v-for="link in ['Sell on Etsy','Teams','Forums','Affiliates & Creators']" :key="link">
              <a href="#" class="hover:text-amber-600 hover:underline underline-offset-4 transition">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-3 text-slate-800 border-b border-slate-200 pb-1">
            About
          </h3>
          <ul class="space-y-1.5 text-sm">
            <li v-for="link in ['Etsy, Inc.','Policies','Investors','Careers','Press','Impact','Legal imprint']" :key="link">
              <a href="#" class="hover:text-amber-600 hover:underline underline-offset-4 transition">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-3 text-slate-800 border-b border-slate-200 pb-1">
            Help
          </h3>
          <ul class="space-y-1.5 text-sm">
            <li v-for="link in ['Help Centre','Privacy settings']" :key="link">
              <a href="#" class="hover:text-amber-600 hover:underline underline-offset-4 transition">
                {{ link }}
              </a>
            </li>
          </ul>

          <div class="flex gap-4 mt-5">
            <a
              href="#"
              class="p-2 rounded-full bg-slate-100 hover:bg-amber-50 transition group"
              aria-label="Instagram"
            >
              <Instagram
                class="w-5 h-5 text-slate-600 group-hover:text-amber-600 group-hover:scale-110 transition"
              />
            </a>
            <a
              href="#"
              class="p-2 rounded-full bg-slate-100 hover:bg-amber-50 transition group"
              aria-label="YouTube"
            >
              <Youtube
                class="w-5 h-5 text-slate-600 group-hover:text-red-600 group-hover:scale-110 transition"
              />
            </a>
            <a
              href="#"
              class="p-2 rounded-full bg-slate-100 hover:bg-amber-50 transition group"
              aria-label="Globe"
            >
              <Globe
                class="w-5 h-5 text-slate-600 group-hover:text-blue-500 group-hover:scale-110 transition"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- 📱 Mobile Footer -->
      <div class="md:hidden space-y-4">
        <div
          v-for="section in ['Shop','Sell','About','Help']"
          :key="section"
          class="border-b border-slate-200 pb-2"
        >
          <button
            @click="toggleSection(section)"
            class="flex items-center justify-between w-full font-semibold text-left text-base py-2 text-slate-800"
          >
            {{ section }}
            <component
              :is="openSections[section] ? ChevronUp : ChevronDown"
              class="w-5 h-5 text-slate-600 transition-transform duration-200"
              :class="{ 'rotate-180': openSections[section] }"
            />
          </button>

          <transition name="slide-fade">
            <ul
              v-if="openSections[section]"
              class="mt-2 ml-3 text-sm space-y-1 text-slate-600 bg-white rounded-lg shadow-sm p-3"
            >
              <template v-if="section === 'Shop'">
                <li v-for="l in ['Gift cards','Etsy Registry','Sitemap','Etsy blog','Etsy United Kingdom','Etsy Germany','Etsy Canada']" :key="l">{{ l }}</li>
              </template>
              <template v-else-if="section === 'Sell'">
                <li v-for="l in ['Sell on Etsy','Teams','Forums','Affiliates & Creators']" :key="l">{{ l }}</li>
              </template>
              <template v-else-if="section === 'About'">
                <li v-for="l in ['Etsy, Inc.','Policies','Investors','Careers','Press','Impact','Legal imprint']" :key="l">{{ l }}</li>
              </template>
              <template v-else-if="section === 'Help'">
                <li v-for="l in ['Help Centre','Privacy settings']" :key="l">{{ l }}</li>
              </template>
            </ul>
          </transition>
        </div>

        <div class="flex justify-center gap-6 mt-6">
          <Instagram class="w-6 h-6 hover:text-amber-600 transition" />
          <Youtube class="w-6 h-6 hover:text-red-600 transition" />
          <Globe class="w-6 h-6 hover:text-blue-500 transition" />
        </div>
      </div>

      <!-- 🌍 Footer Bottom -->
      <div
        class="mt-10 pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-2"
      >
        <p>Etsy is powered by 100% renewable electricity.</p>

        <div
          class="flex flex-wrap justify-center items-center gap-3 text-slate-600 text-xs"
        >
          <span class="hover:text-amber-600 cursor-pointer">India</span> |
          <span class="hover:text-amber-600 cursor-pointer">English (IN)</span> |
          <span class="hover:text-amber-600 cursor-pointer">₹ (INR)</span>
        </div>

        <p class="text-slate-500 mt-2">
          © 2025 Etsy, Inc. | 
          <a href="#" class="hover:text-amber-600">Terms of Use</a> | 
          <a href="#" class="hover:text-amber-600">Privacy</a> | 
          <a href="#" class="hover:text-amber-600">Interest-based ads</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
