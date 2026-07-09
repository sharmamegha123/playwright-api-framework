import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {

    constructor(private service: UserService) {}

    getUser = (req: Request, res: Response) => {

        console.log("GET USER API CALLED");
        console.log("Controller repository:", (this.service as any).repository.instanceId);
        const id = Number(req.params.id);

        const user = this.service.getUser(id);

        if (!user) {

            return res.status(404).json({

                error: "User not found"

            });

        }

        return res.json({

            data: user

        });

    }

}