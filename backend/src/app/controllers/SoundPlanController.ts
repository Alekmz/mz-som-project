/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { soundPlanRepository } from '../../repositories/SoundPlanRepository';
import { Request, Response } from 'express';
import {  equipmentsPlanRepository } from './EquipmentsPlan';

class SoundPlanController {
  async store (request: Request, response: Response) {
    try {
      const { name, valor_plano, equipments } = request.body;
      const soundPlan = await soundPlanRepository.create({
        name,
        valor_plano,
      });

      for (const equipment of equipments) {
        await equipmentsPlanRepository.create({
          amount: equipment.amount,
          sound_plan_id: soundPlan.id,
          equipment_id: equipment.equipment_id,
        });
      }
      return response.status(201).json(soundPlan);
    } catch (error) {
      console.error('Erro ao criar o plano de som:', error);
      return response
        .status(500)
        .json({ message: 'Erro ao criar o plano de som' });
    }
  }

  async index (_: Request, response: Response) {
    try {
      const soundPlans = await soundPlanRepository.findAll();

      // Se não houver soundPlans, retornar uma mensagem adequada com status 204 ou 404
      if (soundPlans.length === 0) {
        return response
          .status(404)
          .json({ message: 'Nenhum plano de som encontrado!' });
      }

      // Se houver dados, retornar com status 200
      return response.status(200).json(soundPlans);
    } catch (error) {
      console.error('Erro ao buscar sound plans:', error);

      // Retornar uma resposta de erro no caso de exceção
      return response
        .status(500)
        .json({ message: 'Erro ao buscar os planos de som' });
    }
  }

  async show (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const soundPlanAllEquipments =
        await soundPlanRepository.findByIdWithEquipments(Number(id));

      soundPlanAllEquipments
        ? response.status(200).json(soundPlanAllEquipments)
        : response
          .status(404)
          .json({ message: `Plano de som com ID ${id} não encontrado` });
    } catch (error) {
      console.error('Erro ao buscar plano de som:', error);
      // Retornar erro no caso de exceção
      return response
        .status(500)
        .json({ message: 'Erro ao buscar plano de som', error });
    }
  }

  async delete (request: Request, response: Response) {
    try {
      const { id } = request.params;
      await soundPlanRepository.delete(Number(id));

      return response.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar o plano de som:', error);
      return response
        .status(500)
        .json({ message: 'Erro ao deletar o plano de som', error });
    }
  }
}

export const soundPlanController = new SoundPlanController();
