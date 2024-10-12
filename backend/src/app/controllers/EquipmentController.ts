/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { equipmentRepository } from '../../repositories/EquipmentsRepository'
import { Request, Response } from 'express'

class EquipmentController {
  async index (_: Request, response: Response) {
    try {
      const equipments = await equipmentRepository.findAll();

      // Se não houver dados, retorna um status 204 (sem conteúdo) ou 404 se preferir.
      if (equipments.length === 0) {
        return response.status(200).send([]); // Status 204: Sem conteúdo
      }

      // Caso haja dados, retorna com status 200 e os dados
      return response.status(200).json(equipments);
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);

      // Retorna uma resposta de erro com status 500 e a mensagem de erro
      return response.status(500).json({
        message: 'Erro ao buscar equipamentos',
        error: error
      });
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
