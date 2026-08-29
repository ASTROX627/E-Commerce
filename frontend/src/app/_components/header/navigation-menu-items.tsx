"use client";

import Link from "next/link";
import { items } from "./constants/items";

export const NavigationMenuItems: React.FC = () => {
  return (
    <ul className="flex gap-x-20">
      {items.map((item) => (
        <li key={item.title}>
          <Link href={item.href}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}
