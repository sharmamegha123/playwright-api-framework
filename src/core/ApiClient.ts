import {APIRequestContext, APIResponse} from "@playwright/test";
import { AuthenticationProvider } from "../auth/AuthenticationProvider";

export class ApiClient {

    constructor(private request:APIRequestContext,
        private authProvider:AuthenticationProvider,private baseUrl: string) {}
    

    async get(url:string ,headers?:Record<string,string>):Promise<APIResponse>{
    
        console.log(`Get from api client:${url}`);
        const start=Date.now();
        const header=await this.authProvider?.getHeaders()??{};
        const response=await this.request.get(this.baseUrl+url,{headers:headers});
        const duration=Date.now()-start;
        console.log(`Time: ${duration} ms`);
        console.log(`Response: ${JSON.stringify(await response.json())}`);
        return response;
    }

   

  
    async post(url:string,body:any,headers?:Record<string,string>):Promise<APIResponse>{
    
        console.log(`Post:${url}`);
        console.log(`Body: ${JSON.stringify(body)}`);
        const start=Date.now();
        const response=await this.request.post(this.baseUrl+url,{data:body,headers:headers});
        const duration=Date.now()-start;
        console.log(`Time: ${duration} ms`);
        return response;
    }

  async put(url:string,body:any,headers?:Record<string,string>):Promise<APIResponse>{
        console.log(`Put:${url}`);
        console.log(`Body: ${JSON.stringify(body)}`);
        const start=Date.now();
        const response=await this.request.put(url,{data:body,headers:headers});
        const duration=Date.now()-start;
        console.log(`Time: ${duration} ms`);

        return response;
    }   

    async delete(url:string,headers?:Record<string,string>):Promise<APIResponse>{
        console.log(`Delete:${url}`);
        const start=Date.now();
        const response=await this.request.delete(url,{headers:headers});
        const duration=Date.now()-start;
        console.log(`Time: ${duration} ms`);
        return response;
    }
}
