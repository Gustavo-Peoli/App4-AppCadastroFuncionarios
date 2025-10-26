# Configuração do Supabase e SQL para tabela `funcionarios`

Siga os passos abaixo para configurar o acesso ao Supabase e criar a tabela `funcionarios` com dados de exemplo.

## 1) Variáveis de ambiente

No arquivo `.env` (já existente no projeto), adicione as suas credenciais do Supabase:

```
NUXT_PUBLIC_SUPABASE_URL=SuaSupabaseUrlAqui
NUXT_PUBLIC_SUPABASE_KEY=SuaSupabaseAnonOrServiceKeyAqui
```

- `NUXT_PUBLIC_SUPABASE_URL`: URL pública do seu projeto Supabase (ex: https://xyzcompany.supabase.co)
- `NUXT_PUBLIC_SUPABASE_KEY`: Chave pública (anon) ou service_role (apenas para operações server-side). Em ambiente cliente use a `anon` key.

Depois de atualizar o `.env`, reinicie o servidor de desenvolvimento (se estiver rodando) para que o Nuxt carregue as novas variáveis.

---

## 2) SQL para criar a tabela `funcionarios`

Use o SQL abaixo no SQL Editor do Supabase (ou via psql) para criar a tabela:

```sql
create table public.funcionarios (
  id integer generated always as identity not null,
  nome text not null,
  cargo text null,
  endereco text null,
  email text null,
  salario numeric(10, 2) null,
  constraint funcionarios_pkey primary key (id),
  constraint funcionarios_email_key unique (email)
) TABLESPACE pg_default;
```

Observações:
- A constraint `funcionarios_email_key` garante que o e-mail seja único.
- Ajuste tipos e constraints conforme necessário para o seu projeto (indexes, foreign keys, etc.).

---

## 3) Exemplo de inserts (dados de exemplo)

Copie e cole no SQL Editor do Supabase para popular a tabela com alguns registros de exemplo:

```sql
insert into funcionarios (nome, cargo, endereco, email, salario) values
('João Pereira', 'Supervisor de Vendas', 'Rua das Acácias, 210 - Sorocaba/SP', 'joao.pereira@email.com', 5600.00),
('Fernanda Costa', 'Gerente de Projetos', 'Av. Rio Branco, 1550 - Rio de Janeiro/RJ', 'fernanda.costa@email.com', 9500.00),
('Ricardo Martins', 'Técnico em Manutenção', 'Rua Bela Vista, 88 - Belo Horizonte/MG', 'ricardo.martins@email.com', 4200.75),
('Patrícia Oliveira', 'Recursos Humanos', 'Rua Central, 302 - Curitiba/PR', 'patricia.oliveira@email.com', 5100.00),
('Gustavo Almeida', 'Desenvolvedor Full Stack', 'Av. Independência, 900 - Porto Alegre/RS', 'gustavo.almeida@email.com', 8700.00);
```

---

## 4) Notas finais

- Não versionar chaves sensíveis: mantenha o arquivo `.env` em `.gitignore`.
- Se usar chaves `service_role`, **nunca** as exponha no cliente — utilize-as apenas em ambiente server-side.
- Após criar a tabela e inserir os exemplos, atualize a interface do projeto (se necessário) e verifique se os composables e queries estão retornando os dados corretamente.

---

Arquivo gerado automaticamente pelo assistente para facilitar a configuração do banco.
