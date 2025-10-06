"use client";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CastSlide from "./CastSlide";
import { CastData } from "../_types";
import { useScreen } from "../_context/ScreenContext";

function CastSlider({ cast }: { cast: CastData[] }) {
  const { isSmallScreen, isMobile } = useScreen();

  return (
    <Swiper
      modules={[EffectCards]}
      slidesPerView={isMobile ? 1 : isSmallScreen ? 3 : 4}
      loop={true}
      spaceBetween={isSmallScreen ? 350 : 150}
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
