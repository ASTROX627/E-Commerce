import type { ProblemDetails } from "../types/problem-details.types.ts";
export declare const ABOUT_BLANK = "about:blank";
export declare abstract class AppError extends Error {
    abstract readonly status: number;
    readonly type: string;
    readonly title: string;
    readonly detail?: string | undefined;
    readonly extensions?: Record<string, unknown> | undefined;
    constructor(title: string, detail?: string, extensions?: Record<string, unknown>, type?: string);
    toProblemDetails(instance?: string): ProblemDetails;
}
export declare function standardTitleFor(status: number): string;
//# sourceMappingURL=app-error.d.ts.map