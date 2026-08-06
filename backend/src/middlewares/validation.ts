import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { ValidationError } from "../errors/http-errors.ts";

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const field = issue.path.join(".");
        errors[field] = [...(errors[field] ?? []), issue.message];
      }
      return next(new ValidationError(errors));
    }
    req.body = result.data;
    next();
  };
}
