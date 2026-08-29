"use clinet";

import Link from "next/link";
import { medias } from "./constants/medias";
import Image from "next/image";

export const NavigationSocialItems: React.FC = () => {
  return (
    <ul className="flex items-center gap-x-5">
      {medias.map((media) => (
        <li key={media.name}>
          <Link href="#">
            <Image
              src={media.src}
              alt={media.name}
              width={media.width}
              height={media.height}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
