import { test } from "@playwright/test";

import { ProviderStateHandler } from "../../src/provider/stateHandler/ProviderStateHandler";
import { startServer } from "../../src/provider/server";

import { ContractRunner } from "../../src/runner/ContractRunner";
let server:any;

test.beforeAll(() => {
  server = startServer(3001);
});

test.afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});


test("Verify User Service Pact", async () => {
  
try {

        await ContractRunner.verify({

            providerBaseUrl: "http://localhost:3001",

            pactFiles: [

                "pacts/orderService-userService.json"

            ],
            stateHandlers: new ProviderStateHandler().getHandlers()

        });

    }

    finally {

        server.close();

    }


  });


  //server.close();