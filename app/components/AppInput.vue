<template>
  <input
    class="w-full px-3 py-2 rounded bg-surface text-text border border-border focus:outline-none focus:ring-2 focus:ring-primary"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
})
</script>
