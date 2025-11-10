<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  type?: 'button' | 'submit'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button'
})

const sizeClasses = computed(() =>
  props.size === 'sm'
    ? 'px-3 py-1.5 text-xs'
    : 'px-4 py-2 text-sm'
)

const variantClasses = computed(() => {
  if (props.variant === 'secondary') {
    return 'bg-white text-slate-900 border border-slate-200 hover:border-slate-400 hover:bg-slate-50'
  }
  if (props.variant === 'ghost') {
    return 'bg-transparent text-slate-900 hover:bg-slate-100 border border-transparent'
  }
  return 'bg-slate-900 text-white hover:bg-slate-800 border border-slate-900'
})
</script>

<template>
  <button
    :type="props.type"
    class="inline-flex items-center justify-center rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[sizeClasses, variantClasses]"
  >
    <slot />
  </button>
</template>
