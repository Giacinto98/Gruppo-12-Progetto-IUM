import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./ScrollableContainer.css";

SwiperCore.use([FreeMode, Pagination]);

interface Props {
  slidesPerView?: number;
  imgs: string[];
}

const ScrollableContainer = ({ slidesPerView, imgs }: Props) => {
  return (
    <Swiper
      slidesPerView={slidesPerView || 3}
      loop={false}
      freeMode={true}
      pagination={true}
      spaceBetween={20}
      grabCursor={true}
    >
      {imgs.map((img, i) => {
        return (
          <SwiperSlide key={i}>
            <img src={img} alt="" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ScrollableContainer;
