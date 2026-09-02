"use client";

import Image from "next/image";
import {
  IconCard,
  IconCategories,
  IconFavorites,
  IconMenu,
  IconSignin,
} from "../icons";
import { TopNavigation } from "./top-navigation";
import { SearchBox } from "./search-box";
import { BottomHeader } from "./bottom-header";

export const Header: React.FC = () => {
  return (
    <>
      <div className="mt-8">
        <div className="xl:flex justify-between items-center">
          <div className="lg:flex justify-between items-center gap-x-5">
            <div className="flex justify-between items-center">
              <IconMenu width={21} height={14} className="lg:hidden" />
              <div className="flex gap-x-3 items-center">
                <Image
                  src="/Logo.png"
                  width={40}
                  height={27}
                  alt="logo"
                  className="lg:w-12.25 lg:h-8.25"
                />
                <h1 className="font-bold text-xl lg:text-3xl">Luminae</h1>
              </div>
              <IconCard width={24} height={24} className="lg:hidden" />
            </div>
            <SearchBox />
          </div>
          <TopNavigation />
        </div>
      </div>
      <BottomHeader />
    </>
  );
};
