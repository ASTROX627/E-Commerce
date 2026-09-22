import { TooManyRequestsError } from "../../../../backend/src/errors/http-errors";
import {
  ApiError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "@/types/http-error.types";

export type ApiErrorHandler = (errorData: ApiError) => void;

export const conflictErrorStrategy: ApiErrorHandler = () => {
  throw {
    detail: "conflict",
  } as ConflictError;
};

export const validationErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    ...errorData,
  } as ValidationError;
};

export const unauthorizedErrorStrategy: ApiErrorHandler = () => {
  throw {
    detail: "Access is not possible",
  } as UnauthorizedError;
};

export const notFoundErrorStrategy: ApiErrorHandler = () => {
  throw {
    detail: "Service not found",
  } as NotFoundError;
};

export const tooManyRequestErrorStrategy: ApiErrorHandler = () => {
  throw {
    detail: "too many attempts",
  } as TooManyRequestsError;
};

export const errorHandler: Record<number, ApiErrorHandler> = {
  409: conflictErrorStrategy,
  422: validationErrorStrategy,
  401: unauthorizedErrorStrategy,
  404: notFoundErrorStrategy,
  429: tooManyRequestErrorStrategy
}
