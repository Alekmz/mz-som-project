/* eslint-disable @typescript-eslint/explicit-function-return-type */
import prisma from '../server/prisma';
interface Department {
  name: string
}

class DepartmentRepository {
  async findAll () {
    const departments = await prisma.department.findMany();
    return departments;
  }

  async create (data: Department) {
    const department = await prisma.department.create({
      data: {
        name: data.name
      }
    });
    return department;
  }

  async findById (id: number) {
    const department = await prisma.department.findUnique({
      where: {
        id
      }
    });
    return department;
  }
}

export const departmentRepository = new DepartmentRepository();
