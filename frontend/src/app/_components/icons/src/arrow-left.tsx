import BaseIcon from "@/app/_components/icons/base-icon";
import type { SvgIcon } from "@/app/_components/icons/icon.types";

export default function SvgIcon(props:SvgIcon) {
  return (
    <BaseIcon {...props}>
      <path d="M7.5769 4.94141L2.77148 9.99974L7.5769 15.0581" stroke-miterlimit="10"/><path d="M16.23 10H2.90625" stroke-miterlimit="10"/>
    </BaseIcon>
  );
}