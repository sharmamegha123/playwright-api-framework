import { test } from "@playwright/test";
import { Verifier } from "@pact-foundation/pact";
import path from "path";
import server from "../../src/provider/server";
import { ProviderStateHandler } from "../../src/provider/stateHandler/ProviderStateHandler";

test.afterAll(() => {
  server.close();
});

test("Verify User Service Pact", async () => {
  const states = new ProviderStateHandler();

  await new Verifier({
    providerBaseUrl: "http://localhost:3001",
    pactUrls: [path.resolve("pacts/orderService-userService.json")],
    stateHandlers: states.getHandlers(),
  }).verifyProvider();
});