<template>
  <section
    class="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] space-y-10 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
  >
    <!-- ============ SHOP HEADER ============ -->
    <div class="flex items-center gap-6">
      <img
        :src="shop.avatar"
        class="w-20 h-20 rounded-full border-2 border-slate-200 object-cover shadow-md"
      />

      <div class="flex flex-col gap-1">
        <h2 class="text-xl font-bold text-slate-900 tracking-tight">
          {{ shop.shopName }}
        </h2>

        <p class="text-sm text-slate-600">
          Owned by
          <span class="font-semibold text-slate-800">{{ shop.owner }}</span>
        </p>

        <p class="text-sm text-slate-500 flex items-center gap-1">
          📍 <span class="font-medium">{{ shop.location }}</span>
        </p>

        <!-- Rating -->
        <div class="flex items-center gap-1 text-amber-500 text-sm mt-1">
          <span v-for="i in 5" :key="i">
            <span v-if="i <= Math.round(shop.rating)">★</span>
            <span v-else class="text-slate-300">★</span>
          </span>
          <span class="text-slate-700 ml-1 font-medium">
            {{ shop.rating }} ({{ shop.reviewCount }} reviews)
          </span>
        </div>

        <!-- Badges -->
        <div class="flex flex-wrap items-center gap-2 mt-2">
          <span
            class="px-2 py-0.5 text-[11px] rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium"
          >
            ✔ Top Rated Seller
          </span>
          <span
            class="px-2 py-0.5 text-[11px] rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium"
          >
            ⚡ Fast Replies
          </span>
          <span
            class="px-2 py-0.5 text-[11px] rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-medium"
          >
            ⭐ Trusted by 900+ buyers
          </span>
        </div>
      </div>
    </div>

    <div class="h-[1px] bg-slate-100"></div>

    <!-- ============ SHOP STATS ============ -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
      >
        <p
          class="text-2xl font-bold text-center"
          :class="stat.color"
        >
          {{ stat.value }}
        </p>
        <p class="text-xs text-slate-500 text-center">{{ stat.label }}</p>
      </div>
    </div>

    <div class="h-[1px] bg-slate-100"></div>

    <!-- ============ SHOP STORY ============ -->
    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-slate-800">About This Shop</h3>

      <p class="text-sm text-slate-600 leading-relaxed">
        {{ shop.description || "We create handmade, premium quality products with love. Each item is crafted with attention to detail and a passion for artistry." }}
      </p>

      <div class="flex flex-wrap gap-3 mt-2">
        <div
          class="px-3 py-1.5 border rounded-lg text-xs font-medium bg-slate-50 text-slate-700"
        >
          🌿 Handmade items
        </div>
        <div
          class="px-3 py-1.5 border rounded-lg text-xs font-medium bg-slate-50 text-slate-700"
        >
          🎁 Gift wrapping available
        </div>
        <div
          class="px-3 py-1.5 border rounded-lg text-xs font-medium bg-slate-50 text-slate-700"
        >
          📦 Worldwide shipping
        </div>
        <div
          class="px-3 py-1.5 border rounded-lg text-xs font-medium bg-slate-50 text-slate-700"
        >
          💬 Fast customer support
        </div>
      </div>
    </div>

    <div class="h-[1px] bg-slate-100"></div>

    <!-- ============ MESSAGE SELLER ============ -->
    <div class="space-y-5">
      <h3 class="text-lg font-semibold text-slate-800">
        Message {{ shop.owner }}
      </h3>

      <p class="text-sm text-slate-600 leading-relaxed">
        Have a question? The seller typically replies within a few hours.  
        Get help with sizing, personalization, custom orders, or delivery details.
      </p>

      <!-- Suggestions -->
      <div class="space-y-2">
        <p class="text-xs text-slate-500 font-medium">Quick questions:</p>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="q in suggestedQuestions"
            :key="q"
            class="px-3 py-1.5 rounded-full text-xs bg-slate-100 border border-slate-200 hover:bg-slate-200 transition"
            @click="emit('open-chat', q)"
          >
            {{ q }}
          </button>
        </div>
      </div>

      <button
        @click="openChat"
        class="w-full bg-amber-500 text-white rounded-xl py-3 font-semibold shadow-lg hover:bg-amber-600 transition-all duration-200 hover:shadow-xl"
      >
        💬 Message Seller
      </button>
    </div>

    <div class="h-[1px] bg-slate-200"></div>

    <!-- ============ SHOP HIGHLIGHTS ============ -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-slate-800">Shop Highlights</h3>

      <div class="space-y-3 text-[14px] text-slate-700">
        <div class="flex items-center gap-3">
          <span class="text-emerald-600 text-xl">📦</span>
          <p><strong>Smooth dispatch:</strong> Always delivers on time with tracking.</p>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-blue-600 text-xl">⚡</span>
          <p><strong>Fast replies:</strong> Usually responds within hours.</p>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-amber-500 text-xl">⭐</span>
          <p><strong>Rave reviews:</strong> Over 4.8+ average rating.</p>
        </div>

        <div class="flex items-center gap-3">
          <span class="text-purple-600 text-xl">💯</span>
          <p><strong>Buyer protection:</strong> Full refund if item doesn’t arrive.</p>
        </div>
      </div>
    </div>

    <div class="h-[1px] bg-slate-100"></div>

    <!-- ============ REVIEWS SECTION ============ -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base font-semibold">Recent Reviews ({{ shop.reviewCount }})</h3>
        <button class="text-xs text-blue-600 hover:underline">View all</button>
      </div>

      <div
        v-for="r in reviews"
        :key="r.id"
        class="space-y-2 border border-slate-100 bg-slate-50 rounded-xl p-4 mb-3 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-slate-800">{{ r.user }}</p>
          <p class="text-amber-500 text-sm font-medium">★ {{ r.rating }}</p>
        </div>

        <p class="text-sm text-slate-700 leading-relaxed">{{ r.text }}</p>
        <p class="text-xs text-slate-500">{{ r.date }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps({
  shop: Object,
  reviews: Array,
});

const suggestedQuestions = [
  "Can you make a custom version?",
  "How long does delivery take?",
  "Do you offer gift wrapping?",
  "Can you personalise this item?",
  "Is this available in different colors?",
  "Can I get bulk pricing?",
];

const stats = [
  { label: "Rating", value: "⭐ 4.8", color: "text-emerald-600" },
  { label: "Reviews", value: "1200+", color: "text-blue-600" },
  { label: "Sales", value: "6,500+", color: "text-amber-600" },
  { label: "Years Active", value: "5 yrs", color: "text-purple-600" },
];

const emit = defineEmits(["open-chat"]);
const openChat = () => emit("open-chat");
</script>

<style scoped></style>
