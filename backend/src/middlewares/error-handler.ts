import type { NextFunction, Request, Response } from "express";
import {
  ABOUT_BLANK,
  AppError,
  standardTitleFor,
} from "../errors/app-error.ts";
import type {
  ProblemDetails,
  ValidationProblemDetails,
} from "../types/problem-details.types.ts";
import mongoose from "mongoose";
import { logger } from "../utils/logger.ts";

const PROBLEM_TYPE_BASE = "https://example.com/problems";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res
      .status(err.status)
      .type("application/problem+json")
      .json(err.toProblemDetails(req.originalUrl));
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors: Record<string, string[]> = {};

    for (const [field, validationError] of Object.entries(err.errors)) {
      errors[field] = [validationError.message];
    }

    res
      .status(422)
      .type("application/problem+json")
      .json({
        type: `${PROBLEM_TYPE_BASE}/validation-error`,
        title: "Validation Failed",
        status: 422,
        detail: "One or more fields are invalid.",
        instance: req.originalUrl,
        errors,
      } satisfies ValidationProblemDetails);
  }

  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: unknown }).code === 11000
  ) {
    res
      .status(409)
      .type("application/problem+json")
      .json({
        type: `${PROBLEM_TYPE_BASE}/conflict`,
        title: "Conflict",
        status: 409,
        detail: "A resource with this value already exists.",
        instance: req.originalUrl,
      } satisfies ProblemDetails);
    return;
  }
  logger.error("Unhandled error", err);
  res
    .status(500)
    .type("application/problem+json")
    .json({
      type: ABOUT_BLANK,
      title: standardTitleFor(500),
      status: 500,
      instance: req.originalUrl,
    } satisfies ProblemDetails);
}
