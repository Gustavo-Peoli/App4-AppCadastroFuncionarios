<template>
  <div class="flex justify-center items-center min-h-screen bg-background text-text">
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '~/components/LoginForm.vue'
definePageMeta({ layout: false })
</script>
