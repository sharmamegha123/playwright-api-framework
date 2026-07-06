import {APIRequestContext} from "@playwright/test";
import { BaseApi } from "../core/BaseApi";
import process from "process";
import { BASE_URL } from '../config/env';
import { ApiClient } from "../core/ApiClient";
import { CreateUserRequest } from "../models/CreateUserRequest";

export class UserApi extends BaseApi{
   private baseUrl = process.env.BASE_URL;

    constructor(apiClient: ApiClient) {
        super(apiClient);
    }
    async getUser(id:number){
        console.log("Base URL: ", BASE_URL + `/users/${id}`);
        return this.get(BASE_URL + `/users/${id}`);
    }

    async createUser(body:CreateUserRequest){
        console.log("Base URL: ", BASE_URL + `/users`);
return this.post(BASE_URL + `/users`,body);
    }
}