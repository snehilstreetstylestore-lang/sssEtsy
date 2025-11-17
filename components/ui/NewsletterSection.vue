<template>
  <section
    class="bg-gradient-to-r from-amber-50 to-rose-50 border border-slate-100 rounded-2xl shadow-sm px-6 sm:px-10 py-10 text-center space-y-6"
  >
    <div>
      <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
        Subscribe to our Newsletter
      </h2>
      <p class="text-slate-600 text-sm sm:text-base mt-2">
        Get updates on new arrivals, exclusive deals, and creative inspiration.
      </p>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
    >
      <input
        v-model="email"
        type="email"
        required
        placeholder="Enter your email"
        class="w-full sm:flex-1 px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      <button
        type="submit"
        class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-200"
      >
        Subscribe
      </button>
    </form>

    <p v-if="successMessage" class="text-emerald-600 text-sm mt-2 animate-fadeIn">
      {{ successMessage }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const successMessage = ref('')

const handleSubmit = () => {
  if (email.value.trim()) {
    successMessage.value = '🎉 Subscription successful! Thank you for joining.'
    email.value = ''
    setTimeout(() => (successMessage.value = ''), 2500)
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
