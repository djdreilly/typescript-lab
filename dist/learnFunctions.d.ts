import { DegreesCelsius, DegreesFahrenheit, OptionalNum } from "./learnTypes.ts";
export declare function convertCToF(celsius: DegreesCelsius): DegreesFahrenheit;
export declare function strToNum(numText: string): OptionalNum;
export type ScalarOp = (a: number) => number;
export declare function transformNums(nums: readonly number[], // 'readonly' means you can't mutate the array that 'nums' is bound to.
transform: ScalarOp): number[];
export declare function printCountdown(start: number, delay: number): void;
