import CompaniesSlider from "./_components/CompaniesSlider";
import HomeSection from "./_components/HomeSection";
import HomeSlider from "./_components/HomeSlider";
import MoviesSlider from "./_components/MoviesSlider";

import {
  getMovies,
  getNowPlaying,
  getSeries,
  getTrending,
  getCovers,
  getAnimeShows,
} from "./_lib/Api";
import JoinUS from "./_components/JoinUS";

async function page() {
  const [
    coverMovies,
    moviesData,
    nowPlaying,
    popularMovies,
    seriesData,
    animeShows,
  ] = await Promise.all([
    getCovers(),
    getMovies(),
    getNowPlaying(),
    getTrending(),
    getSeries(),
    getAnimeShows(),
  ]);

  return (
    <main className="min-h-screen">
      <HomeSlider data={coverMovies} />
      <CompaniesSlider />
      <HomeSection headH1="Just Release">
        <MoviesSlider data={nowPlaying} />
      </HomeSection>
      <HomeSection headH1={"Populer Of The Week"}>
        <MoviesSlider data={popularMovies} />
      </HomeSection>
      <HomeSection className="px-0 md:px-7 lg:px-20 py-7">
        <JoinUS />
      </HomeSection>
      <HomeSection headH1={"Movies"}>
        <MoviesSlider data={moviesData} />
      </HomeSection>
      <HomeSection headH1={"Series"}>
        <MoviesSlider data={seriesData} />
      </HomeSection>
      <HomeSection headH1={"Anime"}>
        <MoviesSlider data={animeShows} />
      </HomeSection>
    </main>
  );
}

export default page;
