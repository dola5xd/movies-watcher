"use client";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { imagesUrl } from "../_lib/constants";
import { ShowData } from "../_types";
import { useEffect, useState } from "react";

function HomeSlider({ data }: { data: ShowData[] | undefined }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    setIsMobile(media.matches);
    const handler = () => setIsMobile(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={isMobile ? 1 : 2}
      loop={true}
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        enabled: isMobile,
        clickable: true,
      }}
      className="relative"
      grabCursor
    >
      {data?.map((value) => (
        <SwiperSlide
          key={value.id}
          className="min-h-[350px] md:min-h-[450px] relative flex flex-col before-overlay justify-end pb-10 md:pb-5 pl-4 homeSlide"
          onClick={() => {
            const path = value.first_air_date
              ? `/tv/${value.id}`
              : `/movie/${value.id}`;
            router.push(path);
          }}
        >
          <Image
            src={imagesUrl + value.backdrop_path}
            fill
            quality={75}
            alt={
              value.title ? String(value.title) : String(value.name) + " poster"
            }
            className="object-cover rounded-lg -z-10"
          />

          <div className="z-10 flex flex-col h-full gap-2 pl-2">
            <h2 className="text-xl">
              {value.title ? value.title : value.name}
            </h2>
            <h3 className="flex items-center *:flex *:items-center gap-2 text-base">
              <span>
                <FaStar fill="#ffd700" className="mr-2" />
                {Number(value.vote_average).toFixed(1)}/10
              </span>
              |
              <span>
                {value.release_date
                  ? value.release_date?.toString().split("-").at(0)
                  : value.first_air_date?.toString().split("-").at(0)}
              </span>
            </h3>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HomeSlider;
