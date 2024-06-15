/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { budgetRepository } from '../../repositories/BudgetsRespository'
import { Request, Response } from 'express'

class BudgetController {
  async index (_: Request, response: Response) {
    try {
      const budgets = await budgetRepository.findAll()
      if (budgets.length === 0) return 'Sem dados!'
      return response.status(200).json(budgets)
    } catch (e) {
      console.log(e)
    }
  }

  async show (req: Request, res: Response) {
    console.log(req.params.id)
    const budget = await budgetRepository.findById(Number(req.params.id))
    console.log(budget)
    if (!budget) return res.status(404).json({ error: 'Orçamento não encontrado!' })
    return res.status(200).json(budget)
  }

  async store (request: Request, response: Response) {
    const {
      responsavel,
      cpf_cnpj,
      cidade,
      data_evento,
      local_evento,
      tipo_evento,
      servicos,
      telefone,
      email,
      descricao
    } = request.body
    try {
      await budgetRepository
        .create({
          responsavel,
          cpf_cnpj,
          cidade,
          data_evento,
          email,
          local_evento,
          tipo_evento,
          servicos,
          telefone,
          descricao
        })
        .then(() => {
          response
            .status(200)
            .json({ message: 'Orçamento criado com sucesso!' })
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  update () {
    // Update
  }

  delete () {
    // Delete
  }
}

export const budgetController = new BudgetController()
