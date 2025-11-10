<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => emit('update:modelValue', false)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="props.modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-slate-900/40"
          @click="close"
        />
        <div
          v-motion="{
            initial: { opacity: 0, y: 10, scale: 0.98 },
            enter: { opacity: 1, y: 0, scale: 1 },
            leave: { opacity: 0, y: 8, scale: 0.98 }
          }"
          class="relative bg-white rounded-2xl shadow-soft max-w-md w-full mx-4 p-5"
        >
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-semibold">
              {{ props.title }}
            </h2>
            <button
              type="button"
              class="text-xs text-slate-500 hover:text-slate-900"
              @click="close"
            >
              Close
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
