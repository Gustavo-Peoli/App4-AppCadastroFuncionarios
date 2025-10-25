
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const user = ref(null)
const loading = ref(false)
const error = ref(null)

export function useAuth() {
  const { $supabase } = useNuxtApp()
  
  // Função para inicializar o estado do usuário
  const initUser = async () => {
    const { data: { user: currentUser } } = await $supabase.auth.getUser()
    user.value = currentUser
  }
  
  // login action
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: loginError } = await $supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (loginError) {
        // Traduzir mensagens de erro do Supabase
        switch (loginError.message) {
          case 'Invalid login credentials':
            error.value = 'E-mail ou senha incorretos'
            break
          case 'Email not confirmed':
            error.value = 'Por favor, confirme seu e-mail antes de fazer login'
            break
          case 'Too many requests':
            error.value = 'Muitas tentativas de login. Tente novamente em alguns minutos'
            break
          default:
            error.value = 'Erro ao fazer login. Tente novamente'
        }
        user.value = null
      } else {
        user.value = data.user
        error.value = null
      }
    } catch (err) {
      error.value = 'Erro de conexão. Verifique sua internet e tente novamente'
      user.value = null
    }
    
    loading.value = false
    return { user: user.value, error: error.value }
  }

  // logout action
  const logout = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { error: logoutError } = await $supabase.auth.signOut()
      
      if (logoutError) {
        error.value = 'Erro ao fazer logout'
      } else {
        user.value = null
        error.value = null
      }
    } catch (err) {
      error.value = 'Erro ao fazer logout'
    }
    
    loading.value = false
  }

  // register action (criar conta)
  const register = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: registerError } = await $supabase.auth.signUp({
        email,
        password
      })
      
      if (registerError) {
        // Traduzir mensagens de erro do Supabase
        switch (registerError.message) {
          case 'User already registered':
            error.value = 'Este e-mail já está cadastrado'
            break
          case 'Password should be at least 6 characters':
            error.value = 'A senha deve ter pelo menos 6 caracteres'
            break
          case 'Unable to validate email address: invalid format':
            error.value = 'Formato de e-mail inválido'
            break
          default:
            error.value = 'Erro ao criar conta. Tente novamente'
        }
        user.value = null
      } else {
        user.value = data.user
        error.value = null
      }
    } catch (err) {
      error.value = 'Erro de conexão. Verifique sua internet e tente novamente'
      user.value = null
    }
    
    loading.value = false
    return { user: user.value, error: error.value }
  }

  // Verificar se há usuário logado ao inicializar
  const checkUser = async () => {
    const { data: { user: currentUser } } = await $supabase.auth.getUser()
    user.value = currentUser
  }

  // Escutar mudanças no estado de autenticação
  $supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null
  })

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    checkUser,
    initUser
  }
}
