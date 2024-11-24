"use client";
import Logo from "./Logo";
import { IoIosSearch } from "react-icons/io";
import MobileNav from "./MobileNav";
import { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import UserProfile from "./UserProfile";

function Header() {
  const [openSearch, setSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openSearch) {
      if (inputRef.current) inputRef.current.focus();
    }
  }, [openSearch, inputRef]);

  return (
    <header className="absolute z-50 flex items-center justify-between w-full px-5 pb-5 bg-opacity-25  bg-primery-black-900 md:px-10 pt-7">
      <Logo />
      <div className="flex items-center gap-4 text-3xl">
        <IoIosSearch
          onClick={() => {
            setSearch((prev) => !prev);
          }}
          className="cursor-pointer "
        />
        <UserProfile />
        <MobileNav />
      </div>
      {openSearch && (
        <div className="absolute top-full w-[calc(100%_-_80px)]">
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
