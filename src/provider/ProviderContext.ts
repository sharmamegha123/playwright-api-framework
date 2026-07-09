import { UserController } from "./controllers/UserController";
import { UserRepository } from "./repository/UserRepository";
import { UserService } from "./services/UserService";

export class ProviderContext {

    public readonly repository: UserRepository;

    public readonly service: UserService;

    public readonly controller: UserController;

    constructor() {

        console.log("Creating ProviderContext");
        this.repository = new UserRepository();

        this.service = new UserService(this.repository);

        this.controller = new UserController(this.service);

    }
    

}export const providerContext = new ProviderContext();