"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar({ setOpenSearch }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    const trimmed = query.trim();
    if (trimmed.length > 2) {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
      setOpenSearch(false);
      setQuery("");
    }
  }, [query, router, setOpenSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSearch();
    },
    [handleSearch]
  );

  return (
    <div className="absolute right-5 top-full mt-3 w-[calc(100%-40px)] md:w-2/3 lg:w-1/3 flex items-center bg-primary-black-800 rounded-lg overflow-hidden shadow-lg border border-primary-black-700 transition-all">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search movies, series, or anime..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 text-base bg-transparent outline-none text-primary-white placeholder:text-primary-grey"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-3 text-sm font-bold bg-primary-red hover:bg-primary-red/90 transition-colors text-primary-white"
      >
        Search
      </button>
    </div>
  );
}
