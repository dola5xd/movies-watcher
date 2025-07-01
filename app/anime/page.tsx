import SearchPoster from "../_components/SearchPoster";
import Pagination from "../_components/Pagination";
import { getAnimePages } from "../_lib/Api";

async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const currentPage = (await searchParams)?.page || 1;
  const moviesData = await getAnimePages(Number(currentPage));
  const { results: data, total_pages } = moviesData!;
  return (
    <main className="flex flex-col w-full px-20 gap-y-4">
      <h2 className="text-2xl font-bold">Anime</h2>
      <div className="flex flex-wrap items-center gap-4 gap-y-7 md:gap-7">
        {data?.map(
          (show) =>
            show.poster_path && (
              <SearchPoster show={show} key={show.id} fullQuality={false} />
            )
        )}{" "}
      </div>
      <Pagination total={total_pages} />
    </main>
  );
}

export default Page;
