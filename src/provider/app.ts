import express from "express";
import { createUserRoutes } from "./routes/user.routes";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { userRepository } from "./repository/UserRepository";

const app = express();

const service = new UserService(userRepository);
export const controller = new UserController(service);

app.use(createUserRoutes(controller));

export default app;