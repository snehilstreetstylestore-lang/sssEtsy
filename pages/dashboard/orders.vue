<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

// Mock Orders Data
interface Order {
  id: number
  customer: string
  date: string
  total: string
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'
}

const orders: Order[] = [
  { id: 1001, customer: 'Alice Johnson', date: '2025-11-01', total: '$129.99', status: 'Pending' },
  { id: 1002, customer: 'Bob Smith', date: '2025-11-02', total: '$89.50', status: 'Shipped' },
  { id: 1003, customer: 'Charlie Davis', date: '2025-11-03', total: '$59.00', status: 'Delivered' },
  { id: 1004, customer: 'Diana Lee', date: '2025-11-04', total: '$199.99', status: 'Cancelled' },
  { id: 1005, customer: 'Ethan Brown', date: '2025-11-05', total: '$149.25', status: 'Shipped' }
]

// Helper to get badge color based on status
const statusColor = (status: Order['status']) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800'
    case 'Shipped': return 'bg-blue-100 text-blue-800'
    case 'Delivered': return 'bg-emerald-100 text-emerald-800'
    case 'Cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-slate-100 text-slate-800'
  }
}
</script>

<template>
  <div class="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
      <div class="flex-1 min-w-0">
        <h1 class="text-lg sm:text-xl font-semibold tracking-tight">Orders</h1>
        <p class="text-sm sm:text-base text-slate-600 mt-1">
          This mock view demonstrates where order information and fulfillment states would live.
        </p>
      </div>
      <button class="text-sm sm:text-base px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md transition">
        Add Order
      </button>
    </div>

    <!-- Orders Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 border border-slate-100 rounded-xl overflow-hidden">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">Order ID</th>
            <th class="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">Customer</th>
            <th class="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">Date</th>
            <th class="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">Total</th>
            <th class="px-3 py-2 text-left text-xs sm:text-sm font-semibold text-slate-600">Status</th>
            <th class="px-3 py-2 text-right text-xs sm:text-sm font-semibold text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-slate-50 transition">
            <td class="px-3 py-2 text-xs sm:text-sm font-medium text-slate-700">#{{ order.id }}</td>
            <td class="px-3 py-2 text-xs sm:text-sm text-slate-700">{{ order.customer }}</td>
            <td class="px-3 py-2 text-xs sm:text-sm text-slate-700">{{ order.date }}</td>
            <td class="px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800">{{ order.total }}</td>
            <td class="px-3 py-2">
              <span
                :class="`inline-block px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${statusColor(order.status)}`"
              >
                {{ order.status }}
              </span>
            </td>
            <td class="px-3 py-2 text-right">
              <button class="text-xs sm:text-sm text-blue-600 hover:underline">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty state for mobile if needed -->
    <p v-if="orders.length === 0" class="text-sm text-slate-600 text-center py-6">
      No orders available.
    </p>
  </div>
</template>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  table th, table td {
    padding: 0.5rem;
  }
}
</style>
