"use client";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-cards";
import { ShowData } from "../_lib/Api";
import SearchPoster from "@/app/_components/SearchPoster";

function SimilerShowsSlider({ shows }: { shows: ShowData[] }) {
  return (
    <Swiper
      modules={[Autoplay, EffectCards]}
      slidesPerView={2}
      loop={true}
      spaceBetween={50}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      effect="card"
      className="flex gap-20 items-center  py-5 "
      grabCursor
    >
      {shows?.map(
        (show: ShowData, i) =>
          show.poster_path !== null && (
            <SwiperSlide
              key={i}
              className="flex items-center gap-4 swiper-card"
            >
              <SearchPoster fullQuality={true} show={show} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
}

export default SimilerShowsSlider;
