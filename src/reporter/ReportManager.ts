import { ContractReport, ContractResult } from "./ReportTypes";
import { ConsoleReporter } from "./ConsoleReporter";
import { HtmlReporter } from "./HtmlReporter";
import { JsonReporter } from "./JsonReporter";

export class ReportManager {

    private report: ContractReport = {

        generatedAt: new Date().toISOString(),

        total: 0,

        passed: 0,

        failed: 0,

        duration: 0,

        interactions: []

    };

    add(result: ContractResult) {

        this.report.total++;

        result.success
            ? this.report.passed++
            : this.report.failed++;

        this.report.duration += result.duration;

        this.report.interactions.push(result);

    }

    publish() {

        ConsoleReporter.print(this.report);

        JsonReporter.generate(this.report);

        HtmlReporter.generate(this.report);

    }

}