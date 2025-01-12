import prisma from '../server/prisma';
interface CreateBudget {
  responsavel: string
  cpfCnpj?: string
  cidade: string
  servicos: string[]
  localEvento: string
  dataEvento: Date
  telefone: string
  tipoEvento?: string
  email?: string
  descricao: string
  soundPlanId: number
  solicitacaoId: number
  observacoes: string
}

class CreateBudgetRepository {
  async findAll (): Promise<any> {
    const budgets = await prisma.budget.findMany({
      orderBy: {
        id: 'desc'
      }
    });
    return budgets;
  }

  async create (data: CreateBudget): Promise<any> {
    const createBudget = await prisma.budget.create({
      data: {
        dataEvento: data.dataEvento,
        responsavel: data.responsavel,
        cpfCnpj: data.cpfCnpj,
        localEvento: data.localEvento,
        tipoEvento: data.tipoEvento,
        servicos: data.servicos,
        telefone: data.telefone,
        email: data.email,
        descricao: data.descricao,
        observacoes: data.observacoes,
        soundPlanId: (typeof data.soundPlanId === 'number' && !isNaN(data.soundPlanId)) ? data.soundPlanId : undefined,
        solicitacaoId: data.solicitacaoId
      }
    });
    if (data.solicitacaoId !== undefined && data.solicitacaoId !== null && !isNaN(data.solicitacaoId) && data.solicitacaoId !== 0) {
      console.log('Solicitação ID:', data.solicitacaoId);
      await prisma.budget_request.update({
        where: {
          id: data.solicitacaoId
        },
        data: {
          budget_created: true
        }
      });
    }

    return createBudget;
  }
}

export const createBudgetRepository = new CreateBudgetRepository();
