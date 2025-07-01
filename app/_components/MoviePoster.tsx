"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { imagesUrl } from "../_lib/constants";
import { redirect } from "next/navigation";
import { ShowData } from "../_types";

function MoviePoster({
  show,
  fullQuality,
}: {
  show: ShowData;
  fullQuality: boolean;
}) {
  const {
    title,
    id,
    poster_path: poster,
    vote_average: rating,
    name,
    release_date,
    first_air_date,
  } = show;

  return (
    <div
      className="relative flex flex-col min-h-[350px] aspect-[4/7] sm:aspect-[4/5] md:aspect-[2/3] lg:min-h-[200px] rounded-lg before-overlay justify-end content-end pb-4 hover:before:bg-black/25 duration-500 "
      onClick={() => redirect(first_air_date ? `tv/${id}` : `movie/${id}`)}
    >
      <Image
        src={
          fullQuality
            ? imagesUrl + poster
            : "http://image.tmdb.org/t/p/w500" + poster
        }
        fill
        quality={fullQuality ? 75 : 50}
        alt={title ? String(title) : String(name) + " poster"}
        className="object-cover rounded-lg -z-10 "
      />
      <div className="z-10 flex flex-col justify-end h-full gap-2 pl-2">
        <h2 className="text-xl font-bold lg:text-2xl text-balance">
          {title ? title : name}
        </h2>
        <h3 className="flex items-center *:flex *:items-center gap-2 text-base">
          <span>
            <FaStar fill="#ffd700" className="mr-2" />
            {Number(rating).toFixed(1)}/10
          </span>
          |
          <span>
            {release_date
              ? release_date?.toString().split("-").at(0)
              : first_air_date?.toString().split("-").at(0)}
          </span>
        </h3>
      </div>
    </div>
  );
}

export default MoviePoster;
