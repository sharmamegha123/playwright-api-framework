import path from "path";
import { Verifier } from "@pact-foundation/pact";

import { PactParser } from "../parser/PactParser";
import { ReportManager } from "../reporter/ReportManager";

export interface ContractRunnerOptions {

    providerBaseUrl: string;

    pactFiles: string[];

    stateHandlers: any;

}

export class ContractRunner {

    static async verify(options: ContractRunnerOptions) {

        const reportManager = new ReportManager();

        try {

            for (const pactFile of options.pactFiles) {

                const verifierResult:any = await new Verifier({

                    providerBaseUrl: options.providerBaseUrl,

                    pactUrls: [
                        path.resolve(pactFile)
                    ],

                    stateHandlers: options.stateHandlers

                }).verifyProvider();

                const pact = PactParser.parse(pactFile);

                for (const interaction of pact.interactions) {

                    const verification =
                        (verifierResult as any).interactionResults.find(
                            (r: any) =>
                                r.description === interaction.description
                        );

                    reportManager.add({

                        consumer: pact.consumer,

                        provider: pact.provider,

                        description: interaction.description,

                        method: interaction.method,

                        path: interaction.path,

                        state: interaction.state,

                        expectedStatus: interaction.expectedStatus,

                        success: verification?.result === "OK",

                        duration: verification?.duration ?? "0ms",

                        error: verifierResult.errors.join("\n")

                    });

                }

            }

        } catch (error: any) {

            console.error(error);

            throw error;

        } finally {

            reportManager.publish();

        }

    }

}