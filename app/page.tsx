import Hero from "./_components/Home/Hero";
import HomeSection from "./_components/Home/HomeSection";
import JoinUS from "./_components/JoinUS";
import {
  getAnimeShows,
  getMovies,
  getNowPlaying,
  getSeries,
  getTrending,
} from "./_lib/Api";

async function page() {
  const [moviesData, nowPlaying, popularMovies, seriesData, animeShows] =
    await Promise.all([
      getMovies(),
      getNowPlaying(),
      getTrending(),
      getSeries(),
      getAnimeShows(),
    ]);

  return (
    <main className="pt-20">
      <Hero />
      <HomeSection headText="Just Release" data={nowPlaying} />
      <HomeSection headText="Populer Of The Week" data={popularMovies} />
      <HomeSection className="px-0 md:px-7 lg:px-20 py-7">
        <JoinUS />
      </HomeSection>
      <HomeSection headText="Movies" data={moviesData} />
      <HomeSection headText="Series" data={seriesData} />
      <HomeSection headText="Anime" data={animeShows} />
    </main>
  );
}

export default page;
