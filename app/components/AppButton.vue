<template>
  <button
    class="px-4 py-2 rounded bg-primary text-text-onPrimary font-semibold shadow hover:bg-accent transition disabled:opacity-50 disabled:cursor-not-allowed"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
