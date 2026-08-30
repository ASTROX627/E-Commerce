"use client";

import Link from "next/link";
import { items } from "./constants/items";

export const NavigationMenuItems: React.FC = () => {
  return (
    <ul className="flex gap-x-13">
      {items.map((item) => (
        <li key={item.title} className="text-base-600">
          <Link href={item.href}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}
