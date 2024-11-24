"use client";
import { Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { ShowData } from "../_lib/Api";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { redirect } from "next/navigation";

function HomeSlider({ data }: { data?: ShowData[] | undefined }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      loop={true}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      className="relative top-0 left-0 mySwiper "
      grabCursor
    >
      {data?.map((value) => (
        <SwiperSlide
          key={value.id}
          className="min-h-[350px] relative flex flex-col before-overlay justify-end pb-4 "
          onClick={() =>
            redirect(
              value.first_air_date ? `tv/${value.id}` : `movie/${value.id}`
            )
          }
        >
          <Image
            src={"http://image.tmdb.org/t/p/w500" + value.backdrop_path}
            fill
            quality={100}
            alt={
              value.title ? String(value.title) : String(value.name) + " poster"
            }
            className="object-cover rounded-lg -z-10  "
          />
          <div className="z-10 h-full flex flex-col text-base gap-2 pl-2">
            <h1>{value.title ? value.title : value.name}</h1>
            <h5 className="flex items-center *:flex *:items-center gap-2">
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
            </h5>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HomeSlider;
