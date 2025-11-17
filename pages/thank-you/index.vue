<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6 opacity-0 animate-fadeIn"
  >
    <div
      class="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 transform scale-95 animate-scaleIn"
    >
      <!-- Header / Success badge -->
      <div class="flex items-center gap-4">
        <div
          class="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 animate-pop"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div class="animate-slideDown">
          <h1 class="text-3xl font-bold">Thank you!</h1>
          <p class="text-sm text-gray-500 mt-1">
            Your order was placed successfully.
          </p>
        </div>
      </div>

      <!-- Main content -->
      <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left: Message + actions -->
        <div class="md:col-span-2 animate-fadeUp">
          <p class="text-gray-700 text-lg">
            Hi <span class="font-semibold">{{ customerName || "Customer" }}</span
            >,
          </p>

          <p class="mt-2 text-gray-600 leading-relaxed">
            We received your order
            <span class="font-medium">#{{ orderId || "—" }}</span>. A
            confirmation email has been sent to
            <span class="font-medium">{{ email || "your email" }}</span>. You
            can view your order details or continue shopping.
          </p>

          <!-- Buttons -->
          <div class="mt-8 flex flex-wrap gap-4">
            <button
              @click="goHome"
              class="px-5 py-2.5 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 transition transform hover:scale-105"
            >
              Continue shopping
            </button>

            <button
              v-if="orderId"
              @click="viewOrder"
              class="px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm hover:shadow transition transform hover:scale-105"
            >
              View order
            </button>

            <button
              v-if="canDownloadReceipt"
              @click="downloadReceipt"
              class="px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm hover:shadow transition transform hover:scale-105"
            >
              Download receipt
            </button>
          </div>

          <div class="mt-6 text-sm text-gray-500">
            <p>
              If you have questions, reply to the confirmation email or contact
              our support team anytime.
            </p>
          </div>
        </div>

        <!-- Right: Order summary card -->
        <div
          class="bg-gray-50 rounded-2xl p-5 shadow-sm animate-slideRight"
        >
          <h3 class="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Order Summary
          </h3>

          <div class="mt-4 text-sm text-gray-700 space-y-3">
            <div class="flex justify-between border-b pb-2">
              <span>Items</span>
              <span>{{ itemsCount }} items</span>
            </div>

            <div class="flex justify-between border-b pb-2">
              <span>Subtotal</span>
              <span>{{ formattedAmount(subtotal) }}</span>
            </div>

            <div class="flex justify-between border-b pb-2">
              <span>Shipping</span>
              <span>{{ formattedAmount(shipping) }}</span>
            </div>

            <div class="flex justify-between pt-3 text-gray-900 font-semibold text-base">
              <span>Total</span>
              <span>{{ formattedAmount(total) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Offer -->
      <div class="mt-10 text-center text-sm text-gray-600 animate-fadeUpSlow">
        <p>
          Want <span class="font-semibold">10% off</span> your next order? Use
          code <span class="font-semibold">THANKS10</span> at checkout.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "#imports";

// Load route values
const route = useRoute();
const router = useRouter();

const orderId = route.query.orderId as string | undefined;
const customerName = route.query.name as string | undefined;
const email = route.query.email as string | undefined;

const subtotal = Number(route.query.subtotal) || 0;
const shipping = Number(route.query.shipping) || 0;
const total = Number(route.query.total) || subtotal + shipping;
const itemsCount = Number(route.query.items) || 1;

const canDownloadReceipt = !!orderId;

function formattedAmount(n: number) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(n);
  } catch (e) {
    return `₹${n.toFixed(2)}`;
  }
}

function goHome() {
  router.push("/");
}

function viewOrder() {
  router
    .push({ name: "orders-id", params: { id: orderId } })
    .catch(() => router.push("/orders"));
}

function downloadReceipt() {
  const html = `
  <html><head><meta charset="utf-8"><title>Receipt ${orderId}</title></head>
  <body>
    <h1>Receipt — Order #${orderId}</h1>
    <p>Customer: ${customerName || ""}</p>
    <p>Email: ${email || ""}</p>
    <p>Total: ${formattedAmount(total)}</p>
    <p>Thank you for your purchase.</p>
  </body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}
</script>

<script lang="ts">
export default definePageMeta({
  title: "Thank you — Order received",
  meta: [
    {
      name: "description",
      content: "Order confirmation and details for successful purchase.",
    },
  ],
});
</script>

<style scoped>
/* fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fadeIn {
  animation: fadeIn 0.7s ease forwards;
}

/* scale in */
@keyframes scaleIn {
  0% {
    opacity: 0;
    transform: scale(0.94);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-scaleIn {
  animation: scaleIn 0.6s ease forwards;
}

/* pop badge */
@keyframes pop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-pop {
  animation: pop 0.5s ease-out forwards;
}

/* Slide Effects */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slideDown {
  animation: slideDown 0.7s ease forwards;
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(25px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-slideRight {
  animation: slideRight 0.8s ease forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeUp {
  animation: fadeUp 0.9s ease-out forwards;
}

.animate-fadeUpSlow {
  animation: fadeUp 1.5s ease-out forwards;
}
</style>
