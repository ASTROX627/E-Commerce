"use client";

import { IconArrow, IconSearch } from "../icons";

export const SearchBox: React.FC = () => {
  return (
    <div className="relative mt-8 xl:m-0">
      <input
        type="text"
        placeholder="Search Products"
        className="w-full border border-base-300 px-4 py-2 rounded-md h-13.5 lg:w-86.25"
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <div className="flex items-center">
          <p>All categories</p>
          <IconArrow />
        </div>
        <IconSearch
          className="border-l border-base px-2"
          width={36}
          height={36}
        />
      </div>
    </div>
  );
};
