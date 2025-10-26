<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <div v-if="loading" class="flex items-center gap-2">
      <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      <span>Carregando...</span>
    </div>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  loading: false,
  variant: 'primary'
})

defineEmits<{
  click: []
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'px-4 py-2 rounded font-semibold shadow transition disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-primary text-text-onPrimary hover:bg-accent',
    secondary: 'bg-secondary-200 text-secondary-800 hover:bg-secondary-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }
  
  return `${baseClasses} ${variantClasses[props.variant]}`
})
</script>
