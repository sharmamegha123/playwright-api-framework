import { userRepository } from "../repository/UserRepository";
import { ProviderStates } from "./ProviderState";

export class ProviderStateHandler {
  getHandlers() {
    return {
      [ProviderStates.USER_EXISTS]: async () => {
        userRepository.clear();

        userRepository.create({
          id: 2,
          full_name: "Janet",
          email: "Janet@example.com",
        });
      },

      [ProviderStates.USER_NOT_FOUND]: async () => {
        userRepository.clear();
      },
    };
  }
}