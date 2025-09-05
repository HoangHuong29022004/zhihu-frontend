"use client";
import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, PlayIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useComicStore } from "@/stores/comic-store";
import { useRouter } from "next/navigation";
import { ButtonBase } from "@/components/common/utils/button";
import { formatTextDescription } from "@/utils/common";
import Link from "next/link";

const headerBannerImages = [
  `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/slider_1.jpg`,
  `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/slider_2.jpg`,
  `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/slider_3.jpg`,
  `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/slider_4.jpg`,
  `${process.env.NEXT_PUBLIC_URL_IMAGES_COMMON}/slider_5.jpg`,
];

const CarouselSection = () => {
  const lastCompletedComic =
    useComicStore((state) => state.lastCompletedComic) ?? [];
  const router = useRouter();

  const handleNavigateDetails = (index: number) => {
    const comicSlug = lastCompletedComic[index]?.slug;
    router.push(`/comic/${comicSlug}`);
  };

  // Lấy 5 truyện đầu tiên cho carousel
  const carouselComics = lastCompletedComic.slice(0, 5);

  return (
    <div className="max-lg:col-span-12 lg:col-span-8 flex flex-col gap-3 overflow-hidden">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {carouselComics.map((comic, index) => (
            <CarouselItem
              key={comic.id || index}
              className="relative cursor-pointer"
              onClick={() => handleNavigateDetails(index)}
            >
              {/* Hình ảnh từ truyện */}
              <Image
                unoptimized
                src={headerBannerImages[index ?? 0]}
                alt={`${comic.title}-banner-img`}
                width={800}
                height={288}
                className="w-full max-md:h-full md:h-[500px] object-cover object-center cursor-pointer"
                quality={100}
              />
              {/* Nội dung từ truyện */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 px-4">
                <h2 className="animationShowItem text-xl sm:text-2xl lg:text-5xl font-bold mb-3 max-sm:mb-1 leading-tight drop-shadow-lg max-w-[620px] text-pretty line-clamp-2 max-sm:max-w-[300px]">
                  {comic.title}
                </h2>
                <div
                  className="max-w-[400px] text-center line-clamp-2 max-sm:max-w-[246px] max-sm:line-clamp-1 mb-3 font-bold italic"
                  dangerouslySetInnerHTML={{
                    __html: formatTextDescription(comic.description || "_"),
                  }}
                />
                <Link
                  href={`/comic/${comic.slug}`}
                  className="max-sm:hidden sm:block"
                >
                  <ButtonBase
                    className="px-4 py-2 text-sm sm:text-base"
                    icon={<PlayIcon size={16} />}
                  >
                    Đọc truyện ngay
                  </ButtonBase>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Nút Previous */}
        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 z-5 bg-white shadow-lg rounded-full p-2 cursor-pointer transform left-3 hover:bg-primary hover:text-white">
          <ChevronLeft />
        </CarouselPrevious>

        {/* Nút Next */}
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 z-5 bg-white shadow-lg rounded-full p-2 cursor-pointer transform right-3 hover:bg-primary hover:text-white">
          <ChevronRight />
        </CarouselNext>
        <CarouselDots totalItems={carouselComics.length} />
      </Carousel>
    </div>
  );
};

export default CarouselSection;
