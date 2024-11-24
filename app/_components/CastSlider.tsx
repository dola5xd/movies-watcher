"use client";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-cards";
import { CastData } from "../_lib/Api";
import CastSlide from "./CastSlide";

function CastSlider({ cast }: { cast: CastData[] }) {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  return (
    <Swiper
      modules={[Autoplay, EffectCards]}
      slidesPerView={isMobile ? 1 : 3}
      loop={true}
      spaceBetween={350}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      effect="card"
      className="flex items-center gap-20 py-5 "
      grabCursor
    >
      {cast?.map(
        (actor: CastData, i) =>
          actor.known_for_department === "Acting" &&
          actor.profile_path !== null && (
            <SwiperSlide
              key={i}
              className="flex items-center gap-4 swiper-card"
            >
              <h4 className="text-6xl">{i + 1}</h4>
              <CastSlide {...actor} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
}

export default CastSlider;
