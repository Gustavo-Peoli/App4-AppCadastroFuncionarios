
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
        <AppButton class="w-full bg-gradient-to-r from-primary to-accent text-white shadow-md" :disabled="loading">
          <span v-if="loading">Entrando...</span>
          <span v-else>Entrar</span>
        </AppButton>
        <div v-if="error" class="text-red-600 text-sm mt-2 text-center">{{ error }}</div>
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

const handleLogin = async () => {
  await loginAction(login.value.email, login.value.password)
}
</script>
