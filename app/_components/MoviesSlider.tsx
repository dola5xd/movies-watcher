"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MoviePoster from "./MoviePoster";

import "swiper/css/effect-cards";
import { ShowData } from "../_lib/Api";

function MoviesSlider({ data }: { data?: ShowData[] | undefined }) {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={isMobile ? 1 : 2}
      loop={true}
      spaceBetween={50}
      centeredSlides={true}
      autoplay={{
        delay: isMobile ? 2500 : 5000,
        disableOnInteraction: false,
      }}
      effect="slide"
      className="flex gap-7 items-center px-7 py-5"
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
