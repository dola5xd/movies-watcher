"use client";

import { useEffect, useState } from "react";
import SearchPoster from "../_components/SearchPoster";
import { getShow } from "../_lib/Api";
import { getSavedShows } from "../_lib/appwrite";
import { ShowData } from "../_types";
import { useSession } from "../_context/SessionContext";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import Spinner from "../_components/Spinner";

function Page() {
  const { loggedInUser, loading: sessionLoading } = useSession();
  const router = useRouter();

  const [savedShows, setSavedShows] = useState<
    { showID: string; type: string }[]
  >([]);
  const [showData, setShowData] = useState<ShowData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for session to load before redirecting
    if (!sessionLoading && !loggedInUser) {
      router.push("/login");
    }
  }, [sessionLoading, loggedInUser, router]);

  useEffect(() => {
    if (!loggedInUser) return;

    async function fetchSavedShowsAndData() {
      const shows = await getSavedShows();
      setSavedShows(shows);

      if (shows.length > 0) {
        const dataPromises = shows.map(
          (show: { type: string; showID: string }) =>
            getShow(show.type, show.showID)
        );
        const data = await Promise.all(dataPromises);
        setShowData(data);
      }

      setLoading(false);
    }

    fetchSavedShowsAndData();
  }, [loggedInUser]);

  if (sessionLoading || !loggedInUser) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col min-h-screen px-10 gap-y-4">
      <h2 className="">{`${savedShows.length} Bookmarked`}</h2>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : showData.length > 0 ? (
        <div className="flex flex-wrap items-center gap-4 md:gap-10 gap-y-7">
          {showData.map((show) => (
            <SearchPoster show={show} key={show.id} fullQuality={false} />
          ))}
        </div>
      ) : (
        <h3 className="px-4 text-base text-primary-grey">
          Sorry! there isn&apos;t shows to show!
        </h3>
      )}
    </section>
  );
}

export default Page;
