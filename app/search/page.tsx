import { Suspense } from "react";
import SearchPoster from "../_components/SearchPoster";
import { searchShowByName } from "../_lib/Api";

import type { Metadata } from "next";
import Loading from "../loading";
import Header from "../_components/Header";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { query } = await searchParams;

  return {
    title: `Search for ${String(query)} | Movie Watcher`,
  };
}

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { query } = await searchParams;
  const serverData = await searchShowByName(String(query));
  const data = serverData.filter(
    (e) => e.poster_path !== null && e.media_type !== "person"
  );
  return (
    <>
      <Header />
      <section className="pt-24">
        <h1 className="pt-10 px-4">{`${data.length} Results for ' ${query} '`}</h1>
        <Suspense fallback={<Loading />}>
          {data.length > 0 ? (
            <div className="flex items-center justify-center px-5 flex-wrap gap-4 py-7">
              {data?.map((show) => (
                <SearchPoster show={show} key={show.id} fullQuality={false} />
              ))}
            </div>
          ) : (
            <h3 className="text-primery-grey text-base px-4 py-7">
              Sorry! there is 0 result for your searched show!
            </h3>
          )}
        </Suspense>
      </section>{" "}
    </>
  );
}

export default page;
