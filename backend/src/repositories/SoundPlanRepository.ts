import prisma from '../server/prisma';
interface SoundPlan {
    id: number
    name: string
    caminhao: string
    departmentId: number
    valor_plano: number
}

class SoundPlanRepository {
    async findAll () {
        const soundPlans = await prisma.soundPlans.findMany();
        return soundPlans;
    }
}

export const soundPlanRepository = new SoundPlanRepository();