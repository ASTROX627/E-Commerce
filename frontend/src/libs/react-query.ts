import { AppDispatch } from "@/stores/store";
import { showNotifications } from "@/stores/thunks/notification-thunks";
import { isValidationError, Problem } from "@/types/http-error.types";
import { Notification } from "@/types/notification.types";
import { MutationCache, QueryClient } from "@tanstack/react-query";

const problemToNotifications = (
  problem: Problem,
): Omit<Notification, "id">[] => {
  if (isValidationError(problem)) {
    return Object.values(problem.errors).flatMap((messages) =>
      messages.map((message) => ({ message, type: "error" as const })),
    );
  }

  if (problem?.detail) {
    return [{ message: problem.detail, type: "error" }];
  }

  return [];
};

export const createQueryClient = (dispatch: AppDispatch) =>
  new QueryClient({
    mutationCache: new MutationCache({
      onError: (error: unknown) => {
        dispatch(showNotifications(problemToNotifications(error as Problem)));
      },
    }),

    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: false,
        gcTime: 24 * 60 * 60 * 1000,
      },
    },
  });
