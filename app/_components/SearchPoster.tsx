"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { imagesUrl } from "../_lib/constants";
import { redirect } from "next/navigation";
import { ShowData } from "../_lib/Api";

function SearchPoster({
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
      className={`relative flex flex-col min-h-[400px] w-full md:w-[250px]
      } rounded-lg before-overlay justify-end pb-4 before:bg-opacity-40 hover:before:bg-opacity-20 duration-500 cursor-pointer`}
      onClick={() => redirect(first_air_date ? `/tv/${id}` : `/movie/${id}`)}
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
      <div className="z-10 flex flex-col h-full gap-2 pl-2 text-base text-balance ">
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

export default SearchPoster;
