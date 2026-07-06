import { CreateUserRequest } from "../models/CreateUserRequest";
import { faker } from "@faker-js/faker";
export class UserBuilder {
  private user: CreateUserRequest;
  constructor() {
    this.user = {
      name: faker.person.firstName(),
      job: faker.person.jobTitle(),
    };
  }

  withName(name: string): UserBuilder {
    this.user.name = name;
    return this;
  }

  withJob(job: string): UserBuilder {
    this.user.job = job;
    return this;
  }

  build(): CreateUserRequest {
    return this.user;
  }
}
