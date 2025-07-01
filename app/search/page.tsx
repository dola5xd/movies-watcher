import { Suspense } from "react";
import SearchPoster from "../_components/SearchPoster";
import { searchShowByName } from "../_lib/Api";

import type { Metadata } from "next";
import Loading from "../loading";

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
      <section className="pt-24">
        <h2 className="px-4 pt-10 md:px-24">{`${data.length} Results for ' ${query} '`}</h2>
        <Suspense fallback={<Loading />}>
          {data.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-4 px-5 py-7 md:gap-10">
              {data?.map((show) => (
                <SearchPoster show={show} key={show.id} fullQuality={false} />
              ))}
            </div>
          ) : (
            <h3 className="px-4 text-base text-primary-grey py-7">
              Sorry! there is 0 result for your searched show!
            </h3>
          )}
        </Suspense>
      </section>
    </>
  );
}

export default page;
