"use client";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { imagesUrl } from "@/app/_lib/constants";
import { ShowData } from "@/app/_types";

function HomeSlider({ data }: { data: ShowData[] }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size only once on mount + resize
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={isMobile ? 1 : 2}
      loop
      spaceBetween={30}
      centeredSlides
      pagination={{
        enabled: isMobile,
        clickable: true,
      }}
      grabCursor
      className="relative"
    >
      {data?.map((item) => {
        const title = item.title || item.name;
        const releaseYear =
          item.release_date?.split("-")[0] ||
          item.first_air_date?.split("-")[0];

        return (
          <SwiperSlide
            key={item.id}
            className="min-h-[350px] md:min-h-[450px] relative flex flex-col before-overlay justify-end pb-10 md:pb-5 pl-4 homeSlide"
            onClick={() =>
              router.push(
                item.first_air_date ? `/tv/${item.id}` : `/movie/${item.id}`
              )
            }
          >
            <Image
              src={imagesUrl + item.backdrop_path}
              fill
              priority={item === data[0]}
              quality={70}
              alt={`${title} poster`}
              className="object-cover rounded-lg -z-10"
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                (max-width: 1280px) 45vw,
                40vw
              "
            />
            <div className="z-10 flex flex-col h-full gap-2 pl-2">
              <h2 className="text-xl font-semibold">{title}</h2>
              <h3 className="flex items-center *:flex *:items-center gap-2 text-base">
                <span>
                  <FaStar fill="#ffd700" className="mr-2" />
                  {Number(item.vote_average).toFixed(1)}/10
                </span>
                |<span>{releaseYear}</span>
              </h3>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default HomeSlider;
