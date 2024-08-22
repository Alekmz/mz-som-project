/* eslint-disable @typescript-eslint/explicit-function-return-type */
import prisma from '../server/prisma';

interface FileCreateData {
  name: string
  url: string
}

export const createFile = async (data: FileCreateData) => {
  return await prisma.file.create({ data });
};
