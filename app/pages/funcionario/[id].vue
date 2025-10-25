<template>
  <div class="min-h-screen bg-background py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="flex items-center space-x-2 text-primary">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span class="text-sm font-medium">Carregando funcionário...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h3 class="font-medium text-lg mb-2">Erro ao carregar funcionário</h3>
          <p class="text-sm mb-4">{{ error }}</p>
          <AppButton 
            @click="buscarFuncionarioPorId" 
            class="bg-red-600 hover:bg-red-700 text-white"
          >
            Tentar Novamente
          </AppButton>
        </div>
      </div>

      <!-- Funcionário não encontrado -->
      <div v-else-if="!funcionarioEncontrado" class="text-center py-12">
        <div class="text-text-muted">
          <svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 class="text-lg font-medium text-text mb-2">Funcionário não encontrado</h3>
          <p class="text-sm mb-4">O funcionário com ID {{ route.params.id }} não existe.</p>
          <AppButton 
            @click="navigateTo('/')" 
            class="bg-primary hover:bg-accent text-white"
          >
            Voltar à Lista
          </AppButton>
        </div>
      </div>

      <!-- Formulário do Funcionário -->
      <div v-else>
        <!-- Componente do Formulário -->
        <FormFuncionario 
          :is-novo="false" 
          :funcionario-inicial="funcionarioSelecionado"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import FormFuncionario from '~/components/FormFuncionario.vue'
import AppButton from '~/components/AppButton.vue'
import { useFuncionarios } from '~/composables/useFuncionarios'
import type { Funcionario } from '../../../types/funcionario'

// Composables e estado
const route = useRoute()
const { funcionarios, loading, error, buscarFuncionarios } = useFuncionarios()

// Estado local
const funcionarioSelecionado = ref<Funcionario | null>(null)

// Computed para verificar se o funcionário foi encontrado
const funcionarioEncontrado = computed(() => funcionarioSelecionado.value !== null)

// Função para buscar funcionário específico
const buscarFuncionarioPorId = async () => {
  const id = parseInt(route.params.id as string)
  
  if (isNaN(id)) {
    error.value = 'ID do funcionário inválido'
    return
  }

  // Se a lista já está carregada, buscar nela
  if (funcionarios.value.length > 0) {
    const funcionario = funcionarios.value.find(f => f.id === id)
    funcionarioSelecionado.value = funcionario || null
    
    if (!funcionario) {
      error.value = `Funcionário com ID ${id} não encontrado`
    }
  } else {
    // Caso contrário, buscar todos os funcionários primeiro
    await buscarFuncionarios()
    
    if (!error.value) {
      const funcionario = funcionarios.value.find(f => f.id === id)
      funcionarioSelecionado.value = funcionario || null
      
      if (!funcionario) {
        error.value = `Funcionário com ID ${id} não encontrado`
      }
    }
  }
}

// Buscar funcionário ao montar
onMounted(async () => {
  await buscarFuncionarioPorId()
})
</script>