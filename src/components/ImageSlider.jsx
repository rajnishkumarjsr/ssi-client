import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const sliderImages = [
  "/images/SliderImages/1.jpg",
  "/images/SliderImages/2.jpg",
  "/images/SliderImages/3.jpg",
  "/images/SliderImages/4.jpg",
];

export function ImageSlider({ direction = "horizontal", autoRotate = true }) {
  return (
    <div className="image-slider-wrapper">
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        direction={direction}
        loop
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        autoplay={
          autoRotate
            ? {
                delay: 1500,
                disableOnInteraction: false,
              }
            : false
        }
      >
        {sliderImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="image-slider-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
