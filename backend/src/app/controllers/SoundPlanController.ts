import { soundPlanRepository } from "../../repositories/SoundPlanRepository";
import { Request, Response }  from "express";

class SoundPlanController {
    async index (_: Request, response: Response){
        try{
            const soundPlans = await soundPlanRepository.findAll()
            if (soundPlans.length === 0) return 'Sem dados!'
            return response.status(200).json(soundPlans)
        }catch (e){
            console.log(e)
        }
    }
}

export const soundPlanController = new SoundPlanController();