import fs from "fs";
import path from "path";
import { ContractReport } from "./ReportTypes";

export class HtmlReporter {

    static generate(report: ContractReport) {

        const rows = report.interactions.map(i => `

<tr>

<td>${i.success ? "✅" : "❌"}</td>

<td>${i.method}</td>

<td>${i.path}</td>

<td>${i.expectedStatus}</td>

<td>${i.duration} ms</td>

<td>${i.state}</td>

</tr>

`).join("");

        const html = `

<html>

<head>

<title>Contract Report</title>

<style>

body{

font-family:Arial;

padding:40px;

background:#f4f6f8;

}

table{

width:100%;

border-collapse:collapse;

}

th{

background:#1565c0;

color:white;

padding:12px;

}

td{

padding:12px;

border:1px solid #ddd;

}

.card{

display:inline-block;

padding:20px;

margin-right:20px;

background:white;

box-shadow:0 2px 6px rgba(0,0,0,.15);

border-radius:10px;

min-width:140px;

}

</style>

</head>

<body>

<h1>Contract Verification Report</h1>

<div class="card">

<h3>Total</h3>

${report.total}

</div>

<div class="card">

<h3>Passed</h3>

${report.passed}

</div>

<div class="card">

<h3>Failed</h3>

${report.failed}

</div>

<div class="card">

<h3>Duration</h3>

${report.duration} ms

</div>

<br><br>

<table>

<tr>

<th>Status</th>

<th>Method</th>

<th>Path</th>

<th>Expected</th>

<th>Duration</th>

<th>Provider State</th>

</tr>

${rows}

</table>

</body>

</html>

`;

        fs.mkdirSync(path.resolve("reports"), {

            recursive:true

        });

        fs.writeFileSync(

            path.resolve(
                "reports",
                "contract-report.html"
            ),

            html

        );

    }

}