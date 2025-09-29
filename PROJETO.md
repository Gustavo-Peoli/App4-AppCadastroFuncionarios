# Documentação do Projeto: Sistema Cadastro

## Estrutura de Pastas

```
app/
  components/      # Componentes Vue reutilizáveis (AppButton, AppInput, AppHeader, AppFooter)
  layouts/         # Layouts do Nuxt (default.vue)
  pages/           # Páginas do sistema (Index.vue, NovoCadastro.vue)
  app.vue          # Arquivo principal do Nuxt
public/            # Arquivos públicos (favicon, robots.txt)
tailwind.config.js # Configuração do Tailwind CSS
nuxt.config.ts     # Configuração do Nuxt
package.json       # Dependências do projeto
```

## Dependências Instaladas
- Nuxt 4
- Tailwind CSS (módulo oficial)
- @headlessui/vue (componentes acessíveis)
- @heroicons/vue (ícones SVG)
- @supabase/supabase-js (backend e autenticação)

## Configuração do Projeto
- **SPA**: SSR desabilitado (`ssr: false` no `nuxt.config.ts`)
- **Supabase**: Plugin criado em `app/plugins/supabase.client.js` e acessível globalmente via `useNuxtApp().$supabase`
- **Variáveis de ambiente**: `.env` com `NUXT_PUBLIC_SUPABASE_URL` e `NUXT_PUBLIC_SUPABASE_KEY` (não versionado)
- **Runtime Config**: Configurado no `nuxt.config.ts` para expor variáveis públicas do Supabase

## Autenticação
- Composable `useAuth.js` em `app/composables` para login com Supabase
- Login integrado ao formulário de login (`LoginForm.vue`)

## Sistema de Cores (Tailwind)
- **primary**: Laranja principal (`#FF8800`)
- **secondary**: Preto secundário (`#222222`)
- **background**: Fundo claro padrão (`#F7F9FD`), escuro (`#181818`)
- **surface**: Superfície de cards (`#242424`)
- **text**: Texto escuro (`#222222`), muted (`#B3B3B3`), onPrimary (`#F5F5F5`)
- **accent**: Laranja de destaque (`#FFB300`)
- **border**: Cor de borda (`#333333`)

## Padrão de Componentes
- Nomes em PascalCase (ex: AppButton, AppInput, AppHeader, AppFooter)
- Imports explícitos
- Estilização usando classes do Tailwind e sistema de cores

## Layouts
- `default.vue`: Inclui `AppHeader` no topo e `AppFooter` na base
- Para usar outro layout, crie em `app/layouts` e defina com `definePageMeta({ layout: 'nome' })` no `<script setup>` da página

## Como adicionar novas páginas
- Crie arquivos `.vue` em `app/pages` usando PascalCase
- Por padrão, todas usam o layout `default.vue`

## Como adicionar novos componentes
- Crie arquivos `.vue` em `app/components` usando PascalCase
- Importe explicitamente nos layouts ou páginas

## Observações
- O arquivo `tailwind.config.js` pode ser ajustado para adicionar mais cores ou plugins
- O arquivo `nuxt.config.ts` gerencia módulos e configurações globais

---

Este arquivo pode ser atualizado conforme o projeto evolui. Se quiser adicionar mais informações, só pedir!
