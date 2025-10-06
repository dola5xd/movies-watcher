"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import MoviePoster from "./MoviePoster";
import { ShowData } from "../_types";
import { useScreen } from "../_context/ScreenContext";

function MoviesSlider({ data }: { data?: ShowData[] | undefined }) {
  const { isSmallScreen, isMobile } = useScreen();

  return (
    <Swiper
      slidesPerView={isMobile ? 1 : isSmallScreen ? 2 : 4}
      loop={true}
      spaceBetween={50}
      centeredSlides={true}
      effect="slide"
      className="flex items-center px-10 py-5 lg:px-20 gap-7"
      grabCursor
    >
      {data?.map((value) => (
        <SwiperSlide key={value.id}>
          <MoviePoster show={value} fullQuality={false} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MoviesSlider;
