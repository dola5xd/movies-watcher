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
      <main className="pt-28 px-7 w-full">
        <h1 className="font-bold">Series</h1>
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
