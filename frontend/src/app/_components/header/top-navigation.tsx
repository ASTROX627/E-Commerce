"use client";

import { NavigationMenuItems } from "./navigation-menu-items";
import { NavigationSocialItems } from "./navigation-social-items";

export const TopNavigation: React.FC = () => {
  return (
    <div className="hidden lg:flex items-center justify-between mt-5 xl:gap-x-7">
      <NavigationMenuItems />
      <NavigationSocialItems />
    </div>
  );
};
