"use client";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ShowData } from "../_types";
import SearchPoster from "@/app/_components/SearchPoster";
import { useScreen } from "../_context/ScreenContext";

function SimilerShowsSlider({ shows }: { shows: ShowData[] }) {
  const { isSmallScreen, isMobile } = useScreen();

  return (
    <Swiper
      modules={[EffectCards]}
      slidesPerView={isMobile ? 1 : isSmallScreen ? 3 : 5}
      loop={true}
      spaceBetween={50}
      effect="card"
      className="flex items-center justify-center gap-20 py-5 "
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
