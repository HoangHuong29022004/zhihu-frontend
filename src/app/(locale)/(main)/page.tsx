import CarouselSection from "@/components/home/carousel-section/carousel-section";
import { HotComicSection } from "@/components/home/hot-comic-section";
import { LastCompletedComicSection } from "@/components/home/last-comic-section";
import { OutstandingComicSection } from "@/components/home/outstanding-comic-section";

export default function Home() {
  return (
    <>
      {/* <HeaderAd /> */}
      <CarouselSection />
      <LastCompletedComicSection />
      <HotComicSection />
      <OutstandingComicSection />
      {/* <FooterAd /> */}
    </>
  );
}
