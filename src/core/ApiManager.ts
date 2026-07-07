import { APIRequestContext } from "@playwright/test";
import { UserApi } from "../api/UserApi";
import { ApiClient } from "./ApiClient";
import { BearerTokenAuth } from "../auth/BearerTokenAuth";
import { TokenManager } from "../auth/tokenManager";

export class ApiManager {
  public user: UserApi;
  constructor(private request: APIRequestContext) {
    const tokenManager= new TokenManager(); // You can implement a TokenManager class to manage your token
    const token=new BearerTokenAuth(tokenManager); // Replace
    const apiClient = new ApiClient(request,token);
    this.user = new UserApi(apiClient);
  }
}
