"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { imagesUrl } from "../_lib/constants";
import { redirect } from "next/navigation";
import { ShowData } from "../_lib/Api";

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
      className="relative flex flex-col min-h-[350px] aspect-[4/7] sm:aspect-[4/5] md:aspect-[4/7] lg:min-h-[200px] rounded-lg before-overlay justify-end content-end pb-4 hover:before:bg-opacity-0 duration-500 lg:before:bg-opacity-60"
      onClick={() => redirect(first_air_date ? `tv/${id}` : `movie/${id}`)}
    >
      <Image
        src={
          fullQuality
            ? imagesUrl + poster
            : "http://image.tmdb.org/t/p/w500" + poster
        }
        fill
        alt={title ? String(title) : String(name) + " poster"}
        className="object-cover rounded-lg -z-10 "
      />
      <div className="z-10 flex flex-col min-h-[350px] gap-2 pl-2 text-base sm:text-2xl lg:text-lg justify-end">
        <h1>{title ? title : name}</h1>
        <h5 className="flex items-center *:flex *:items-center gap-2">
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
        </h5>
      </div>
    </div>
  );
}

export default MoviePoster;
