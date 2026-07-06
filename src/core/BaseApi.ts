import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiClient } from './ApiClient';
export class BaseApi {
   
  constructor(protected apiClient: ApiClient) {}
   

  protected get(url: string) {
    return this.apiClient.get(
        url,
        this.getHeaders()
    );
}
 protected post(url: string, body: any) {
    return this.apiClient.post(
        url,    
        body,
        this.getHeaders()
    );
}   

protected put(url: string, body: any) {
    return this.apiClient.put(
        url,            
        body,
        this.getHeaders()
    );
}       

protected delete(url: string) {
    return this.apiClient.delete(
        url,        
        this.getHeaders()
    );
}

protected getHeaders() {
    return {
      "Content-Type": "application/json",
"x-api-key": process.env.API_KEY || "",
      Accept: "application/json",
    };
  }
}
