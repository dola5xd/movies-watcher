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
        <h1 className="pt-10 px-4">{`${savedShows.length} Bookmarked`}</h1>
        {showData.length > 0 ? (
          <div className="flex items-center justify-between px-5 flex-wrap gap-4 py-7">
            {showData.map((show) => (
              <SearchPoster show={show} key={show.id} fullQuality={false} />
            ))}
          </div>
        ) : (
          <h3 className="text-primery-grey text-base px-4 py-7">
            Sorry! there isn&apos;t shows to show!
          </h3>
        )}
      </section>
    </>
  );
}

export default Page;
