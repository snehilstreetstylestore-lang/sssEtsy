<template>
  <section
    class="relative w-full min-h-[60vh] flex flex-col items-center justify-center bg-center bg-cover overflow-hidden"
    :style="{ backgroundImage: `url('${heroImage}')` }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8">
      <h1 class="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
        Discover one-of-a-kind treasures from independent creators
      </h1>

      <p class="text-slate-100 text-sm sm:text-lg md:text-xl mb-6">
        Shop unique, handcrafted, and vintage finds that make every day special.
      </p>

      <div class="flex flex-wrap justify-center gap-3 sm:gap-4">
        <NuxtLink
          to="/search"
          class="px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-emerald-700 transition"
        >
          Start Shopping
        </NuxtLink>

        <NuxtLink
          to="/dashboard"
          class="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/90 text-gray-800 text-sm sm:text-base font-medium rounded-lg hover:bg-white transition"
        >
          Sell on Marketplace
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const heroImage =
  'https://i.etsystatic.com/ij/20a980/7268267186/ij_680x540.7268267186_bhjpeg10.jpg?version=0'
</script>
