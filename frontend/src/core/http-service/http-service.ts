import { API_URL } from "@/configs/global";
import { ApiError } from "@/types/http-error.types";
import { ofetch } from "ofetch";
import { errorHandler } from "./http-error-strategies";
import { toProblem } from "@/utils/to-problem";

export const api = ofetch.create({
  baseURL: API_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },

  onRequestError({ error }) {
    throw new Error(error.message || "Network error");
  },

  onResponseError({ response }) {
    throw toProblem(response.status, response._data);
  },
});
