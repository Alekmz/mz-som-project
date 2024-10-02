import prisma from '../server/prisma';

export const getAll = async () => {
    const department = await prisma.department.findMany({});
    return department;
}