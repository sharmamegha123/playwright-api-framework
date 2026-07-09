import { test } from "@playwright/test";
import { Verifier } from "@pact-foundation/pact";
import path from "path";
import { ProviderStateHandler } from "../../src/provider/stateHandler/ProviderStateHandler";
import server from "../../src/provider/server";
test.beforeAll(async () => {
 const serverModule = await import("../../src/provider/server");

//console.log("server module:"+ serverModule.);
console.log("server module: default"+serverModule.default);
console.log("type of"+typeof serverModule.default);
});

test.afterAll(async () => {
  // close server if needed
  //server.close()
});


  test("Verify User Service Pact", async () => {
  

  
    const states = new ProviderStateHandler();

    await new Verifier({
      providerBaseUrl: "http://localhost:3001",
      pactUrls: [
        path.resolve("pacts/orderService-userService.json"),
      ],
      stateHandlers: states.getHandlers(),
    }).verifyProvider();
  } );


  //server.close();