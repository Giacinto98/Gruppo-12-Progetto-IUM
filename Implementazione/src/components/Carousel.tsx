import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";

SwiperCore.use([Navigation, Pagination]);

interface Props {
  imgs: string[];
}

const MyCarousel = ({ imgs }: Props) => {
  return (
    <Swiper slidesPerView={1} loop={true} navigation={true} pagination={true}>
      {imgs.map((img, i) => {
        return (
          <SwiperSlide key={i}>
            <img src={img} alt="immagine" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MyCarousel;
