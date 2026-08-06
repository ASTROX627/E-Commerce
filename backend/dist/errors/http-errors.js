import { AppError, standardTitleFor } from "./app-error.js";
const PROBLEM_TYPE_BASE = "https://example.com/problems";
export class ConflictError extends AppError {
    status = 409;
    constructor(detail) {
        super("Conflict", detail, undefined, `${PROBLEM_TYPE_BASE}/conflict`);
    }
}
export class ValidationError extends AppError {
    status = 422;
    constructor(errors) {
        super("Validation Failed", "One or more fields are invalid.", { errors }, `${PROBLEM_TYPE_BASE}/validation-error`);
    }
}
export class UnauthorizedError extends AppError {
    status = 401;
    constructor(detail) {
        super(standardTitleFor(401), detail);
    }
}
export class NotFoundError extends AppError {
    status = 404;
    constructor(detail) {
        super(standardTitleFor(404), detail);
    }
}
//# sourceMappingURL=http-errors.js.map