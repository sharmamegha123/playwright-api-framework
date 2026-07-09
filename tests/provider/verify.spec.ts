import { Verifier } from "@pact-foundation/pact";
import server from "../../src/provider/server";
import { test } from "@playwright/test";
import { UserRepository } from "../../src/provider/repository/UserRepository.ts";
import { ProviderStateHandler } from "../../src/provider/stateHandler/ProviderStateHandler.ts";
import path from "path";
//import { ProviderContext } from "../../src/provider/ProviderContext.ts";
import { context } from "../../src/provider/app.ts";

test.afterAll(async () => {
   server.close();
});
test("Verify User Service Pact", async () => {
    
    const states=new ProviderStateHandler(context.repository);
    await new Verifier({
        providerBaseUrl: "http://localhost:3001",
        pactUrls: [
    path.resolve("pacts/orderService-userService.json")],
        stateHandlers: states.getHandlers()
    }).verifyProvider();

});