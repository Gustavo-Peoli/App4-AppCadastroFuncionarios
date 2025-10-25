import { ref } from 'vue'
import { useNuxtApp } from '#app'
import type { Funcionario } from '../../types/funcionario'

const funcionarios = ref<Funcionario[]>([])
const loading = ref<boolean>(false)
const error = ref<string | null>(null)

export function useFuncionarios() {
  const { $supabase } = useNuxtApp() as any
  
  // Buscar todos os funcionários
  const buscarFuncionarios = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await $supabase
        .from('funcionarios')
        .select('*')
        .order('id', { ascending: true })
      
      if (fetchError) {
        error.value = 'Erro ao buscar funcionários'
        funcionarios.value = []
      } else {
        funcionarios.value = (data as Funcionario[]) || []
        error.value = null
      }
    } catch (err) {
      error.value = 'Erro de conexão. Verifique sua internet e tente novamente'
      funcionarios.value = []
    }
    
    loading.value = false
    return { funcionarios: funcionarios.value, error: error.value }
  }

  return {
    funcionarios,
    loading,
    error,
    buscarFuncionarios
  }
}