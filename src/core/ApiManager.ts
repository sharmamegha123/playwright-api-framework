import { APIRequestContext } from "@playwright/test";
import { UserApi } from "../api/UserApi";
import { ApiClient } from "./ApiClient";

export class ApiManager {
  public user: UserApi;
  constructor(private request: APIRequestContext) {
    const apiClient = new ApiClient(request);
    this.user = new UserApi(apiClient);
  }
}
