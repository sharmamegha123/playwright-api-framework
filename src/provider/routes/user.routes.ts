import { Router } from "express";
import { UserController } from "../controllers/UserController";

export function createUserRoutes(controller: UserController){

    const router = Router();

    router.get("/users/:id", controller.getUser);

    return router;

}