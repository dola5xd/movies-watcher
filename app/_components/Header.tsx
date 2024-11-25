"use client";
import Logo from "./Logo";
import { IoIosSearch } from "react-icons/io";
import MobileNav from "./MobileNav";
import { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import UserProfile from "./UserProfile";
import Link from "next/link";
import { useSession } from "../_context/SessionContext";

function Header() {
  const { loggedInUser } = useSession();

  const [openSearch, setSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openSearch) {
      if (inputRef.current) inputRef.current.focus();
    }
  }, [openSearch, inputRef]);

  return (
    <header className="absolute z-50 flex items-center justify-between w-full px-5 pb-5 bg-opacity-25 bg-primery-black-900 md:px-10 pt-7 lg:py-0">
      <Logo />
      <div className="flex items-center gap-4 text-3xl lg:flex-row-reverse">
        <IoIosSearch
          onClick={() => {
            setSearch((prev) => !prev);
          }}
          className="cursor-pointer "
        />
        <UserProfile />
        <MobileNav />

        <ul className="py-10 lg:flex gap-4 text-lg hover:[&>li]:-translate-y-1 hover:[&>li]:opacity-75 [&>li]:duration-500 [&>li]:text-nowrap hidden">
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
                className="px-4 py-1 font-bold rounded bg-primery-green"
              >
                Join Us
              </Link>
            </li>
          )}
        </ul>
      </div>
      {openSearch && (
        <div className="absolute top-3/4 w-[calc(100%_-_80px)] lg:w-1/3 right-4">
          <input
            type="text"
            placeholder="Search about"
            className="w-full px-3 py-4 text-base rounded outline-none bg-primery-black-700"
            ref={inputRef}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.length > 2) {
                setSearch(false);
                setQuery("");
                redirect(`/search?query=${query}`);
              }
            }}
          />
          <button
            onClick={() => {
              if (query.length > 2) {
                setSearch(false);
                setQuery("");
                redirect(`/search?query=${query}`);
              }
            }}
            className="absolute right-0 h-full px-3 text-base font-bold rounded bg-primery-red text-primery-white"
          >
            Search
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
