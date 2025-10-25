<template>
  <div class="w-full bg-white rounded-xl shadow-lg border border-border overflow-hidden">
    <!-- Header da Tabela -->
    <div class="bg-primary/10 px-6 py-4 border-b border-border">
      <h2 class="text-xl font-bold text-text">Lista de Funcionários</h2>
      <p class="text-sm text-text-muted mt-1">
        {{ funcionarios.length }} funcionário(s) encontrado(s)
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="flex items-center space-x-2 text-primary">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span class="text-sm font-medium">Carregando funcionários...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-6 text-center">
      <div class="text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="font-medium">Erro ao carregar funcionários</p>
        <p class="text-sm mt-1">{{ error }}</p>
        <AppButton 
          @click="buscarFuncionarios" 
          class="mt-3 bg-red-600 hover:bg-red-700 text-white"
        >
          Tentar Novamente
        </AppButton>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="funcionarios.length === 0" class="p-12 text-center">
      <div class="text-text-muted">
        <svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM9 9a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="text-lg font-medium text-text mb-2">Nenhum funcionário encontrado</h3>
        <p class="text-sm">Não há funcionários cadastrados no sistema.</p>
      </div>
    </div>

    <!-- Tabela -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-border">
        <thead class="bg-background">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
              Nome
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
              Cargo
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
              Email
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-border">
          <tr 
            v-for="funcionario in funcionarios" 
            :key="funcionario.id"
            class="hover:bg-background transition-colors duration-200"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-text">{{ funcionario.nome }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-text">
                {{ funcionario.cargo || 'Não informado' }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-text">
                {{ funcionario.email || 'Não informado' }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useFuncionarios } from '~/composables/useFuncionarios'
import AppButton from '~/components/AppButton.vue'
import type { Funcionario } from '../../types/funcionario'

const { funcionarios, loading, error, buscarFuncionarios } = useFuncionarios()

// Buscar funcionários ao montar o componente
onMounted(async () => {
  await buscarFuncionarios()
})
</script>