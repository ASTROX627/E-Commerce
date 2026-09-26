export const HTTP_STATUS_PHRASES: Record<number, string> = {
  400: "BadRequest",
  401: "unauthorized",
  403: "forbidden",
  404: "notFound",
  409: "conflict",
  422: "unprocessableContent",
  429: "tooManyRequests",
  500: "internalServerError",
  503: "serviceUnavailable",
};
