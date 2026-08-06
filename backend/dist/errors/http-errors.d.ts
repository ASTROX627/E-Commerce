import { AppError } from "./app-error.ts";
export declare class ConflictError extends AppError {
    readonly status = 409;
    constructor(detail?: string);
}
export declare class ValidationError extends AppError {
    readonly status = 422;
    constructor(errors: Record<string, string[]>);
}
export declare class UnauthorizedError extends AppError {
    readonly status = 401;
    constructor(detail?: string);
}
export declare class NotFoundError extends AppError {
    readonly status = 404;
    constructor(detail?: string);
}
//# sourceMappingURL=http-errors.d.ts.map