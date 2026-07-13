export interface ContractResult {

    consumer: string;

    provider: string;

    description: string;

    state: string;

    method: string;

    path: string;

    expectedStatus: number;

    success: boolean;

    duration: number;

    error?: string;

}

export interface ContractReport {

    generatedAt: string;

    total: number;

    passed: number;

    failed: number;

    duration: number;

    interactions: ContractResult[];

}