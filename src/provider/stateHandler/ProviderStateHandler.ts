import { UserRepository } from "../repository/UserRepository";
import { ProviderStates } from "./ProviderState";

export class ProviderStateHandler {
  constructor(public readonly repository: UserRepository) {}

  getHandlers() {
    console.log("State handler repository:", this.repository.instanceId);
    return {
      [ProviderStates.USER_EXISTS]: async () => {
        console.log("Preparing provider state");
        this.repository.clear();

        this.repository.create({
          id: 2,
          first_name: "Janet",
          email: "Janet@example.com",
        });
        console.log("Repository after create", this.repository);
      },
      [ProviderStates.USER_NOT_FOUND]: async () => {
        this.repository.clear();
      },
    };
  }
}
