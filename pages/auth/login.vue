<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRouter } from '#imports'
import { useUserStore } from '~/stores/user'
import BaseButton from '~/components/ui/BaseButton.vue'

const router = useRouter()
const userStore = useUserStore()

const step = ref<'mobile' | 'otp'>('mobile')
const mobile = ref('')
const otpDigits = ref<string[]>(Array(6).fill(''))
const generatedOtp = ref('')
const error = ref('')
const isLoading = ref(false)
const inputRefs = ref<(HTMLInputElement | null)[]>([])

const sendOtp = () => {
  error.value = ''
  if (!/^[6-9]\d{9}$/.test(mobile.value)) {
    error.value = 'Please enter a valid 10-digit mobile number.'
    return
  }

  isLoading.value = true
  setTimeout(() => {
    generatedOtp.value = Math.floor(100000 + Math.random() * 900000).toString()
    console.log('Mock OTP:', generatedOtp.value)
    step.value = 'otp'
    isLoading.value = false
    nextTick(() => inputRefs.value[0]?.focus())
  }, 1000)
}

const handleOtpInput = (index: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const val = target.value.replace(/\D/g, '')

  if (val) {
    otpDigits.value[index] = val.slice(-1)
    if (index < 5) nextTick(() => inputRefs.value[index + 1]?.focus())
  } else {
    otpDigits.value[index] = ''
  }
}

const handleBackspace = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    nextTick(() => inputRefs.value[index - 1]?.focus())
  }
}

const verifyOtp = () => {
  const otp = otpDigits.value.join('')
  if (otp === generatedOtp.value) {
    userStore.login(mobile.value, 'mock_otp_login')
    router.push('/dashboard')
  } else {
    error.value = 'Invalid OTP. Please try again.'
  }
}

const resendOtp = () => {
  generatedOtp.value = Math.floor(100000 + Math.random() * 900000).toString()
  console.log('New Mock OTP:', generatedOtp.value)
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-10">
    <div
      class="w-full sm:w-[400px] bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-soft transition-all"
    >
      <h1 class="text-lg font-semibold tracking-tight mb-1">Sign in with Mobile</h1>
      <p class="text-sm text-slate-600 mb-4">
        Enter your mobile number to receive a 6-digit OTP.
      </p>

      <!-- Step 1: Enter Mobile -->
      <form v-if="step === 'mobile'" @submit.prevent="sendOtp" class="space-y-3">
        <div>
          <label class="text-xs font-medium text-slate-700 mb-1 block">Mobile Number</label>
          <input
            v-model="mobile"
            type="tel"
            maxlength="10"
            placeholder="Enter your 10-digit number"
            class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          />
        </div>

        <p v-if="error" class="text-xs text-red-500">{{ error }}</p>

        <BaseButton type="submit" class="w-full mt-2" :disabled="isLoading">
          {{ isLoading ? 'Sending OTP...' : 'Send OTP' }}
        </BaseButton>
      </form>

      <!-- Step 2: Enter OTP -->
      <form v-else @submit.prevent="verifyOtp" class="space-y-4">
        <div class="flex items-center justify-between bg-slate-100 rounded-xl px-3 py-2">
          <div class="text-sm font-medium text-slate-800">+91 {{ mobile }}</div>
          <button
            type="button"
            class="text-xs text-slate-600 hover:text-slate-900 font-medium"
            @click="step = 'mobile'"
          >
            Change
          </button>
        </div>

        <!-- OTP Inputs -->
        <div class="flex justify-between gap-2 mt-3">
          <input
            v-for="(digit, index) in otpDigits"
            :key="index"
            ref="inputRefs"
            v-model="otpDigits[index]"
            type="text"
            maxlength="1"
            inputmode="numeric"
            class="w-12 h-12 text-center text-lg font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900/80 focus:outline-none"
            @input="(e) => handleOtpInput(index, e)"
            @keydown="(e) => handleBackspace(index, e)"
          />
        </div>

        <p v-if="error" class="text-xs text-red-500 text-center mt-2">{{ error }}</p>

        <BaseButton type="submit" class="w-full mt-3">Verify OTP</BaseButton>

        <p class="text-xs text-center text-slate-600 mt-2">
          Didn’t receive OTP?
          <button
            type="button"
            class="font-medium text-slate-900 hover:underline"
            @click="resendOtp"
          >
            Resend
          </button>
        </p>
      </form>

      <!-- Footer -->
      <p class="mt-4 text-xs text-slate-600 text-center">
        New user?
        <NuxtLink to="/auth/register" class="text-slate-900 font-medium hover:underline">
          Create an account
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
