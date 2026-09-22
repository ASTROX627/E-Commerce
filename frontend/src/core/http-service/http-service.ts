import { API_URL } from "@/configs/global";
import { ApiError } from "@/types/http-error.types";
import { ofetch } from "ofetch";
import { errorHandler } from "./http-error-strategies";

export const api = ofetch.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  onResponse({ response }) {
    response;
  },
  onRequestError({ response }) {
    if (response) {
      const statusCode = response.status;

      if (statusCode >= 400) {
        const errorData: ApiError = response._data;
        errorHandler[statusCode](errorData);
      }
    }
  },
});

