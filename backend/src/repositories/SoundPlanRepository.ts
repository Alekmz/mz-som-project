/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import prisma from '../server/prisma';
interface SoundPlan {
  name: string
  valor_plano: number
}

class SoundPlanRepository {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async findAll () {
    const soundPlans = await prisma.soundPlans.findMany();
    return soundPlans;
  }

  async create (data: SoundPlan) {
    const soundPlan = await prisma.soundPlans.create({
      data: {
        name: data.name,
        valor_plano: data.valor_plano
      }
    });
    return soundPlan;
  }

  async delete (id: number) {
    await prisma.equipmentsPlan.deleteMany({
      where: { sound_plan_id: id }
    });
    return await prisma.soundPlans.delete({
      where: { id }
    });
  }

  // Método para buscar um SoundPlan por ID, incluindo os equipamentos relacionados ao departmentId
  async findByIdWithEquipments (id: number) {
    try {
      // Buscar o plano de som e incluir os equipamentos associados
      const soundPlanWithEquipments = await prisma.soundPlans.findUnique({
        where: { id },
        include: {
          equipmentsPlan: { // Assumindo que esta é a tabela de relação entre planos e equipamentos
            include: {
              equipments: {
                select: {
                  name: true,
                  amount: true,
                  departmentId: true,  // Inclui o departmentId do equipamento
                  department: {
                    select: { name: true }  // Inclui o nome da categoria
                  }
                }
              }
            }
          }
        }
      });

      if (!soundPlanWithEquipments) {
        throw new Error(`Sound plan with id ${id} not found.`);
      }

      // Organizar os equipamentos por categoria e departamento
      const equipamentosSeparadosPorCategoria = soundPlanWithEquipments.equipmentsPlan.reduce((acc, item) => {
        const { name, amount, departmentId, department } = item.equipments;
        const categoriaNome = department.name as any;

        // Se a categoria ainda não existe no resultado, inicializa como array vazio
        // @ts-expect-error
        if (!acc[categoriaNome]) {
          // @ts-expect-error
          acc[categoriaNome] = [];
        }

        // Adiciona o equipamento e sua quantidade à categoria correspondente
        // @ts-expect-error
        acc[categoriaNome].push({ name, amount, departmentId });
        return acc;
      }, {});

      return {
        nome: soundPlanWithEquipments.name,  // Nome do plano de som
        valor: soundPlanWithEquipments.valor_plano,  // Valor do plano de som
        equipamentos: equipamentosSeparadosPorCategoria  // Equipamentos agrupados
      };
    } catch (error) {
      console.error('Error fetching sound plan with equipments:', error);
      throw new Error('Failed to fetch sound plan with equipments');
    }
  }
}

export const soundPlanRepository = new SoundPlanRepository();
