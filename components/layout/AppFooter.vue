<template>
  <footer class="border-t border-slate-100 bg-white mt-8 w-full">
    <div
      class="w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-500"
    >
      <!-- Left: Description -->
      <p class="text-center sm:text-left leading-relaxed">
        Built with <span class="font-medium">Nuxt 4</span>, <span class="font-medium">Vue 3</span>, <span class="font-medium">Tailwind CSS</span>, <span class="font-medium">Pinia</span> and <span class="font-medium">Motion</span>. Mock <span class="font-semibold">Etsy-style marketplace</span> UI.
      </p>

      <!-- Right: Status -->
      <p class="flex items-center justify-center sm:justify-end gap-2 text-center mt-2 sm:mt-0">
        <span class="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Local, mock-only environment</span>
      </p>
    </div>
  </footer>
</template>

<style scoped>
/* Subtle hover for key tech names */
footer p span {
  transition: color 0.2s ease-in-out;
}

footer p span:hover {
  color: #10b981; /* emerald-500 */
}
</style>
