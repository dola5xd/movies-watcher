import CastSlider from "@/app/_components/CastSlider";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { getShow, getShowCast, searchSimilarShows } from "@/app/_lib/Api";
import { imagesUrl } from "@/app/_lib/constants";
import Image from "next/image";
import { LuDot } from "react-icons/lu";
import type { Metadata } from "next";
import Overview from "@/app/_components/Overview";
import SimilerShowsSlider from "@/app/_components/SimilerShowsSlider";
import ActionBtns from "@/app/_components/ActionBtns";
import { JSX } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;

  const show = await getShow("tv", id);

  return {
    title: `${show.name} | Movie Watcher`,
    description: String(show.overview) || "No description available",
    openGraph: {
      title: `${show.name} | Movie Watcher`,
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

  const show = await getShow("tv", id);

  if (show.success === false) throw new Error("Wrong id!");

  const { name, genres, first_air_date, number_of_episodes, overview } = show;
  const cast = await getShowCast("tv", id);
  const similarShows = await searchSimilarShows("tv", id);

  return (
    <>
      <div className=" flex flex-col justify-end min-h-[550px] overflow-x-hidden lg:mx-20">
        <div className="absolute min-h-[550px] w-full before-overlay before:z-10 before:bg-opacity-60 z-0 lg:left-0">
          <Image
            src={
              show.backdrop_path
                ? imagesUrl + show.backdrop_path
                : imagesUrl + show.poster_path
            }
            alt={name + "poster"}
            fill
            className="object-cover"
          />
        </div>
        <div className="z-10 flex flex-col items-start gap-5 mb-3 px-7 md:gap-5 md:mb-5 md:flex-row md:content-end ">
          <div className="relative h-[250px] min-w-[150px] md:h-[350px] md:min-w-[200px] rounded-md justify-end">
            <Image
              src={imagesUrl + show.poster_path}
              alt={name + "poster"}
              fill
              className="object-cover duration-500 rounded-md hover:scale-105"
            />{" "}
          </div>
          <div className="flex flex-col items-start justify-end md:h-[350px] md:pb-5">
            <span className="px-4 py-2 text-sm font-bold capitalize rounded bg-primary-black-800 ">
              series
            </span>
            <h2 className="text-2xl font-medium">{name}</h2>
            <h3 className="flex items-center gap-1 *:text-xs  *:text-primary-white/75 font-medium flex-wrap">
              <span>{Number(number_of_episodes)} Episodes</span>
              <LuDot />
              <span>{first_air_date?.split("-").at(0)}</span>
              <LuDot />
              <div className="flex items-center gap-y-1 flex-wrap *:text-center">
                {genres?.map((genre, i) => (
                  <>
                    <span key={genre.id} className="font-medium duration-500">
                      {genre.name}
                    </span>
                    {i !== genres.length - 1 && <LuDot />}
                  </>
                ))}
              </div>
            </h3>
            <ActionBtns type="tv" id={Number(id)} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start py-4 px-7 gap-7 lg:px-10">
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
      {similarShows?.length > 1 && (
        <div className="px-5 lg:px-10">
          <h2 className="font-bold">Similar Shows for you</h2>
          <SimilerShowsSlider shows={similarShows} />
        </div>
      )}
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
