import Header from "../_components/Header";
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
    <>
      <Header />
      <main className="w-full pt-28 lg:pt-32 px-7">
        <h1 className="font-bold md:px-24">Movies</h1>
        <div className="flex flex-wrap items-center justify-center gap-4 gap-y-7 md:gap-7 py-7 md:py-4">
          {data?.map(
            (show) =>
              show.poster_path && (
                <SearchPoster show={show} key={show.id} fullQuality={false} />
              )
          )}{" "}
        </div>
        <Pagination total={total_pages} />
      </main>
    </>
  );
}

export default Page;
