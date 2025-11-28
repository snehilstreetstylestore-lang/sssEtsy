<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()

// Form fields
const firstName = ref("")
const lastName = ref("")
const email = ref("")
const company = ref("")
const phone = ref("")

// Status
const message = ref("")

// Create customer on button click
const createCustomer = async () => {
  message.value = "Creating customer..."
  try {
    await userStore.register({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      company: company.value,
      phone: phone.value,
    })
    message.value = `Customer created successfully! ID: ${userStore.medusaCustomerId}`
  } catch (err: any) {
    console.error(err)
    message.value = "Failed to create customer: " + (err.message || err)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-4">
    <h1 class="text-xl font-semibold">Test Create Medusa Customer</h1>

    <input
      v-model="firstName"
      type="text"
      placeholder="First Name"
      class="input"
    />
    <input
      v-model="lastName"
      type="text"
      placeholder="Last Name"
      class="input"
    />
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="input"
    />
    <input
      v-model="company"
      type="text"
      placeholder="Company (optional)"
      class="input"
    />
    <input
      v-model="phone"
      type="text"
      placeholder="Phone (optional)"
      class="input"
    />

    <button
      class="btn"
      @click="createCustomer"
    >
      Create Customer
    </button>

    <p class="text-sm text-gray-700">{{ message }}</p>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}
.input:focus {
  outline: none;
  border-color: #3b82f6;
}
.btn {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: 0.2s;
}
.btn:hover {
  background-color: #2563eb;
}
</style>
