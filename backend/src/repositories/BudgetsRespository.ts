/* eslint-disable @typescript-eslint/explicit-function-return-type */
import prisma from '../server/prisma';
interface Budget {
  responsavel: string
  cpf_cnpj?: string
  cidade: string
  servicos: string[]
  local_evento: string
  data_evento: Date
  telefone: string
  tipo_evento?: string
  email?: string
  descricao: string
}

export const getAll = async () => {
  const clientes = await prisma.budget_request.findMany({});
  return clientes;
};

class BugdetRepository {
  async findAll () {
    const budgets = await prisma.budget_request.findMany();
    return budgets;
  }

  async create (data: Budget) {
    const budget = await prisma.budget_request.create({
      data: {
        data_evento: data.data_evento,
        responsavel: data.responsavel,
        cpf_cnpj: data.cpf_cnpj,
        local_evento: data.local_evento,
        tipo_evento: data.tipo_evento,
        servicos: data.servicos,
        telefone: data.telefone,
        email: data.email,
        descricao: data.descricao
      }
    });
    return budget;
  }

  async findById (id: number) {
    const budget = await prisma.budget_request.findUnique({
      where: {
        id
      }
    });
    return budget;
  }
}

export const budgetRepository = new BugdetRepository();
