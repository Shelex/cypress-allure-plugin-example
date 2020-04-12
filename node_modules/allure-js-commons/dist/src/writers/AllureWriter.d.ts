/// <reference types="node" />
import { Category, TestResult, TestResultContainer } from "../model";
import { IAllureWriter } from "./IAllureWriter";
import { IAllureConfig } from "../AllureConfig";
export declare class AllureWriter implements IAllureWriter {
    private config;
    constructor(config: IAllureConfig);
    private buildPath;
    writeAttachment(name: string, content: Buffer | string): void;
    writeEnvironmentInfo(info?: Record<string, string | undefined>): void;
    writeCategoriesDefinitions(categories: Category[]): void;
    writeGroup(result: TestResultContainer): void;
    writeResult(result: TestResult): void;
}
