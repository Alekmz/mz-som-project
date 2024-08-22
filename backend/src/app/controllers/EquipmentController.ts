/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { equipmentRepository } from '../../repositories/EquipmentsRepository'
import { Request, Response } from 'express'

class EquipmentController {
  async index (_: Request, response: Response) {
    try {
      const equipments = await equipmentRepository.findAll()
      if (equipments.length === 0) return 'Sem dados!'
      return response.status(200).json(equipments)
    } catch (e) {
      console.log(e)
    }
  }

  async show (req: Request, res: Response) {
    console.log(req.params.id)
    const equipment = await equipmentRepository.findById(Number(req.params.id))
    console.log(equipment)
    if (!equipment) return res.status(404).json({ error: 'Equipamento não encontrado!' })
    return res.status(200).json(equipment)
  }

  async store (request: Request, response: Response) {
    const {
      name,
      amount,
      departmentId
    } = request.body
    try {
      await equipmentRepository
        .create({
          name,
          amount,
          departmentId
        })
        .then(() => {
          response
            .status(200)
            .json({ message: 'Equipamento criado com sucesso!' })
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  async getEquipmentsByDepartment (req: Request, res: Response) {
    const departmentId = Number(req.params.departmentId);
    const equipments = await equipmentRepository.getEquipmentsByDepartmentId(departmentId);
    res.json(equipments);
  }

  update () {
    // Update
  }

  delete () {
    // Delete
  }
}

export const equipmentController = new EquipmentController()
