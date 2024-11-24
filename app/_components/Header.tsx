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
    <header className=" absolute z-50 w-full bg-primery-black-900 bg-opacity-25 flex justify-between items-center px-10 pt-7 pb-5 ">
      <Logo />
      <div className="flex items-center gap-4 text-3xl">
        <IoIosSearch
          onClick={() => {
            setSearch((prev) => !prev);
          }}
          className=" cursor-pointer"
        />
        <UserProfile />
        <MobileNav />
      </div>
      {openSearch && (
        <div className="absolute top-full w-[calc(100%_-_80px)]">
          <input
            type="text"
            placeholder="Search about"
            className="rounded px-3 py-4 bg-primery-black-700 text-base w-full outline-none"
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
            className="bg-primery-red absolute right-0 px-3 h-full rounded text-base text-primery-white font-bold"
          >
            Search
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
