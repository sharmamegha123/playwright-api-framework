import fs from "fs";

export class PactParser {

    static parse(file: string) {

        const pact = JSON.parse(
            fs.readFileSync(file, "utf-8")
        );

        return {

            consumer: pact.consumer.name,

            provider: pact.provider.name,

            interactions: pact.interactions.map((i: any) => ({

                description: i.description,

                state: i.providerStates?.[0]?.name ?? "",

                method: i.request.method,

                path: i.request.path,

                expectedStatus: i.response.status

            }))

        };

    }

}