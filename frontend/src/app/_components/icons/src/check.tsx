import BaseIcon from "@/app/_components/icons/base-icon";
import type { SvgIcon } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIcon) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10"/><path d="m16 9-5.5 5.5L8 12"/>
    </BaseIcon>
  );
}