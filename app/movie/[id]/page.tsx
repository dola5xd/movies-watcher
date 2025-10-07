import CastSlider from "@/app/_components/CastSlider";
import { getShow, getShowCast, searchSimilarShows } from "@/app/_lib/Api";
import { imagesUrl } from "@/app/_lib/constants";
import Image from "next/image";
import { LuDot } from "react-icons/lu";
import type { Metadata } from "next";
import Overview from "@/app/_components/Overview";
import SimilerShowsSlider from "@/app/_components/SimilerShowsSlider";
import ActionBtns from "@/app/_components/ActionBtns";
import { JSX } from "react";
import {
  div as MotionDiv,
  section as MotionSection,
} from "motion/react-client";
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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  const { id } = await params;
  const show = await getShow("movie", id);
  if (show.success === false) throw new Error("Wrong id!");

  const { title, genres, release_date, runtime, overview } = show;
  const cast = await getShowCast("movie", id);
  const similarShows = await searchSimilarShows("movie", id);

  return (
    <div className="bg-background text-white overflow-x-hidden">
      {/* 🎥 Hero Section */}
      <section className="relative w-full min-h-[80vh] md:min-h-[85vh] overflow-hidden">
        <Image
          src={
            show.backdrop_path
              ? imagesUrl + show.backdrop_path
              : imagesUrl + show.poster_path
          }
          alt={`${title} backdrop`}
          fill
          priority
          className="object-cover object-top opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />

        <div className="z-[12] flex flex-col md:flex-row items-end gap-6 px-6 md:px-16 bottom-10 md:bottom-20 absolute w-full">
          {/* Poster */}
          <MotionDiv
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-[150px] md:w-[220px] aspect-[2/3] rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={
                show.poster_path
                  ? imagesUrl + show.poster_path
                  : "/default-poster.jpg"
              }
              alt={`${title} poster`}
              fill
              quality={50}
              sizes="
          (max-width: 640px) 50vw,
          (max-width: 1024px) 33vw,
          (max-width: 1280px) 25vw,
          20vw
        "
              priority={false}
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </MotionDiv>

          {/* Info */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col justify-end max-w-2xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
            <div className="flex flex-wrap items-center gap-1 text-sm text-white/70 mb-3">
              <span>
                {Math.floor(Number(runtime) / 60)}h {Number(runtime) % 60}m
              </span>
              <LuDot />
              <span>{release_date?.split("-")?.[0]}</span>
              <LuDot />
              {genres?.map((g, i) => (
                <span key={g.id} className="capitalize">
                  {g.name}
                  {i !== genres.length - 1 && ","}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-3">
              <ActionBtns type="movie" id={Number(id)} />
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* 📖 Storyline Section */}
      <MotionSection
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className=" flex items-start gap-x-7 px-6 md:px-16 py-10 bg-background"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Storyline</h2>
        <Overview overview={String(overview)} />
      </MotionSection>

      {/* 👥 Top Cast Section */}
      {cast.length > 0 && (
        <MotionSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className=" flex items-center gap-x-7 px-6 md:px-16 py-10 bg-background"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Top Cast</h2>
          <CastSlider cast={cast} />
        </MotionSection>
      )}

      {/* 🎬 Similar Shows Section */}
      {similarShows?.length > 1 && (
        <MotionSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-6 md:px-16 py-10 bg-background"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            More Like This
          </h2>
          <SimilerShowsSlider shows={similarShows} />
        </MotionSection>
      )}
    </div>
  );
}
