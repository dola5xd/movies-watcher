"use client";
import Link from "next/link";
import { useSession } from "../_context/SessionContext";

function JoinUS() {
  const { loggedInUser } = useSession();

  if (loggedInUser)
    return (
      <div
        className={`bg-primary-black-800 rounded-lg p-20 flex flex-col gap-3 md:gap-5 bg-[url('http://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg')] bg-cover bg-no-repeat bg-top-right before-overlay before:bg-black/50  relative *:z-20 lg:py-36`}
      >
        <h2 className="font-bold">
          Discover new shows with us {loggedInUser.name} !
        </h2>
        <div className="flex items-center gap-4 *:rounded *:py-2 hover:*:bg-opacity-75 *:duration-500 *:text-base">
          <Link
            href="/movies"
            className="bg-transparent border border-white px-7 hover:bg-primary-black-800 hover:border-transparent"
          >
            Movies
          </Link>
          <Link
            href="/series"
            className="bg-transparent border border-white px-7 hover:bg-primary-black-800 hover:border-transparent"
          >
            TV shows
          </Link>
        </div>
      </div>
    );

  return (
    <div
      className={`bg-primary-black-800 rounded-lg p-20 flex flex-col gap-3 md:gap-5 bg-[url('http://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg')] bg-contain bg-no-repeat bg-right before-overlay before:bg-opacity-50 relative *:z-20 lg:py-36`}
    >
      <h2 className="flex flex-col font-bold">
        Join Us Now!
        <span className="text-lg text-primary-grey">And enjoy all stuff</span>
      </h2>
      <div className="flex items-center gap-4 *:rounded *:py-2 hover:*:bg-opacity-75 *:duration-500 *:text-base">
        <Link href="/register" className="px-4 bg-primary-green">
          Register
        </Link>
        <Link
          href="/login"
          className="bg-transparent border-2 border-white px-7 hover:bg-primary-black-800 hover:border-transparent"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default JoinUS;
