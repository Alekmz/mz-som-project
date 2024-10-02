import prisma from '../server/prisma';
interface SoundPlan {
    id: number
    name: string
    caminhao: string
    departmentId: number
    valor_plano: number
}

class SoundPlanRepository {
    async findAll() {
        const soundPlans = await prisma.soundPlans.findMany();
        return soundPlans;
    }

    // Método para buscar um SoundPlan por ID, incluindo os equipamentos relacionados ao departmentId
    async findByIdWithEquipments(id: number) {
    try {
        const soundPlanWithEquipments = await prisma.soundPlans.findUnique({
            where: { id },
            include: {
                department: {
                    include: {
                        equipments: true,  // Inclui os equipamentos associados ao departmentId
                    }
                }
            }
        });
        return soundPlanWithEquipments;
    } catch (error) {
        console.error('Error fetching sound plan with equipments:', error);
        throw new Error('Failed to fetch sound plan with equipments');
    }
}
}

export const soundPlanRepository = new SoundPlanRepository();