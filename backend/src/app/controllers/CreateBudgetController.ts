import { createBudgetRepository } from '../../repositories/CreateBudgetRepository';
import { Request, Response } from 'express'

class CreateBudgetController {
    
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
            observacoes
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
                observacoes
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