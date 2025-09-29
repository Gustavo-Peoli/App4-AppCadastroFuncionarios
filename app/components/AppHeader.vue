<template>
  <header class="w-full bg-primary text-text-onPrimary py-4 shadow flex items-center justify-between px-8">
    <h1 class="text-2xl font-bold">Sistema Cadastro</h1>
    
    <div class="flex items-center gap-6">
      <nav v-if="user">
        <ul class="flex gap-6">
          <li><NuxtLink to="/" class="hover:text-accent">Início</NuxtLink></li>
          <li><NuxtLink to="/NovoCadastro" class="hover:text-accent">Novo Cadastro</NuxtLink></li>
        </ul>
      </nav>
      
      <div v-if="user" class="flex items-center gap-4">
        <span class="text-sm">{{ user.email }}</span>
        <button 
          @click="handleLogout" 
          class="text-sm hover:text-accent"
          :disabled="loading"
        >
          {{ loading ? 'Saindo...' : 'Sair' }}
        </button>
      </div>
      
      <nav v-else>
        <NuxtLink to="/Login" class="hover:text-accent">Entrar</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth.js'

const { user, logout, loading, checkUser } = useAuth()

// Verificar se há usuário logado ao montar o componente
onMounted(() => {
  checkUser()
})

const handleLogout = async () => {
  await logout()
  await navigateTo('/Login')
}
</script>
