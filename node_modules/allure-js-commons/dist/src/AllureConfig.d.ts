import { TestResult } from "./model";
import { IAllureWriter } from "./writers";
export interface IAllureConfig {
    readonly resultsDir: string;
    readonly writer?: IAllureWriter;
    readonly testMapper?: (test: TestResult) => TestResult | null;
}
export declare class AllureConfig implements IAllureConfig {
    readonly resultsDir: string;
    readonly testMapper?: ((test: TestResult) => TestResult | null) | undefined;
    readonly writer?: IAllureWriter | undefined;
    constructor(resultsDir?: string, testMapper?: ((test: TestResult) => TestResult | null) | undefined, writer?: IAllureWriter | undefined);
}
