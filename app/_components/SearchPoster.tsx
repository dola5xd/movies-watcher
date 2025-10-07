"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { imagesUrl } from "../_lib/constants";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import type { ShowData } from "../_types";

interface SearchPosterProps {
  show: ShowData;
  fullQuality: boolean;
}

function SearchPosterComponent({ show, fullQuality }: SearchPosterProps) {
  const router = useRouter();

  const {
    title,
    id,
    poster_path,
    vote_average,
    name,
    release_date,
    first_air_date,
  } = show;

  //  Memoized route navigation
  const handleClick = useCallback(() => {
    router.push(first_air_date ? `/tv/${id}` : `/movie/${id}`);
  }, [router, id, first_air_date]);

  // Precompute simple strings to reduce JSX work
  const displayTitle = title || name;
  const year = (release_date || first_air_date)?.split("-")[0] ?? "—";
  const rating = vote_average ? Number(vote_average).toFixed(1) : "N/A";

  return (
    <div
      onClick={handleClick}
      role="button"
      aria-label={`Open details for ${displayTitle}`}
      className="relative flex flex-col justify-end min-h-[360px] sm:min-h-[400px] w-full sm:w-[230px] md:w-[250px] rounded-lg overflow-hidden group cursor-pointer bg-black/10"
    >
      {/* Optimized image rendering */}
      {poster_path ? (
        <Image
          src={
            fullQuality
              ? `${imagesUrl}${poster_path}`
              : `https://image.tmdb.org/t/p/w500${poster_path}`
          }
          alt={`${displayTitle} poster`}
          fill
          loading="lazy"
          quality={fullQuality ? 75 : 50}
          sizes="(max-width: 640px) 50vw,
                 (max-width: 1024px) 33vw,
                 (max-width: 1280px) 25vw,
                 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-sm text-gray-400">
          No Image
        </div>
      )}

      {/* Overlay + Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

      <div className="relative z-10 px-3 pb-3 text-white text-sm sm:text-base">
        <h2 className="font-semibold truncate">{displayTitle}</h2>
        <div className="flex items-center gap-2 mt-1 text-gray-300 text-sm">
          <span className="flex items-center gap-1">
            <FaStar fill="#FFD700" className="w-3 h-3" />
            {rating}/10
          </span>
          <span className="opacity-70">•</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}

const SearchPoster = memo(SearchPosterComponent);
export default SearchPoster;
