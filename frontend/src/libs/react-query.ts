import { AppDispatch } from "@/stores/store";
import { showNotifications } from "@/stores/thunks/notification-thunks";
import { isValidationError, Problem } from "@/types/http-error.types";
import { Notification } from "@/types/notification.types";
import { problemToNotifications } from "@/utils/problem-to-notificaion";
import { MutationCache, QueryClient } from "@tanstack/react-query";

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
