import { getMoviesPages } from "../_lib/Api";
import SearchPoster from "../_components/SearchPoster";
import Pagination from "../_components/Pagination";

async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const currentPage = (await searchParams)?.page || 1;
  const moviesData = await getMoviesPages(Number(currentPage));
  const { results: data, total_pages } = moviesData!;
  return (
    <main className="flex flex-col w-full gap-4 px-20">
      <h2 className="font-bold ">Movies</h2>
      <div className="flex flex-wrap items-center gap-4 gap-y-7 md:gap-7 py-7 md:py-4">
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
