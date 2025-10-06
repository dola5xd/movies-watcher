"use client";

import { useState } from "react";
import Logo from "../Logo";
import Loading from "@/app/loading";
import { useSession } from "@/app/_context/SessionContext";
import HeaderActions from "./HeaderActions";
import SearchBar from "./SearchBar";

export default function Header() {
  const { loggedInUser, loading } = useSession();
  const [openSearch, setOpenSearch] = useState(false);

  if (loading) return <Loading />;

  return (
    <header className="relative z-20 flex items-center justify-between w-full px-5 pb-5 pt-7 md:px-10 lg:py-7">
      <Logo />
      <HeaderActions
        setOpenSearch={setOpenSearch}
        loggedInUser={loggedInUser}
      />
      {openSearch && <SearchBar setOpenSearch={setOpenSearch} />}
    </header>
  );
}
