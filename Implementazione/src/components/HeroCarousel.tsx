import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroCarouselItem from "./HeroCarouselItem";
import { HeroCarouselItemData } from "../data/heroCarouselData";

SwiperCore.use([Navigation, Pagination]);

interface Props {
  items: HeroCarouselItemData[];
}

const HeroCarousel = ({ items }: Props) => {
  return (
    <Swiper slidesPerView={1} loop={true} navigation={true} pagination={true}>
      {items.map((item, i) => {
        return (
          <SwiperSlide key={i}>
            <HeroCarouselItem {...item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroCarousel;
