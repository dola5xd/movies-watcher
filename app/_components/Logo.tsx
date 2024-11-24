import Link from "next/link";
import { MdLocalMovies } from "react-icons/md";

function Logo() {
  return (
    <Link href="/" className="relative">
      <span className="flex items-center gap-1 ">
        <MdLocalMovies />
        Movies Watcher
      </span>
    </Link>
  );
}

export default Logo;
