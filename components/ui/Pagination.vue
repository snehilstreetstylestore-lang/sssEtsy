<script setup lang="ts">
interface Props {
  page: number
  pageSize: number
  total: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize))
)

const canPrev = computed(() => props.page > 1)
const canNext = computed(() => props.page < totalPages.value)

const goPrev = () => {
  if (canPrev.value) emit('update:page', props.page - 1)
}

const goNext = () => {
  if (canNext.value) emit('update:page', props.page + 1)
}
</script>

<template>
  <div class="flex items-center justify-between mt-6 text-xs text-slate-600">
    <p>
      Page {{ page }} of {{ totalPages }}
    </p>
    <div class="inline-flex items-center gap-2">
      <button
        class="px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="!canPrev"
        @click="goPrev"
      >
        Previous
      </button>
      <button
        class="px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="!canNext"
        @click="goNext"
      >
        Next
      </button>
    </div>
  </div>
</template>
