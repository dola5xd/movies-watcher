import CastSlider from "@/app/_components/CastSlider";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { getShow, getShowCast, searchSimilarShows } from "@/app/_lib/Api";
import { imagesUrl } from "@/app/_lib/constants";
import Image from "next/image";
import { LuDot } from "react-icons/lu";
import SimilerShowsSlider from "@/app/_components/SimilerShowsSlider";
import Overview from "@/app/_components/Overview";
import ActionBtns from "@/app/_components/ActionBtns";
import type { Metadata } from "next";
import { JSX } from "react";
import { ShowData } from "@/app/_types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;

  const show: ShowData = await getShow("movie", id);

  return {
    title: `${show.title} | Movie Watcher`,
    description: String(show.overview) || "No description available",
    openGraph: {
      title: `${show.title} | Movie Watcher`,
      description: String(show.overview),
      images: [
        {
          url: show.poster_path
            ? `https://image.tmdb.org/t/p/original${show.poster_path}`
            : "/default-poster.jpg",
        },
      ],
    },
  };
}

async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  const { id } = await params;

  const show: ShowData = await getShow("movie", id);

  if (show.success === false) throw new Error("Wrong id!");

  const cast = await getShowCast("movie", id);
  const { title, genres, release_date, runtime, overview } = show;
  const similarShows = await searchSimilarShows("movie", id);

  return (
    <>
      <div className=" flex flex-col justify-end min-h-[550px] lg:mx-20">
        <div className="absolute min-h-[550px] w-full before-overlay before:z-10 before:bg-opacity-60 z-0 lg:left-0">
          <Image
            src={
              show.backdrop_path
                ? imagesUrl + show.backdrop_path
                : "/default-backdrop.jpg"
            }
            alt={title + "poster"}
            fill
            className="object-cover"
          />
        </div>
        <div className="z-10 flex flex-col items-start gap-2 mb-3 px-7 md:gap-5 md:mb-5 md:flex-row">
          <div className="relative h-[250px] min-w-[150px] md:h-[350px] md:min-w-[200px] rounded-md">
            <Image
              src={imagesUrl + show.poster_path || "/default-poster.jpg"}
              alt={String(title) + "poster"}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="relative bottom-0 flex flex-col items-start justify-end gap-2 md:h-[350px] md:pb-5">
            <span className="px-4 py-2 text-sm font-bold capitalize rounded bg-primary-black-800 ">
              Movie
            </span>
            <h2 className="text-2xl font-medium">{String(title)}</h2>
            <h3 className="flex items-center gap-1 *:text-xs  *:text-primary-white/75 font-medium flex-wrap">
              <span>
                {Math.floor(Number(runtime) / 60)}h {Number(runtime) % 60}m
              </span>
              <LuDot />
              <span>{release_date?.split("-").at(0)}</span>
              <LuDot />
              <div className="flex items-center gap-y-1 flex-wrap *:text-center">
                {genres?.map((genre, i) => (
                  <span
                    key={genre.id}
                    className="flex items-center font-medium duration-500"
                  >
                    {genre.name} {i < genres.length - 1 && <LuDot />}
                  </span>
                ))}
              </div>
            </h3>{" "}
            <ActionBtns type="movie" id={Number(id)} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start py-4 px-7 gap-7 ">
        <div>
          <h3 className="font-bold">Story Line</h3>
          <Overview overview={String(overview)} />
        </div>
        {cast.length !== 0 && (
          <div className="w-full gap-5 text-sm ">
            <h2 className="text-3xl font-bold">Top Cast</h2>
            <CastSlider cast={cast} />
          </div>
        )}
      </div>
      <div className="px-5">
        <h2>Similar Shows for you</h2>
        <SimilerShowsSlider shows={similarShows} />
      </div>
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
        <ul className=" flex items-center gap-y-1 gap-x-4 md:gap-4 flex-wrap text-lg hover:*:underline *:duration-500 *:text-nowrap">
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
    </>
  );
}

export default page;
