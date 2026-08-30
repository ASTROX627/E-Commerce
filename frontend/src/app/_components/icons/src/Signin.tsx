import BaseIcon from "@/app/_components/icons/base-icon";
import type { SvgIcon } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIcon) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="12" cy="17.5" rx="7" ry="3.5"/><circle cx="12" cy="7" r="4"/>
    </BaseIcon>
  );
}