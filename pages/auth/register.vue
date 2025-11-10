<script setup lang="ts">
import { useRouter } from '#imports'
import { useUserStore } from '~/stores/user'
import BaseButton from '~/components/ui/BaseButton.vue'

const userStore = useUserStore()
const router = useRouter()

const name = ref('New Seller')
const email = ref('new.seller@example.com')
const password = ref('password')

const handleRegister = () => {
  userStore.register(name.value, email.value, password.value)
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-10">
    <div class="w-full sm:w-[400px] bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-soft">
      <h1 class="text-lg font-semibold tracking-tight mb-1">
        Create an account
      </h1>
      <p class="text-sm text-slate-600 mb-4">
        This registration will only update local Pinia state. It is safe to experiment with.
      </p>

      <form class="space-y-3" @submit.prevent="handleRegister">
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">
            Name
          </label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          >
        </div>

        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          >
        </div>

        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          >
        </div>

        <BaseButton type="submit" class="w-full mt-1">
          Create account
        </BaseButton>
      </form>

      <p class="mt-3 text-xs text-slate-600 text-center">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-slate-900 font-medium hover:underline">
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
