import { PactV3 ,MatchersV3} from "@pact-foundation/pact";
import {test,expect, request} from "@playwright/test";
import { ApiManager } from "../../src/core/ApiManager";
const {like}=MatchersV3;




test("Get User with Pact", async ({ request }) => {
    const provider=new PactV3({
    consumer:"orderService",
    provider:"userService",
})
await provider.addInteraction({
    states:[{
        description:"User with id 2 exist"
    }],
 uponReceiving:"A request to get user with id 2",
withRequest:{
    method:"GET",
    path:"/users/2"
},
willRespondWith:{
    status: 200,
headers: {
      "Content-Type": "application/json",
    },
   body:{
        data:{
            id:like(2),
            email:like("Janet@example.com"),
            first_name:like("Janet"),
        }
    }

 
}
}).executeTest(async(mockServer)=>{
    console.log(mockServer);
    const api = new ApiManager(request,mockServer.url);
    const response=await api.user.getUser(2);
    expect(response.status()).toBe(200);
    const body=await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toContain("@");
    expect(body.data.first_name).toBeTruthy();
});
})
 
test("Get empty User with Pact", async ({ request }) => {
    const provider=new PactV3({
    consumer:"orderService",
    provider:"userService",
})
await provider.addInteraction({
    states:[{
        description:"User with id 999 does not exist"
    }],
 uponReceiving:"Get User - Not Found",
withRequest:{
    method:"GET",
    path:"/users/999"
},
willRespondWith:{
    status: 404,
headers: {
      "Content-Type": "application/json",
    },
   body: {
      error: like("User not found"),
    }
}
}).executeTest(async(mockServer)=>{
    console.log(mockServer);
    const api = new ApiManager(request,mockServer.url);
    const response=await api.user.getUser(999);
    expect(response.status()).toBe(404);
    const body=await response.json();
    //expect(body.error).toBe("");
    expect(body.error).toContain("User not found");
    //expect(body.data.first_name).toBeTruthy();
});
});




//await  provider.
