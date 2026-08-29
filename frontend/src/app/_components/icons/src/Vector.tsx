import BaseIcon from "@/app/_components/icons/base-icon";
import type { SvgIcon } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIcon) {
  return (
    <BaseIcon {...props}>
      <path d="M18.2939 18.2938L16.5395 16.5395M0.75 9.08333C0.75 4.48096 4.48096 0.75 9.08333 0.75C13.6857 0.75 17.4167 4.48096 17.4167 9.08333C17.4167 13.6857 13.6857 17.4167 9.08333 17.4167C4.48096 17.4167 0.75 13.6857 0.75 9.08333Z"/>
    </BaseIcon>
  );
}