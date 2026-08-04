import { HTTP_STATUS_PHRASES } from "../constants/http-status-phrases.ts";
import type { ProblemDetails } from "../types/problem-details.types.ts";

export const ABOUT_BLANK = "about:blank";

export abstract class AppError extends Error {
  abstract readonly status: number;
  readonly type: string;
  readonly title: string;
  readonly detail?: string | undefined;
  readonly extensions?: Record<string, unknown> | undefined;

  constructor(
    title: string,
    detail?: string,
    extensions?: Record<string, unknown>,
    type: string = ABOUT_BLANK,
  ) {
    super(detail ?? title);
    this.title = title;
    this.detail = detail;
    this.extensions = extensions;
    this.type = type;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }

  toProblemDetails(instance?: string): ProblemDetails {
    return {
      type: this.type,
      title: this.title,
      status: this.status,
      ...(this.detail ? { detail: this.detail } : {}),
      ...(instance ? { instance } : {}),
      ...(this.extensions ?? {}),
    };
  }
}

export function standardTitleFor(status: number): string {
  return HTTP_STATUS_PHRASES[status] ?? "Unknown Error";
}
