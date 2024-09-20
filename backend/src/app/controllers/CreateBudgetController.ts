import { createBudgetRepository } from '../../repositories/CreateBudgetRepository'
import { Request, Response } from 'express'

class CreateBudgetController {
    async index (_: Request, response: Response) {
        try {
          const budgets = await createBudgetRepository.findAll()
          if (budgets.length === 0) return 'Sem dados!'
          return response.status(200).json(budgets)
        } catch (e) {
          console.log(e)
        }
      }
    async store(request: Request, response: Response) {
        const {
            responsavel,
            cpfCnpj,
            cidade,
            dataEvento,
            localEvento,
            tipoEvento,
            servicos,
            telefone,
            email,
            descricao,
            soundPlanId,
            observacoes,
            solicitacaoId
        } = request.body
        try {
            await createBudgetRepository.create({
                responsavel,
                cpfCnpj,
                cidade,
                dataEvento,
                localEvento,
                tipoEvento,
                servicos,
                telefone,
                email,
                descricao,
                soundPlanId,
                observacoes,
                solicitacaoId
            })
                .then(() => {
                    response
                        .status(200)
                        .json({ message: 'Orçamento criada com sucesso!' })
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    update() {
        // Update
    }

    delete() {
        // Delete
    }
}

const createBudgetController = new CreateBudgetController();

export { createBudgetController };