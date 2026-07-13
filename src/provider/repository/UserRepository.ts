export interface User {

    id: number;
    first_name: string;
    email: string;

}

export class UserRepository {

    public readonly instanceId = Math.random();

    private users = new Map<number, User>();

    constructor() {
        console.log("Repository created:", this.instanceId);
    }

    create(user: User) {

       console.log("Creating", user);
    this.users.set(user.id, user);
    }

    findById(id: number) {
console.log("Current repository", this.users);
        return this.users.get(id);

    }

    delete(id: number) {

        this.users.delete(id);

    }

    clear() {

        this.users.clear();

    }

}export const userRepository = new UserRepository();