import chalk from "chalk";
import boxen from "boxen";
import { ContractReport } from "./ReportTypes";

export class ConsoleReporter {

    static print(report: ContractReport) {

        console.clear();

        console.log(
            boxen(

`${chalk.cyanBright.bold("CONTRACT VERIFICATION REPORT")}

Generated : ${report.generatedAt}

Passed : ${chalk.green(report.passed)}

Failed : ${chalk.red(report.failed)}

Total : ${report.total}

Duration : ${report.duration} ms
`,

                {

                    padding:1,

                    borderColor:"cyan"

                }

            )
        );

        report.interactions.forEach(i=>{

            console.log(

                boxen(

`${i.success?"✅":"❌"} ${i.method} ${i.path}

Consumer : ${i.consumer}

Provider : ${i.provider}

State : ${i.state}

Expected : ${i.expectedStatus}

Time : ${i.duration} ms

${i.error??""}
`,

{

padding:1,

borderColor:i.success?"green":"red"

}

                )

            );

        });

    }

}