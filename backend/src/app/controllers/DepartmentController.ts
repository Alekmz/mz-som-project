/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { departmentRepository } from '../../repositories/DepartmentsRepository'
import { Request, Response } from 'express'

class DepartmentController {
  async index (_: Request, response: Response) {
    try {
      const departments = await departmentRepository.findAll()
      if (departments.length === 0) return 'Sem dados!'
      return response.status(200).json(departments)
    } catch (e) {
      console.log(e)
    }
  }

  async show (req: Request, res: Response) {
    console.log(req.params.id)
    const department = await departmentRepository.findById(Number(req.params.id))
    console.log(department)
    if (!department) return res.status(404).json({ error: 'Departamento não encontrado!' })
    return res.status(200).json(department)
  }

  async store (request: Request, response: Response) {
    const {
      name
    } = request.body
    try {
      await departmentRepository
        .create({
          name
        })
        .then(() => {
          response
            .status(200)
            .json({ message: 'Departamento criado com sucesso!' })
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

export const departmentController = new DepartmentController()
