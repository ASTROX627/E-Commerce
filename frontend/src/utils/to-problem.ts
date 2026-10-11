import { Problem } from "@/types/http-error.types";


const fallbackDetails: Record<number, string> = {
  401: "Access is not possible",
  404: "Service not found",
  429: "Too many attempts",
};

export const toProblem = (status: number, data: unknown): Problem => {
  const body = data && typeof data === "object" ? (data as Problem) : {};

  return {
    ...body,
    status: body.status ?? status,
    detail:
      body.detail ??
      fallbackDetails[status] ??
      body.title ??
      "Something went wrong",
  };
};
