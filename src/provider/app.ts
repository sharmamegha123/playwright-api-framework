import express from "express";

import { UserRepository } from "./repository/UserRepository";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { createUserRoutes } from "./routes/user.routes";
import { ProviderContext } from "./ProviderContext";



const app = express();

export const context = new ProviderContext();

app.use(createUserRoutes(context.controller));


export default app;