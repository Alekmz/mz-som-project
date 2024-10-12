/* eslint-disable @typescript-eslint/explicit-function-return-type */
import prisma from '../server/prisma';
interface Department {
  name: string
  departmentId: number
  amount: number
}

class EquipmentRepository {
  async getEquipmentsByDepartmentId (departmentId: number) {
    return await prisma.equipment.findMany({
      where: {
        departmentId
      },
      include: {
        department: {
          select: {
            name: true
          }
        }
      }
    });
  }

  async findAll() {
    try {
      const equipments = await prisma.equipment.findMany({
        include: {
          department: {
            select: {
              name: true
            }
          }
        }
      });

      // Verifica se o resultado está vazio
      if (equipments.length === 0) {
        return []; // Retorna um array vazio caso não haja registros
      }

      return equipments;
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
      throw new Error('Erro ao buscar equipamentos');
    }
  }

  async create (data: Department) {
    const equipment = await prisma.equipment.create({
      data: {
        name: data.name,
        departmentId: data.departmentId,
        amount: data.amount
      }
    });
    return equipment;
  }

  async findById (id: number) {
    const equipment = await prisma.equipment.findUnique({
      where: {
        id
      }
    });
    return equipment;
  }
}

export const equipmentRepository = new EquipmentRepository();
