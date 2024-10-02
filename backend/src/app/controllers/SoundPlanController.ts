import { soundPlanRepository } from "../../repositories/SoundPlanRepository";
import { Request, Response } from "express";

class SoundPlanController {
    async index (_: Request, response: Response) {
        try {
            const soundPlans = await soundPlanRepository.findAll();
            
            // Se não houver soundPlans, retornar uma mensagem adequada com status 204 ou 404
            if (soundPlans.length === 0) {
                return response.status(404).json({ message: 'Nenhum plano de som encontrado!' });
            }



            // Se houver dados, retornar com status 200
            return response.status(200).json(soundPlans);

        } catch (error) {
            console.error('Erro ao buscar sound plans:', error);
            
            // Retornar uma resposta de erro no caso de exceção
            return response.status(500).json({ message: 'Erro ao buscar os planos de som' });
        }
    }

    async show (request: Request, response: Response){
        try {
            const {id} = request.params;
            const soundPlanAllEquipments = await soundPlanRepository.findByIdWithEquipments(Number(id));

            soundPlanAllEquipments ? response.status(200).json(soundPlanAllEquipments)
            : response.status(404).json({ message: `Plano de som com ID ${id} não encontrado` });

        } catch (error) {
            console.error('Erro ao buscar plano de som:', error);
            // Retornar erro no caso de exceção
            return response.status(500).json({ message: 'Erro ao buscar plano de som', error });
        }
    }
}

export const soundPlanController = new SoundPlanController();