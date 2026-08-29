import BaseIcon from "@/app/_components/icons/base-icon";
import type { SvgIcon } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIcon) {
  return (
    <BaseIcon {...props}>
      <line x1="1.05" y1="1.0496" x2="19.95" y2="1.0496"/><line x1="1.05" y1="8.0496" x2="19.95" y2="8.0496"/><line x1="1.05" y1="15.0496" x2="19.95" y2="15.0496"/>
    </BaseIcon>
  );
}