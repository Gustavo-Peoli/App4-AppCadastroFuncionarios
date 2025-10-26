import { ref } from 'vue'
import { useNuxtApp } from '#app'
import type { Funcionario, FuncionarioInput, FuncionarioUpdate } from '../../types/funcionario'

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

  // Criar novo funcionário
  const criarFuncionario = async (dadosFuncionario: FuncionarioInput) => {
    loading.value = true
    error.value = null
    
    try {
      // Preparar dados para inserção
      const dadosParaInserir = {
        nome: dadosFuncionario.nome,
        cargo: dadosFuncionario.cargo || null,
        endereco: dadosFuncionario.endereco || null,
        email: dadosFuncionario.email || null,
        salario: dadosFuncionario.salario ? parseFloat(dadosFuncionario.salario.toString()) : null
      }
      
      const { data, error: insertError } = await $supabase
        .from('funcionarios')
        .insert([dadosParaInserir])
        .select()
      
      if (insertError) {
        // Traduzir mensagens de erro específicas
        switch (insertError.code) {
          case '23505': // Unique violation
            if (insertError.message.includes('funcionarios_email_key')) {
              error.value = 'Este e-mail já está cadastrado para outro funcionário'
            } else {
              error.value = 'Erro: dados duplicados'
            }
            break
          case '23502': // Not null violation
            error.value = 'Nome é obrigatório'
            break
          default:
            error.value = 'Erro ao criar funcionário. Tente novamente'
        }
        return { funcionario: null, error: error.value }
      } else {
        // Adicionar o novo funcionário à lista local
        const novoFuncionario = data[0] as Funcionario
        funcionarios.value.push(novoFuncionario)
        error.value = null
        return { funcionario: novoFuncionario, error: null }
      }
    } catch (err) {
      error.value = 'Erro de conexão. Verifique sua internet e tente novamente'
      return { funcionario: null, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Editar funcionário existente
  const editarFuncionario = async (id: number, dadosFuncionario: FuncionarioInput) => {
    loading.value = true
    error.value = null
    
    try {
      // Preparar dados para atualização
      const dadosParaAtualizar = {
        nome: dadosFuncionario.nome,
        cargo: dadosFuncionario.cargo || null,
        endereco: dadosFuncionario.endereco || null,
        email: dadosFuncionario.email || null,
        salario: dadosFuncionario.salario ? parseFloat(dadosFuncionario.salario.toString()) : null
      }
      
      const { data, error: updateError } = await $supabase
        .from('funcionarios')
        .update(dadosParaAtualizar)
        .eq('id', id)
        .select()
      
      if (updateError) {
        // Traduzir mensagens de erro específicas
        switch (updateError.code) {
          case '23505': // Unique violation
            if (updateError.message.includes('funcionarios_email_key')) {
              error.value = 'Este e-mail já está cadastrado para outro funcionário'
            } else {
              error.value = 'Erro: dados duplicados'
            }
            break
          case '23502': // Not null violation
            error.value = 'Nome é obrigatório'
            break
          case '42P01': // Undefined table (caso não exista)
            error.value = 'Funcionário não encontrado'
            break
          default:
            error.value = 'Erro ao atualizar funcionário. Tente novamente'
        }
        return { funcionario: null, error: error.value }
      } else {
        if (data && data.length > 0) {
          // Atualizar o funcionário na lista local
          const funcionarioAtualizado = data[0] as Funcionario
          const index = funcionarios.value.findIndex(f => f.id === id)
          
          if (index !== -1) {
            funcionarios.value[index] = funcionarioAtualizado
          }
          
          error.value = null
          return { funcionario: funcionarioAtualizado, error: null }
        } else {
          error.value = 'Funcionário não encontrado'
          return { funcionario: null, error: error.value }
        }
      }
    } catch (err) {
      error.value = 'Erro de conexão. Verifique sua internet e tente novamente'
      return { funcionario: null, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Deletar funcionário
  const deletarFuncionario = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const { error: deleteError } = await $supabase
        .from('funcionarios')
        .delete()
        .eq('id', id)
      
      if (deleteError) {
        switch (deleteError.code) {
          case '42P01': // Undefined table (caso não exista)
            error.value = 'Funcionário não encontrado'
            break
          default:
            error.value = 'Erro ao deletar funcionário. Tente novamente'
        }
        return { success: false, error: error.value }
      } else {
        // Remover o funcionário da lista local
        funcionarios.value = funcionarios.value.filter(f => f.id !== id)
        error.value = null
        return { success: true, error: null }
      }
    } catch (err) {
      error.value = 'Erro de conexão. Verifique sua internet e tente novamente'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    funcionarios,
    loading,
    error,
    buscarFuncionarios,
    criarFuncionario,
    editarFuncionario,
    deletarFuncionario
  }
}