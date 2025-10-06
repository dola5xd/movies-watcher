import { getCovers } from "@/app/_lib/Api";
import CompaniesSlider from "../CompaniesSlider";
import HomeSlider from "./HomeSlider";

async function Hero() {
  const coverMovies = await getCovers();

  if (!coverMovies) return <h2>Faild to get covers from server</h2>;

  return (
    <>
      <HomeSlider data={coverMovies} />
      <CompaniesSlider />
    </>
  );
}

export default Hero;
