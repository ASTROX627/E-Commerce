import { isValidationError, Problem } from "@/types/http-error.types";
import { Notification } from "@/types/notification.types";

export const problemToNotifications = (
  problem: Problem,
): Omit<Notification, "id">[] => {
  if (isValidationError(problem)) {
    const messages = Object.values(problem.errors).flat();
    if (messages.length > 0) {
      return messages.map((message) => ({ message, type: "error" as const }));
    }
  }

  if (problem?.detail) {
    return [{ message: problem.detail, type: "error" }];
  }

  return [];
};
