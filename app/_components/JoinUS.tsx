"use client";
import Link from "next/link";
import { useSession } from "../_context/SessionContext";

function JoinUS() {
  const { loggedInUser } = useSession();

  if (loggedInUser)
    return (
      <div
        className={`bg-primery-black-800 rounded-lg py-16 px-7 md:px-16 flex flex-col gap-5 bg-[url('http://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg')] bg-right-bottom md:bg-cover before-overlay before:bg-opacity-70 relative *:z-20`}
      >
        <h1 className="font-bold">
          Discover new shows with us {loggedInUser.name} !
        </h1>
        <div className="flex items-center gap-4 *:rounded *:py-2 hover:*:bg-opacity-75 *:duration-500 *:text-base">
          <Link
            href="/movies"
            className="bg-transparent border border-white px-7 hover:bg-primery-black-800 hover:border-transparent"
          >
            Movies
          </Link>
          <Link
            href="/series"
            className="bg-transparent border border-white px-7 hover:bg-primery-black-800 hover:border-transparent"
          >
            TV shows
          </Link>
        </div>
      </div>
    );

  return (
    <div
      className={`bg-primery-black-800 rounded-lg p-20 flex flex-col gap-5 bg-[url('http://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg')] bg-cover before-overlay before:bg-opacity-50 relative *:z-20`}
    >
      <h1 className="font-bold">Join Us Now!</h1>
      <div className="flex items-center gap-4 *:rounded *:py-2 hover:*:bg-opacity-75 *:duration-500 *:text-base">
        <Link href="/register" className="bg-primery-green px-4">
          Register
        </Link>
        <Link
          href="/login"
          className="bg-transparent border-2 border-white px-7 hover:bg-primery-black-800 hover:border-transparent"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default JoinUS;
