interface Problem {
  type: string;
  title: string;
  status: number;
  detail?: string | undefined;
  instance?: string | undefined;
}

interface ConflictError extends Problem {}
interface ValidationError extends Problem {
  errors: Record<string, string[]>;
}
interface UnauthorizedError extends Problem {}
interface NotFoundError extends Problem {}
interface TooManyRequestsError extends Problem {}

type ApiError =
  | UnauthorizedError
  | NotFoundError
  | ConflictError
  | ValidationError
  | TooManyRequestsError;

export type {
  Problem,
  ApiError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  ValidationError,
  TooManyRequestsError,
};
