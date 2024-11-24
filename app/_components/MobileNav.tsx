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
        className=" hover:scale-110 duration-500 cursor-pointer hover:text-primery-red"
        onClick={() => setMenu((prev) => !prev)}
      />

      <motion.div
        animate={{
          width: menu ? "50%" : 0,
          display: menu ? "flex" : "none",
          opacity: menu ? 1 : 0,
        }}
        transition={{ width: { duration: 0.5 } }}
        className="w-1/2 p-5 z-50 fixed right-0 top-0 bg-primery-black-700 min-h-screen flex-col overflow-hidden hidden"
      >
        <span
          className=" text-3xl w-full flex justify-end cursor-pointer hover:text-primery-red duration-500"
          onClick={() => setMenu(false)}
        >
          <CgClose />
        </span>
        <ul className="py-10 flex flex-col gap-4 text-lg hover:[&>li]:translate-x-2 hover:[&>li]:opacity-50 [&>li]:duration-500 [&>li]:text-nowrap">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/bookmarks">bookmarks</Link>
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
            <li className="flex items-center gap-2 [&>a>button]:px-4 [&>a>button]:py-1 [&>a>button]:rounded">
              <Link href="/">
                <button className="bg-primery-green">Login</button>
              </Link>
              <Link href="/">
                <button className="border border-primery-grey">Register</button>
              </Link>
            </li>
          )}
        </ul>
      </motion.div>
    </>
  );
}

export default MobileNav;
