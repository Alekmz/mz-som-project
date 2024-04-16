/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { budgetRepository } from '../../repositories/BudgetsRespository'
import { Request, Response } from 'express'
// export const create = async (req: Request, res: Response) => {
//   try {
//     const cliente = await createCliente(req.body)
//     res.status(200).send(cliente)
//   } catch (e) {
//     res.status(400).send(e)
//   }
// }

// export const get = async (req: Request, res: Response) => {
//   try {
//     const clientes = await getAll()
//     res.status(200).send(clientes)
//   } catch (e) {
//     console.info(e)
//     res.status(400).send(e)
//   }
// }

class BudgetController {
  async index () {
    try {
      const budgets = await budgetRepository.findAll()
      return budgets
    } catch (e) {
      console.log(e)
    }
  }

  async show () {}
  async store (request: Request, response: Response) {
    console.log('body', request.body)

    const {
      responsavel,
      cnpj_cpf,
      cidade,
      tipo_servico,
      data_evento,
      contato,
      email,
      descricao
    } = request.body
    try {
      await budgetRepository.create({
        responsavel,
        cnpj_cpf,
        cidade,
        tipo_servico,
        data_evento,
        contato,
        email,
        descricao
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
