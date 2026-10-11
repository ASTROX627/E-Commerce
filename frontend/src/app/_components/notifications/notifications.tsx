"use client";

import { useAppSelector } from "@/hooks/redux-hooks";

export const Notifications: React.FC = () => {
  const notifications = useAppSelector(
    (state) => state.notification.notifications,
  );

  if (notifications.length < 1) {
    return null;
  }

  return (
    <div className="fixed flex flex-col-reverse bottom-3 right-3 gap-3">
      {notifications.map((notification) => (
        <p key={notification.id}>{notification.message}</p>
      ))}
    </div>
  );
};
