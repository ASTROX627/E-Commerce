import type { Request, Response } from "express";
import { ABOUT_BLANK, standardTitleFor } from "../errors/app-error.ts";
import type { ProblemDetails } from "../types/problem-details.types.ts";

export function notFoundHandler(req: Request, res: Response): void {
  res
    .status(404)
    .type("application/problem+json")
    .json({
      type: ABOUT_BLANK,
      title: standardTitleFor(404),
      status: 404,
      detail: `The route ${req.method} ${req.originalUrl} does not exist.`,
      instance: req.originalUrl,
    } satisfies ProblemDetails);
}
