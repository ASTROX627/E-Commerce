import { AppThunk } from "../store";
import { addNotification, removeNotification } from "../notification-slice";

import { NOTIFICATION_DURATION } from "@/constants/notification";
import { Notification } from "@/types/notification.types";

export const showNotification =
  (notification: Omit<Notification, "id">): AppThunk =>
  (dispatch) => {
    const action = addNotification(notification);
    dispatch(action);

    setTimeout(() => {
      dispatch(removeNotification(action.payload.id));
    }, NOTIFICATION_DURATION);
  };

export const showNotifications =
  (notifications: Omit<Notification, "id">[]): AppThunk =>
  (dispatch) => {
    notifications.forEach((n) => dispatch(showNotification(n)));
  };
