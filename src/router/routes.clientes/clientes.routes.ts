import { Application } from "express";
import { create, get } from "../../controllers/cliente.controller";

export const userRoutes = (app: Application) => {
    app.post("/cliente", create);
    app.get("/cliente", get);
}