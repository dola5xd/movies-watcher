import Header from "../_components/Header";
import SearchPoster from "../_components/SearchPoster";
import Pagination from "../_components/Pagination";
import { getSeriesPages } from "../_lib/Api";

async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const currentPage = (await searchParams)?.page || 1;
  const moviesData = await getSeriesPages(Number(currentPage));
  const { results: data, total_pages } = moviesData!;
  return (
    <>
      <Header />
      <main className="w-full pt-28 px-7 lg:pt-32">
        <h1 className="font-bold md:px-24">Series</h1>
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
