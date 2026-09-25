import { API_URL } from "@/configs/global";
import { ApiError } from "@/types/http-error.types";
import { ofetch } from "ofetch";
import { errorHandler } from "./http-error-strategies";

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
    const handler = errorHandler[response.status];

    if (handler) {
      handler(response._data as ApiError);
    }
  },
});
