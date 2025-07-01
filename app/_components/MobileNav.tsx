"use client";

import Link from "next/link";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { motion } from "framer-motion";
import { BiMenu } from "react-icons/bi";
import { useSession } from "../_context/SessionContext";
function MobileNav() {
  const [menu, setMenu] = useState<boolean>(false);
  const { loggedInUser } = useSession();

  return (
    <>
      <BiMenu
        className="duration-500 cursor-pointer hover:scale-110 hover:text-primary-red lg:hidden"
        onClick={() => setMenu((prev) => !prev)}
      />

      <motion.div
        animate={{
          width: menu ? "50%" : 0,
          display: menu ? "flex" : "none",
          opacity: menu ? 1 : 0,
        }}
        transition={{ width: { duration: 0.5 } }}
        className="fixed top-0 right-0 z-50 flex-col hidden w-1/2 min-h-screen p-5 overflow-hidden bg-primary-black-700 lg:hidden"
      >
        <span
          className="flex justify-end w-full text-3xl duration-500 cursor-pointer hover:text-primary-red"
          onClick={() => setMenu(false)}
        >
          <CgClose />
        </span>
        <ul className="py-10 flex flex-col gap-4 text-lg hover:[&>li]:translate-x-2 hover:[&>li]:opacity-50 [&>li]:duration-500 [&>li]:text-nowrap hover:[&>li:last-child]:translate-x-0 hover:[&>li:last-child]:opacity-100">
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
            <li className="flex items-center flex-wrap justify-center gap-2 [&>a]:w-full [&>a]:px-4 [&>a]:py-1 [&>a]:rounded [&>a]:text-center">
              <Link href="/login" className="bg-primary-green">
                Login
              </Link>
              <Link href="/register" className="border border-primary-grey">
                Register
              </Link>
            </li>
          )}
        </ul>
      </motion.div>
    </>
  );
}

export default MobileNav;
