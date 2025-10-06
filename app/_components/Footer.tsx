import Link from "next/link";

import { FaFacebook } from "react-icons/fa6";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="flex flex-col gap-4 px-10 text-base md:gap-7 py-7 sm:text-2xl">
      <h3>
        &apos; Our platform is trusted by millions & featuers best uptaded
        movies all around the world &apos;
      </h3>
      <div className="flex items-center gap-5 text-2xl py-7">
        <Link href="https://www.facebook.com/dola2005ti" target="_blank">
          <FaFacebook />
        </Link>
        <Link
          href="https://www.linkedin.com/in/adel-yasser-a28181242/"
          target="_blank"
        >
          <FaLinkedin />
        </Link>
        <Link href="https://www.instagram.com/3del_5xd" target="_blank">
          <FaInstagram />
        </Link>
        <Link href="https://github.com/dola5xd" target="_blank">
          <FaGithub />
        </Link>
      </div>
      <ul className=" flex items-center gap-y-1 gap-x-4 md:gap-4 flex-wrap text-lg *:hover:underline *:duration-500 *:text-nowrap">
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
      </ul>
      <p className="text-base text-pretty">
        &copy; {new Date().getFullYear()} Developed with ❤ by{" "}
        <Link
          href="https://my-portfolio-website-orpin.vercel.app/"
          target="blank"
          className="underline"
        >
          Adel Yasser
        </Link>{" "}
      </p>
    </footer>
  );
}

export default Footer;
