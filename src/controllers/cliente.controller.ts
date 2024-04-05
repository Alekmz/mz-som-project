import { createCliente, getAll } from "../repositorys/cliente.respositorys";
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
    try {
        const cliente = await createCliente(req.body);
        res.status(200).send(cliente);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const clientes = await getAll();
        res.status(200).send(clientes);
    } catch (e) {
        res.status(400).send(e);
    }
}
