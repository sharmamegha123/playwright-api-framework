import fs from "fs";
import path from "path";
import { ContractReport } from "./ReportTypes";

export class JsonReporter {

    static generate(report: ContractReport) {

        fs.mkdirSync(path.resolve("reports"), {
            recursive: true,
        });

        fs.writeFileSync(

            path.resolve(
                "reports",
                "contract-report.json"
            ),

            JSON.stringify(report, null, 4)

        );

    }

}