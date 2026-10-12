import { NotificationType } from "@/types/notification.types";
import { ProgressBarProps } from "./progress-bar.types";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { AppDispatch } from "@/stores/store";
import { removeNotification } from "@/stores/notification-slice";

const progressColor: Record<NotificationType, string> = {
  success: "bg-secondary",
  error: "bg-error",
  info: "bg-primary",
  warning: "bg-warning",
};

export const ToastProgress: React.FC<ProgressBarProps> = ({
  type,
  duration,
  id,
}) => {
  const dispatch = useAppDispatch<AppDispatch>();

  const handleRemove = () => {
    dispatch(removeNotification(id));
  };
  return (
    <div
      className={`h-4 animate-toast-progress ${progressColor[type]}`}
      style={{ animationDuration: `${duration}ms` }}
      onAnimationEnd={handleRemove}
    ></div>
  );
};
