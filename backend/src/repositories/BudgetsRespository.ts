/* eslint-disable @typescript-eslint/explicit-function-return-type */
import prisma from '../server/prisma'
import { Prisma } from '@prisma/client'

export const createCliente = async (data) => {
  const cliente = await prisma.clienteEvento.create({
    data
  })
  return cliente
}

export const getAll = async () => {
  const clientes = await prisma.clienteEvento.findMany({})
  return clientes
}

class BugdetRepository {
  async findAll () {
    const budgets = await prisma.clienteEvento.findMany({})
    return budgets
  }

  async create (data) {
    const budget = await prisma.clienteEvento.create({
      data
    })
    return budget
  }
}

export const budgetRepository = new BugdetRepository()
