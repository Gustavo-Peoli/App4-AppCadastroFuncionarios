
import { ref } from 'vue'
import { useNuxtApp } from '#app'

const user = ref(null)
const loading = ref(false)
const error = ref(null)

export function useAuth() {
  const { $supabase } = useNuxtApp()
  // login action
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    const { data, error: loginError } = await $supabase.auth.signInWithPassword({
      email,
      password
    })
    if (loginError) {
      error.value = loginError.message
      user.value = null
    } else {
      user.value = data.user
    }
    loading.value = false
    return { user: user.value, error: error.value }
  }

  return {
    user,
    loading,
    error,
    login
  }
}
