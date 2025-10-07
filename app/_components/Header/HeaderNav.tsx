"use client";

import { Models } from "appwrite";
import Link from "next/link";

export default function HeaderNav({
  loggedInUser,
}: {
  loggedInUser: Models.User<Models.Preferences> | null;
}) {
  return (
    <ul className="hidden lg:flex gap-4 text-lg font-medium text-primary-white/90 hover:*:text-primary-white/100 transition-colors *:duration-300 *:hover:-translate-y-1 *:hover:opacity-75">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/bookmarks">Bookmarks</Link>
      </li>
      <li>
        <Link href="/movies">Movies</Link>
      </li>
      <li>
        <Link href="/series">TV Shows</Link>
      </li>
      <li>
        <Link href="/anime">Anime</Link>
      </li>
      {!loggedInUser && (
        <li>
          <Link
            href="/register"
            className="px-4 py-1 font-semibold rounded bg-primary-red text-white hover:opacity-90 transition"
          >
            Join Us
          </Link>
        </li>
      )}
    </ul>
  );
}
