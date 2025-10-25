<template>
  <div class="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-border p-8">
    <!-- Header do Formulário -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-text mb-2">
        {{ isNovo ? 'Novo Funcionário' : 'Editar Funcionário' }}
      </h2>
      <p class="text-text-muted">
        {{ isNovo ? 'Preencha os dados do novo funcionário' : 'Altere os dados do funcionário' }}
      </p>
    </div>

    <!-- Formulário -->
    <form @submit.prevent="handleSubmit">
      <!-- Nome -->
      <div class="mb-6">
        <label class="block text-sm font-semibold mb-2 text-text">
          Nome <span class="text-red-500">*</span>
        </label>
        <AppInput
          v-model="form.nome"
          type="text"
          placeholder="Digite o nome completo do funcionário"
          class="w-full"
        />
      </div>

      <!-- Cargo -->
      <div class="mb-6">
        <label class="block text-sm font-semibold mb-2 text-text">
          Cargo
        </label>
        <AppDropdown
          v-model="form.cargo"
          placeholder="Selecione o cargo"
          :options="cargoOptions"
          class="w-full"
        />
      </div>

      <!-- Endereço -->
      <div class="mb-6">
        <label class="block text-sm font-semibold mb-2 text-text">
          Endereço
        </label>
        <AppInput
          v-model="form.endereco"
          type="text"
          placeholder="Digite o endereço completo"
          class="w-full"
        />
      </div>

      <!-- Email -->
      <div class="mb-6">
        <label class="block text-sm font-semibold mb-2 text-text">
          E-mail
        </label>
        <AppInput
          v-model="form.email"
          type="email"
          placeholder="Digite o e-mail do funcionário"
          class="w-full"
        />
      </div>

      <!-- Salário -->
      <div class="mb-8">
        <label class="block text-sm font-semibold mb-2 text-text">
          Salário
        </label>
        <AppInput
          v-model="form.salario"
          type="number"
          step="0.01"
          placeholder="Digite o salário (ex: 2500.00)"
          class="w-full"
        />
      </div>

      <!-- Botões de Ação -->
      <div class="flex justify-end space-x-4">
        <AppButton
          type="button"
          class="bg-secondary text-white hover:bg-secondary-700"
          @click="handleCancel"
        >
          Cancelar
        </AppButton>

        <AppButton
          v-if="!isNovo"
          type="button"
          class="bg-secondary text-white hover:bg-secondary-700"
          @click="handleVoltarLista"
        >
          ← Voltar à Lista
        </AppButton>
        
        <AppButton
          v-if="isNovo"
          type="submit"
          class="bg-gradient-to-r from-primary to-accent text-white shadow-md"
          :disabled="loading"
        >
          <span v-if="loading">Salvando...</span>
          <span v-else>Salvar</span>
        </AppButton>
        
        <AppButton
          v-else
          type="submit"
          class="bg-gradient-to-r from-primary to-accent text-white shadow-md"
          :disabled="loading"
        >
          <span v-if="loading">Salvando...</span>
          <span v-else>Editar</span>
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppInput from '~/components/AppInput.vue'
import AppButton from '~/components/AppButton.vue'
import AppDropdown from '~/components/AppDropdown.vue'
import { useNotification } from '~/composables/useNotification'
import { useFuncionarios } from '~/composables/useFuncionarios'
import type { FuncionarioInput, Funcionario } from '../../types/funcionario'

// Props
interface Props {
  isNovo?: boolean
  funcionarioInicial?: Funcionario | null
}

const props = withDefaults(defineProps<Props>(), {
  isNovo: true,
  funcionarioInicial: null
})

// Composables
const { showSuccess, showError, showInfo } = useNotification()
const { criarFuncionario, editarFuncionario, loading } = useFuncionarios()

// Opções de cargo
const cargoOptions = [
  'Assistente Administrativo(a)',
  'Vendedor(a) / Representante Comercial',
  'Analista de Recursos Humanos',
  'Desenvolvedor(a) de Software (ou Analista de Sistemas)',
  'Contador(a) / Analista Financeiro(a)',
  'Enfermeiro(a)',
  'Engenheiro(a) Civil (ou de Produção, Mecânico, etc.)',
  'Analista de Marketing Digital',
  'Gerente de Projetos',
  'Recepcionista / Atendente'
]

// Formulário reativo com tipos compatíveis para v-model
const form = ref({
  nome: '',
  cargo: '',
  endereco: '',
  email: '',
  salario: ''
})

// Observar mudanças no funcionário inicial para preencher o formulário
watch(() => props.funcionarioInicial, (novoFuncionario) => {
  if (novoFuncionario) {
    form.value = {
      nome: novoFuncionario.nome || '',
      cargo: novoFuncionario.cargo || '',
      endereco: novoFuncionario.endereco || '',
      email: novoFuncionario.email || '',
      salario: novoFuncionario.salario ? novoFuncionario.salario.toString() : ''
    }
  }
}, { immediate: true })

// Função para validar campos obrigatórios
const validarFormulario = (): boolean => {
  if (!form.value.nome.trim()) {
    showError('Nome é obrigatório')
    return false
  }
  
  // Validar email se preenchido
  if (form.value.email && form.value.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.value.email)) {
      showError('E-mail inválido')
      return false
    }
  }
  
  // Validar salário se preenchido
  if (form.value.salario && form.value.salario.trim()) {
    const salario = parseFloat(form.value.salario)
    if (isNaN(salario) || salario < 0) {
      showError('Salário deve ser um valor válido')
      return false
    }
  }
  
  return true
}

// Função para lidar com o submit
const handleSubmit = async () => {
  // Validar formulário
  if (!validarFormulario()) {
    return
  }
  
  if (props.isNovo) {
    // Criar novo funcionário
    const dadosParaEnviar: FuncionarioInput = {
      nome: form.value.nome,
      cargo: form.value.cargo || null,
      endereco: form.value.endereco || null,
      email: form.value.email || null,
      salario: form.value.salario ? parseFloat(form.value.salario) : null
    }
    
    const resultado = await criarFuncionario(dadosParaEnviar)
    
    if (resultado.funcionario) {
      // Sucesso
      showSuccess('Funcionário criado com sucesso!')
      
      // Reset do formulário para novos cadastros
      form.value = {
        nome: '',
        cargo: '',
        endereco: '',
        email: '',
        salario: ''
      }
    } else {
      // Erro - a mensagem já vem do composable
      showError(resultado.error || 'Erro ao criar funcionário')
    }
  } else {
    // Editar funcionário existente
    if (!props.funcionarioInicial?.id) {
      showError('ID do funcionário não encontrado')
      return
    }
    
    const dadosParaEnviar: FuncionarioInput = {
      nome: form.value.nome,
      cargo: form.value.cargo || null,
      endereco: form.value.endereco || null,
      email: form.value.email || null,
      salario: form.value.salario ? parseFloat(form.value.salario) : null
    }
    
    const resultado = await editarFuncionario(props.funcionarioInicial.id, dadosParaEnviar)
    
    if (resultado.funcionario) {
      // Sucesso
      showSuccess('Funcionário atualizado com sucesso!')
      
      // Voltar para a página inicial com dados atualizados
      await navigateTo('/')
    } else {
      // Erro - a mensagem já vem do composable
      showError(resultado.error || 'Erro ao atualizar funcionário')
    }
  }
}

// Função para cancelar
const handleCancel = () => {
  // Limpar formulário se for novo, ou voltar aos dados originais se for edição
  if (props.isNovo) {
    form.value = {
      nome: '',
      cargo: '',
      endereco: '',
      email: '',
      salario: ''
    }
    showInfo('Formulário limpo')
  }
  
  // Aqui pode ser implementada navegação de volta ou emit para o componente pai
  console.log('Cancelando operação')
}

// Função para voltar à lista (apenas para edição)
const handleVoltarLista = () => {
  navigateTo('/')
}
</script>