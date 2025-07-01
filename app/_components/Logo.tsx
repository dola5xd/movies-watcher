import Link from "next/link";
import { MdLocalMovies } from "react-icons/md";

function Logo() {
  return (
    <Link href="/" className="relative">
      <h1 className="flex items-center gap-1 text-base md:text-2xl">
        <MdLocalMovies />
        Movies Watcher
      </h1>
    </Link>
  );
}

export default Logo;
