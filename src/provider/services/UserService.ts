import { UserRepository } from "../repository/UserRepository";

export class UserService {

    constructor(private repository: UserRepository) {}

    getUser(id: number) {

        return this.repository.findById(id);

    }

}