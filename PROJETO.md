# Documentação do Projeto: Sistema Cadastro

## 📁 Estrutura de Pastas Atualizada

```
app/
  components/      # Componentes Vue reutilizáveis
    AppButton.vue      # Botão padronizado com suporte a loading e submit
    AppInput.vue       # Input com validação e toggle de senha
    AppHeader.vue      # Cabeçalho dinâmico com auth state
    AppFooter.vue      # Rodapé do sistema
    LoginForm.vue      # Formulário de login/registro com abas
    FuncionariosTable.vue # Tabela componentizada para listar funcionários
  
  composables/     # Lógica de negócio reutilizável
    useAuth.js         # Gerenciamento de autenticação (login/logout/register)
    useFuncionarios.ts # Gerenciamento de funcionários (CRUD - buscar implementado)
  
  layouts/         # Layouts do Nuxt
    default.vue        # Layout padrão com header/footer
  
  middleware/      # Middleware de proteção
    auth.global.js     # Proteção global de rotas (exceto /Login)
  
  pages/           # Páginas do sistema
    index.vue          # Página inicial com listagem de funcionários
    Login.vue          # Página de autenticação (sem layout)
    NovoCadastro.vue   # Página para novos cadastros (protegida)
  
  plugins/         # Plugins globais
    supabase.client.js # Cliente Supabase disponível globalmente
  
  app.vue          # Arquivo principal do Nuxt
  
types/             # Definições TypeScript
  funcionario.ts       # Interfaces para entidades de funcionários

public/            # Arquivos públicos
  favicon.ico
  robots.txt

tailwind.config.js # Configuração personalizada do Tailwind
nuxt.config.ts     # Configuração do Nuxt
package.json       # Dependências do projeto
.env              # Variáveis de ambiente (não versionado)
.gitignore        # Configuração do Git
```

## 📦 Dependências Instaladas

### Core Framework
- **Nuxt 4**: Framework Vue.js full-stack
- **Vue 3**: Framework reativo com Composition API
- **TypeScript**: Tipagem estática

### UI e Estilização
- **Tailwind CSS**: Framework CSS utilitário (módulo oficial)
- **@headlessui/vue**: Componentes acessíveis headless
- **@heroicons/vue**: Biblioteca de ícones SVG

### Backend e Autenticação
- **@supabase/supabase-js**: Cliente para backend e autenticação

## ⚙️ Configuração do Projeto

### Nuxt Configuration
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: false, // SPA mode
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY
    }
  }
})
```

### Supabase
- **Plugin global**: `app/plugins/supabase.client.js`
- **Acesso**: `useNuxtApp().$supabase`
- **Variáveis de ambiente**: 
  - `NUXT_PUBLIC_SUPABASE_URL`
  - `NUXT_PUBLIC_SUPABASE_KEY`

### Database Schema
```sql
-- Tabela de funcionários
create table public.funcionarios (
  id integer generated always as identity not null,
  nome text not null,
  cargo text null,
  endereco text null,
  email text null,
  salario numeric(10, 2) null,
  constraint funcionarios_pkey primary key (id),
  constraint funcionarios_email_key unique (email)
);
```

## 🎨 Sistema de Cores (Tailwind)

```javascript
// tailwind.config.js
colors: {
  primary: {
    DEFAULT: '#FF8800',
    50: '#FFF5E6',
    100: '#FFE0B3',
    200: '#FFCC80',
    300: '#FFB84D',
    400: '#FFA41A',
    500: '#FF8800',
    600: '#E67300',
    700: '#CC5F00',
    800: '#B34A00',
    900: '#993600'
  },
  secondary: {
    DEFAULT: '#222222',
    50: '#F5F5F5',
    100: '#E0E0E0',
    200: '#CCCCCC',
    300: '#B3B3B3',
    400: '#999999',
    500: '#808080',
    600: '#666666',
    700: '#4D4D4D',
    800: '#333333',
    900: '#222222'
  },
  background: {
    DEFAULT: '#F7F9FD',
    dark: '#181818'
  },
  surface: '#242424',
  text: {
    DEFAULT: '#222222',
    muted: '#B3B3B3',
    onPrimary: '#F5F5F5'
  },
  accent: '#FFB300',
  border: '#333333'
}
```

## 🔐 Sistema de Autenticação

### Composable `useAuth.js`
```javascript
// Funcionalidades disponíveis:
- login(email, password)     // Login do usuário
- logout()                   // Logout do usuário  
- register(email, password)  // Registro de nova conta
- initUser()                 // Inicialização do estado do usuário
- user                       // Estado reativo do usuário logado
- loading                    // Estado de carregamento
- error                      // Mensagens de erro
```

### Middleware de Proteção
- **Global**: `auth.global.js` protege todas as rotas exceto `/Login`
- **Redirecionamento automático**: Usuários não autenticados → `/Login`
- **Persistência**: Estado mantido entre reloads da página

### Fluxo de Autenticação
1. Usuário acessa página protegida
2. Middleware verifica autenticação
3. Se não autenticado → redirect para `/Login`
4. Após login → redirect para página original
5. Header mostra dados do usuário + botão logout

## 👥 Sistema de Funcionários

### Composable `useFuncionarios.ts`
```typescript
// Funcionalidades disponíveis:
- buscarFuncionarios()       // Busca todos os funcionários
- funcionarios               // Array reativo com dados
- loading                    // Estado de carregamento
- error                      // Mensagens de erro

// Tipos TypeScript:
- Funcionario               // Interface completa
- FuncionarioInput          // Para criação (sem ID)
- FuncionarioUpdate         // Para atualização
```

### Componente `FuncionariosTable.vue`
- **Estados visuais**: Loading, Error, Empty, Data
- **Colunas exibidas**: Nome, Cargo, Email
- **Funcionalidades**: 
  - Busca automática ao montar
  - Tratamento de valores nulos
  - Contador de registros
  - Design responsivo
  - Hover effects

## 🧩 Padrões de Desenvolvimento

### Componentes
- **Nomenclatura**: PascalCase (ex: `AppButton`, `FuncionariosTable`)
- **Imports**: Sempre explícitos
- **Tipagem**: TypeScript quando possível
- **Estilização**: Classes Tailwind + sistema de cores

### Composables
- **Nomenclatura**: `use` + PascalCase (ex: `useAuth`, `useFuncionarios`)
- **Estados**: Reativos com `ref()`
- **Retorno**: Objeto com estados e funções
- **Tipagem**: TypeScript com interfaces

### Páginas
- **Layouts**: `default.vue` por padrão
- **Proteção**: Middleware automático exceto `/Login`
- **Componentes**: Importação explícita

## 📄 Como Usar

### Adicionar Nova Página
```vue
<!-- app/pages/MinhaPage.vue -->
<template>
  <div>Minha nova página</div>
</template>

<script setup lang="ts">
// Se precisar de layout específico:
// definePageMeta({ layout: 'custom' })
</script>
```

### Criar Novo Componente
```vue
<!-- app/components/MeuComponent.vue -->
<template>
  <div class="bg-primary text-white p-4">
    {{ props.title }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>
```

### Usar Composables
```vue
<script setup lang="ts">
import { useFuncionarios } from '~/composables/useFuncionarios'

const { funcionarios, loading, buscarFuncionarios } = useFuncionarios()

onMounted(() => {
  buscarFuncionarios()
})
</script>
```

## 🚀 Próximos Passos

### Funcionários (CRUD Completo)
- [ ] Criar funcionário
- [ ] Editar funcionário  
- [ ] Excluir funcionário
- [ ] Filtros e busca
- [ ] Paginação

### Interface
- [ ] Modal de confirmação
- [ ] Notificações toast
- [ ] Loading skeletons
- [ ] Validação de formulários

### Sistema
- [ ] Middleware de permissões
- [ ] Gestão de estado global
- [ ] Testes unitários
- [ ] Deploy automatizado

---

## 📝 Observações Importantes

1. **Modo SPA**: O projeto roda inteiramente no cliente
2. **TypeScript**: Gradualmente sendo adotado (composables e tipos)
3. **Componentização**: Tudo deve ser componentizado, nada inline
4. **Supabase**: Backend completo com auth e database
5. **Middleware Global**: Proteção automática de todas as rotas

Este documento é atualizado conforme o projeto evolui.
