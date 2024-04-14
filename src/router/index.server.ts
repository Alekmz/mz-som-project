import { Application } from 'express';
import { userRoutes } from "../router/routes.clientes/clientes.routes";

export default (app: Application) => {
    userRoutes(app);
};