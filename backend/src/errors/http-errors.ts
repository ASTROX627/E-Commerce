import { AppError, standardTitleFor } from "./app-error.ts";

const PROBLEM_TYPE_BASE = "https://example.com/problems";

export class ConflictError extends AppError {
  readonly status = 409;

  constructor(detail?: string) {
    super("Conflict", detail, undefined, `${PROBLEM_TYPE_BASE}/conflict`);
  }
}

export class ValidationError extends AppError {
  readonly status = 422;

  constructor(errors: Record<string, string[]>) {
    super(
      "Validation Failed",
      "One or more fields are invalid.",
      { errors },
      `${PROBLEM_TYPE_BASE}/validation-error`,
    );
  }
}

export class NotFoundError extends AppError {
  readonly status = 404;

  constructor(detail?: string) {
    super(standardTitleFor(404), detail);
  }
}
