"use client";
import { useEffect, useState } from "react";
import Header from "../_components/Header";
import SearchPoster from "../_components/SearchPoster";
import { getShow, ShowData } from "../_lib/Api";
import { getSavedShows } from "../_lib/appwrite";

function Page() {
  const [savedShows, setSavedShows] = useState<
    { showID: string; type: string }[]
  >([]);
  const [showData, setShowData] = useState<ShowData[]>([]);

  useEffect(() => {
    async function fetchSavedShows() {
      const shows = await getSavedShows();
      setSavedShows(shows);
    }

    fetchSavedShows();
  }, []);

  useEffect(() => {
    async function fetchShowData() {
      const dataPromises = savedShows.map((show) =>
        getShow(show.type, show.showID)
      );
      const data = await Promise.all(dataPromises);
      setShowData(data);
    }

    if (savedShows.length > 0) {
      fetchShowData();
    }
  }, [savedShows]);

  return (
    <>
      <Header />
      <section className="pt-24">
        <h1 className="px-4 pt-10 md:px-28">{`${savedShows.length} Bookmarked`}</h1>
        {showData.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-4 px-5 md:gap-10 gap-y-7 py-7">
            {showData.map((show) => (
              <SearchPoster show={show} key={show.id} fullQuality={false} />
            ))}
          </div>
        ) : (
          <h3 className="px-4 text-base text-primery-grey py-7">
            Sorry! there isn&apos;t shows to show!
          </h3>
        )}
      </section>
    </>
  );
}

export default Page;
