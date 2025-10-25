<template>
  <div class="min-h-screen bg-background py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Componente do Formulário -->
      <FormFuncionario :is-novo="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FormFuncionario from '~/components/FormFuncionario.vue'

// Página protegida automaticamente pelo middleware global
</script>
