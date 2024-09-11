import prisma from "../server/prisma";
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
    observacoes: string
}

class CreateBudgetRepository {
    async findAll () {
        const budgets = await prisma.budget.findMany({
            orderBy: {
                id: 'desc',
            }
        });
        return budgets;
    }

    async create(data: CreateBudget) {
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
                observacoes: data.observacoes, // Incluindo campo 'observacoes'
                soundPlanId: data.soundPlanId || undefined,
            }
        });
        return createBudget;
    }
}

export const createBudgetRepository = new CreateBudgetRepository();
