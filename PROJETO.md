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

## Sistema de Cores (Tailwind)
- **primary**: Laranja principal (`#FF8800`)
- **secondary**: Preto secundário (`#222222`)
- **background**: Fundo escuro (`#181818`)
- **surface**: Superfície de cards (`#242424`)
- **text**: Texto claro (`#F5F5F5`), muted (`#B3B3B3`), onPrimary (`#181818`)
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
