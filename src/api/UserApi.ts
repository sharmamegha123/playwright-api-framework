import {APIRequestContext} from "@playwright/test";
import { BaseApi } from "../core/BaseApi";
import process from "process";
import { BASE_URL } from '../config/env';
import { ApiClient } from "../core/ApiClient";
import { CreateUserResponse } from "../models/CreateUserResponse";
import { CreateUserRequest } from "../models/CreateUserRequest";
import { ApiResult } from "../core/ApiResult";

export class UserApi extends BaseApi{
   private baseUrl = process.env.BASE_URL;

    constructor(apiClient: ApiClient) {
        super(apiClient);
    }
    async getUser(id:number){
        console.log("Base URL: ", BASE_URL +"and path is :"+`/users/${id}`);
        return this.get(`/users/${id}`);
    }

    async createUser(body:CreateUserRequest): Promise<ApiResult<CreateUserResponse>> {
        console.log("Base URL post: ", BASE_URL + "and path is :"+`/users`);
        const response = await this.post( `/users`, body);
        return {
            status: response.status(),
            body: (await response.json()) as CreateUserResponse,
            headers: response.headers(),
        };
    }
}
