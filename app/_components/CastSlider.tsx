"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { CastData } from "../_types";
import { useScreen } from "../_context/ScreenContext";
import CastSlide from "./CastSlide";

function CastSlider({ cast }: { cast: CastData[] }) {
  const { isMobile } = useScreen();

  const validCast = cast.filter(
    (actor) => actor.known_for_department === "Acting" && actor.profile_path
  );

  return (
    <div className="relative w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-0">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={isMobile ? 2 : 3}
        spaceBetween={isMobile ? 12 : 15}
        loop
        grabCursor
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className={`w-full `}
      >
        {validCast.map((actor, i) => (
          <SwiperSlide key={`${actor.id}-${i}`} className="select-none">
            <CastSlide {...actor} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CastSlider;
