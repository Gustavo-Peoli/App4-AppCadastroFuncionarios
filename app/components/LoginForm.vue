
<template>
  <div class="w-full max-w-[400px] mx-auto bg-white rounded-xl shadow-lg p-8 mt-24 border border-border text-text">
  <div class="flex mb-6 border-b border-border bg-primary/10 rounded-t-xl overflow-hidden">
      <button
        class="flex-1 py-3 text-lg font-semibold focus:outline-none transition border-b-2"
  :class="activeTab === 'login' ? 'border-primary text-primary bg-primary/10' : 'border-transparent text-text-muted bg-transparent'"
        @click="activeTab = 'login'"
        type="button"
      >
        Entrar
      </button>
      <button
        class="flex-1 py-3 text-lg font-semibold focus:outline-none transition border-b-2"
  :class="activeTab === 'register' ? 'border-primary text-primary bg-primary/10' : 'border-transparent text-text-muted bg-transparent'"
        @click="activeTab = 'register'"
        type="button"
      >
        Criar Conta
      </button>
    </div>
    <form @submit.prevent="activeTab === 'login' ? handleLogin() : null">
      <div v-if="activeTab === 'login'">
        <h2 class="text-xl font-bold text-center mb-6 text-text">Entre na sua conta</h2>
        <label class="block text-sm font-semibold mb-1 text-text">E-mail</label>
        <AppInput
          v-model="login.email"
          type="email"
          placeholder="Digite seu e-mail"
          class="mb-4"
        />
        <label class="block text-sm font-semibold mb-1 text-text">Senha</label>
        <AppInput
          v-model="login.password"
          type="password"
          placeholder="Digite sua senha"
          class="mb-6"
        />
        <AppButton 
          type="submit" 
          class="w-full bg-gradient-to-r from-primary to-accent text-white shadow-md" 
          :disabled="loading"
        >
          <span v-if="loading">Entrando...</span>
          <span v-else>Entrar</span>
        </AppButton>
        
        <!-- Exibir erro de validação ou erro do Supabase -->
        <div v-if="validationError || error" class="text-red-600 text-sm mt-2 text-center">
          {{ validationError || error }}
        </div>
        
        <!-- Mensagem de sucesso (opcional) -->
        <div v-if="!loading && !validationError && !error && login.email && login.password" class="text-green-600 text-sm mt-2 text-center hidden">
          Login realizado com sucesso!
        </div>
      </div>
      <div v-else>
  <h2 class="text-xl font-bold text-center mb-6 text-text">Criar nova conta</h2>
  <label class="block text-sm font-semibold mb-1 text-text">E-mail</label>
        <AppInput
          v-model="register.email"
          type="email"
          placeholder="Digite seu e-mail"
          class="mb-4"
        />
  <label class="block text-sm font-semibold mb-1 text-text">Senha</label>
        <AppInput
          v-model="register.password"
          type="password"
          placeholder="Digite sua senha"
          class="mb-4"
        />
  <label class="block text-sm font-semibold mb-1 text-text">Confirmar Senha</label>
        <AppInput
          v-model="register.confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
          class="mb-6"
        />
        <AppButton class="w-full bg-gradient-to-r from-primary to-accent text-white shadow-md">Criar Conta</AppButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppInput from '~/components/AppInput.vue'
import AppButton from '~/components/AppButton.vue'
import { useAuth } from '~/composables/useAuth.js'

const activeTab = ref('login')

const login = ref({
  email: '',
  password: ''
})

const register = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const { login: loginAction, loading, error } = useAuth()

// Estado local para validação
const validationError = ref('')

// Função para validar email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Função para validar os campos
const validateLogin = () => {
  validationError.value = ''
  
  if (!login.value.email.trim()) {
    validationError.value = 'Por favor, digite seu e-mail'
    return false
  }
  
  if (!isValidEmail(login.value.email)) {
    validationError.value = 'Por favor, digite um e-mail válido'
    return false
  }
  
  if (!login.value.password.trim()) {
    validationError.value = 'Por favor, digite sua senha'
    return false
  }
  
  if (login.value.password.length < 6) {
    validationError.value = 'A senha deve ter pelo menos 6 caracteres'
    return false
  }
  
  return true
}

const handleLogin = async () => {
  // Limpar erros anteriores
  validationError.value = ''
  
  // Validar campos
  if (!validateLogin()) {
    return
  }
  
  // Tentar fazer login
  const result = await loginAction(login.value.email, login.value.password)
  
  // Se houve sucesso no login, redirecionar para a página inicial
  if (result.user) {
    console.log('Login realizado com sucesso!')
    await navigateTo('/')
  }
}
</script>
