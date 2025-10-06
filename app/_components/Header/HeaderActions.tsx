"use client";

import { IoIosSearch } from "react-icons/io";
import MobileNav from "../MobileNav";
import UserProfile from "../UserProfile";
import HeaderNav from "./HeaderNav";

interface Props {
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUser: any;
}

export default function HeaderActions({ setOpenSearch, loggedInUser }: Props) {
  return (
    <div className="flex items-center gap-4 text-3xl lg:flex-row-reverse">
      <IoIosSearch
        onClick={() => setOpenSearch((prev) => !prev)}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
      <UserProfile />
      <MobileNav />
      <HeaderNav loggedInUser={loggedInUser} />
    </div>
  );
}
