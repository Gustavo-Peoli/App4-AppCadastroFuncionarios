export interface Funcionario {
  id: number
  nome: string
  cargo: string | null
  endereco: string | null
  email: string | null
  salario: number | null
}

export type FuncionarioInput = Omit<Funcionario, 'id'>

export type FuncionarioUpdate = Partial<FuncionarioInput> & { id: number }