"use client";

import { IconCategories, IconSignin, IconFavorites, IconCard } from "../icons";

export const BottomHeader: React.FC = () => {
  return (
    <div className="hidden lg:block bg-base-800 mt-5">
      <div className="text-white h-10 container mx-auto flex items-center justify-between">
        <div className="flex gap-x-2 text-xl items-center">
          <IconCategories width={24} height={24} />
          <h2>Categories</h2>
        </div>
        <div className="flex items-center gap-x-14">
          <div className="flex gap-x-2">
            <IconSignin />
            <h2>Sign in</h2>
          </div>
          <div className="flex gap-x-2">
            <IconFavorites />
            <h2>Favorites</h2>
          </div>
          <div className="flex gap-x-2">
            <IconCard />
            <h2>Card</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
