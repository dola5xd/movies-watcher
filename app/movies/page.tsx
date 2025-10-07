import { getMoviesPages } from "../_lib/Api";
import SearchPoster from "../_components/SearchPoster";
import Pagination from "../_components/Pagination";
import { div as MotionDiv } from "motion/react-client";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const currentPage = (await searchParams)?.page || 1;
  const moviesData = await getMoviesPages(Number(currentPage));
  const { results: data, total_pages } = moviesData ?? {};

  return (
    <main className="flex flex-col w-full gap-10 px-6 md:px-20 pt-24 text-white">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-3xl font-bold tracking-wide">Movies</h2>
        <p className="text-gray-400 text-sm">
          Discover trending and top-rated movies
        </p>
      </MotionDiv>

      <MotionDiv
        layout
        className="grid gap-6 sm:gap-8 md:gap-10 
        grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
        justify-items-center"
      >
        {data?.map(
          (show, i) =>
            show.poster_path && (
              <MotionDiv
                key={show.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="w-full transition-all cursor-pointer"
              >
                <SearchPoster show={show} fullQuality={false} />
              </MotionDiv>
            )
        )}
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center pt-10"
      >
        <Pagination total={total_pages} />
      </MotionDiv>
    </main>
  );
}
