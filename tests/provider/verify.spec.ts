import { test } from "@playwright/test";
import { Verifier } from "@pact-foundation/pact";
import path from "path";
import { ProviderStateHandler } from "../../src/provider/stateHandler/ProviderStateHandler";
import { startServer } from "../../src/provider/server";
let server:any;

test.beforeAll(() => {
  server = startServer(3001);
});

test.afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
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