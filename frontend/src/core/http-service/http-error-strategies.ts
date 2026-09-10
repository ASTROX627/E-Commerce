import { ApiError, BadRequestError } from "@/types/http-error.types";

export type ApiErrorHandler = (erorrData: ApiError) => void;

export const badRequestErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    ...errorData,
  } as BadRequestError
}
