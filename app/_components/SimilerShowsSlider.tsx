"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShowData } from "../_types";
import SearchPoster from "@/app/_components/SearchPoster";
import { useScreen } from "../_context/ScreenContext";
import "swiper/css";
import "swiper/css/effect-coverflow";

function SimilerShowsSlider({ shows }: { shows: ShowData[] }) {
  const { isSmallScreen, isMobile } = useScreen();

  const validShows = shows.filter((show) => show.poster_path !== null);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-0">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={isMobile ? 2 : isSmallScreen ? 3 : 4}
        spaceBetween={isMobile ? 10 : isSmallScreen ? 20 : 25}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        grabCursor
        className="w-full py-6"
      >
        {validShows.map((show, i) => (
          <SwiperSlide key={`${show.id}-${i}`}>
            <SearchPoster fullQuality show={show} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SimilerShowsSlider;
