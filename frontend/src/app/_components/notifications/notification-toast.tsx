"use client";

import { NotificationType } from "@/types/notification.types";
import { ReactNode } from "react";
import { IconCheck, IconClose, IconError, IconInfo } from "../icons";
import { NotificationToastProps } from "./notification.types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { AppDispatch } from "@/stores/store";
import { removeNotification } from "@/stores/notification-slice";
import { ToastProgress } from "../progress-bar/progress-bar";

const notificationIcon: Record<NotificationType, ReactNode> = {
  success: <IconCheck width={20} height={20} className="text-secondary" />,
  error: <IconError width={20} height={20}  className="text-error"/>,
  info: <IconInfo width={20} height={20}  className="text-primary"/>,
  warning: <IconInfo width={20} height={20}  className="text-warning"/>,
};

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification: { id, message, type, duration = 5000 },
}) => {
  const dispatch = useAppDispatch<AppDispatch>();

  const handleRemove = () => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="shadow-xl w-80 h-20 flex flex-col justify-between p-2 rounded-md">
      <div className="flex items-center justify-between">
        <div>{notificationIcon[type]}</div>
        <button onClick={handleRemove}>
          <IconClose width={20} height={20} color="black" />
        </button>
      </div>
      <p className="text-sm font-semibold">{message}</p>
      <ToastProgress id={id} type={type} duration={duration}/>
    </div>
  );
};
