import Link from "next/link";
import Header from "./_components/Header";
import CompaniesSlider from "./_components/CompaniesSlider";
import HomeSection from "./_components/HomeSection";
import HomeSlider from "./_components/HomeSlider";
import MoviesSlider from "./_components/MoviesSlider";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  getMovies,
  getNowPlaying,
  getSeries,
  getTrending,
  getCovers,
  getAnimeShows,
} from "./_lib/Api";
import JoinUS from "./_components/JoinUS";

export const revalidate = 3600; //revalidate data every 1 hour

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
    <>
      <Header />
      <main className="h-screen">
        <HomeSlider data={coverMovies} />
        <CompaniesSlider />
        <HomeSection headH1="Just Release">
          <MoviesSlider data={nowPlaying} />
        </HomeSection>
        <HomeSection headH1={"Populer Of The Week"}>
          <MoviesSlider data={popularMovies} />
        </HomeSection>
        <HomeSection className="px-0 md:px-7 py-7">
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
        <footer className="flex flex-col gap-4 px-10 text-base md:gap-7 py-7 md:text-2xl">
          <h2>
            &apos; Our platform is trusted by millions & featuers best uptaded
            movies all around the world &apos;
          </h2>
          <div className="flex items-center gap-2 md:gap-4 py-7">
            <Link href="./">
              <FaFacebook />
            </Link>
            <Link href="./">
              <FaLinkedin />
            </Link>
            <Link href="./">
              <FaInstagram />
            </Link>
            <Link href="./">
              <FaGithub />
            </Link>
          </div>
          <ul className=" flex items-center gap-y-1 gap-x-4 md:gap-4 flex-wrap text-lg hover:*:underline *:duration-500 *:text-nowrap">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/bookmarks">bookmarks</Link>
            </li>
            <li>
              <Link href="/movies">Movies</Link>
            </li>
            <li>
              <Link href="/series">TV Shows</Link>
            </li>
            <li>
              <Link href="/anime">Anime</Link>
            </li>
          </ul>
          <p className="text-base">
            &copy; {new Date().getFullYear()} Developed with ❤ by{" "}
            <Link
              href="https://my-portfolio-website-orpin.vercel.app/"
              target="blank"
              className="underline"
            >
              Adel Yasser
            </Link>{" "}
          </p>
        </footer>
      </main>
    </>
  );
}

export default page;
