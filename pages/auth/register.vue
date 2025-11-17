<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#imports'
import { useUserStore } from '~/stores/user'
import BaseButton from '~/components/ui/BaseButton.vue'

const userStore = useUserStore()
const router = useRouter()

// Form state
const name = ref('')
const email = ref('')
const password = ref('')
const gender = ref('')
const dob = ref('')
const phone = ref('')
const shopName = ref('')
const role = ref('buyer')

const handleRegister = () => {
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
    gender: gender.value,
    dob: dob.value,
    phone: phone.value,
    shopName: shopName.value,
    role: role.value,
  }

  // Save mock data to Pinia (local)
  userStore.register(userData.name, userData.email, userData.password)
  console.log('Mock user registered:', userData)

  router.push('/dashboard')
}
</script>

<template>
  <div
    class="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-10"
  >
    <div
      class="w-full sm:w-[420px] bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-soft"
    >
      <h1 class="text-lg font-semibold tracking-tight mb-1">
        Create an account
      </h1>
      <p class="text-sm text-slate-600 mb-4">
        This registration will only update local Pinia state. It’s safe to
        experiment.
      </p>

      <form class="space-y-3" @submit.prevent="handleRegister">
        <!-- Name -->
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">Full Name</label>
          <input
            v-model="name"
            type="text"
            required
            placeholder="John Doe"
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          />
        </div>

        <!-- Gender -->
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">Gender</label>
          <select
            v-model="gender"
            required
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          >
            <option disabled value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <!-- DOB -->
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">Date of Birth</label>
          <input
            v-model="dob"
            type="date"
            required
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">Phone Number</label>
          <input
            v-model="phone"
            type="tel"
            maxlength="10"
            placeholder="9876543210"
            required
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">Email Address</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          />
        </div>

        

        <!-- Shop Name -->
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">Shop Name</label>
          <input
            v-model="shopName"
            type="text"
            placeholder="Optional (for sellers)"
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          />
        </div>

        <!-- Role -->
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">Account Type</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 text-sm text-slate-700">
              <input type="radio" v-model="role" value="buyer" class="text-slate-900" />
              Buyer
            </label>
            <label class="flex items-center gap-2 text-sm text-slate-700">
              <input type="radio" v-model="role" value="seller" class="text-slate-900" />
              Seller
            </label>
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">Password</label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          />
        </div>

        <BaseButton type="submit" class="w-full mt-2">Create Account</BaseButton>
      </form>

      <p class="mt-3 text-xs text-slate-600 text-center">
        Already have an account?
        <NuxtLink
          to="/auth/login"
          class="text-slate-900 font-medium hover:underline"
        >
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.shadow-soft {
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
}
</style>
