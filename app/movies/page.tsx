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
      <main className="pt-28 px-7 w-full">
        <h1 className="font-bold">Movies</h1>
        <div className="flex items-center justify-center flex-wrap gap-4 gap-y-7 py-7">
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
