import type { NextFunction, Request, Response } from "express";
import {
  ABOUT_BLANK,
  AppError,
  standardTitleFor,
} from "../errors/app-error.ts";
import type { ProblemDetails } from "../types/problem-details.types.ts";
import { logger } from "../utils/logger.ts";
import {
  isPrismaKnownError,
  isPrismaValidationError,
} from "../errors/prisma-error-guards.ts";

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

  if (isPrismaKnownError(err)) {
    if (err.code === "P2002") {
      const target =
        (err.meta?.target as string[] | undefined)?.join(", ") ?? "field";
      res
        .status(409)
        .type("application/problem+json")
        .json({
          type: `${PROBLEM_TYPE_BASE}/conflict`,
          title: "Conflict",
          status: 409,
          detail: `A record with this ${target} already exists.`,
          instance: req.originalUrl,
        } satisfies ProblemDetails);
      return;
    }

    if (err.code === "P2025") {
      res
        .status(404)
        .type("application/problem+json")
        .json({
          type: ABOUT_BLANK,
          title: standardTitleFor(404),
          status: 404,
          detail: "The requested resource was not found.",
          instance: req.originalUrl,
        } satisfies ProblemDetails);
      return;
    }
    if (err.code === "P2003") {
      res
        .status(422)
        .type("application/problem+json")
        .json({
          type: `${PROBLEM_TYPE_BASE}/validation-error`,
          title: "Validation Failed",
          status: 422,
          detail: "A referenced resource does not exist.",
          instance: req.originalUrl,
        } satisfies ProblemDetails);
      return;
    }
  }

  if (isPrismaValidationError(err)) {
    res
      .status(422)
      .type("application/problem+json")
      .json({
        type: ABOUT_BLANK,
        title: standardTitleFor(422),
        status: 422,
        detail: "The provided data does not match the expected format.",
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
