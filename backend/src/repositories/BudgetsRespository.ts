/* eslint-disable @typescript-eslint/explicit-function-return-type */
import prisma from '../server/prisma'

interface Budget {
  responsavel: string
  cnpj_cpf: string
  cidade: string
  tipo_servico: string[]
  data_evento: Date
  contato: string
  email: string
  descricao: string
}
// export const createCliente = async (data) => {
//   const cliente = await prisma.budget.create({
//     data
//   })
//   return cliente
// }

export const getAll = async () => {
  const clientes = await prisma.budget.findMany({})
  return clientes
}

class BugdetRepository {
  async findAll () {
    const budgets = await prisma.budget.findMany({})
    return budgets
  }

  async create (data: Budget) {
    const budget = await prisma.budget.create({
      data
    })
    return budget
  }
}

export const budgetRepository = new BugdetRepository()
