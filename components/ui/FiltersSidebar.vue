<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:priceRange', value: [number, number]): void
}>()

const localMin = ref(0)
const localMax = ref(200)

watch([localMin, localMax], () => {
  emit('update:priceRange', [localMin.value, localMax.value])
})
</script>

<template>
  <aside class="bg-white rounded-2xl border border-slate-100 p-4 space-y-4">
    <h3 class="text-sm font-semibold">
      Filters
    </h3>
    <div class="space-y-2">
      <label class="text-xs font-medium text-slate-600">
        Price range
      </label>
      <div class="flex gap-2 items-center text-xs">
        <input
          v-model.number="localMin"
          type="number"
          min="0"
          class="w-20 rounded-lg border border-slate-200 px-2 py-1 text-xs"
        >
        <span>-</span>
        <input
          v-model.number="localMax"
          type="number"
          min="0"
          class="w-20 rounded-lg border border-slate-200 px-2 py-1 text-xs"
        >
      </div>
      <p class="text-[11px] text-slate-500">
        All prices in USD using mock values.
      </p>
    </div>
  </aside>
</template>
