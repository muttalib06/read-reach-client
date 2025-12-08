import React from "react";
import bannerImg1 from "../../../assets/banner-1.avif";
import bannerImg2 from "../../../assets/banner-2.avif";
import bannerImg3 from "../../../assets/banner-3.avif";
import { LuCircleArrowOutUpRight } from "react-icons/lu";
// import swiper modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { NavLink } from "react-router";

const Banner = () => {
  const sliders = [
    {
      image: bannerImg1,
      title: "Library at Your Doorstep",
      description:
        "Request your favorite books and have them delivered directly to your home or office—no more waiting in lines.",
    },
    {
      image: bannerImg2,
      title: "Borrow, Read, Return—Simplified",
      description:
        "Request your favorite books and have them delivered directly to your home or office—no more waiting in lines.",
    },

    {
      image: bannerImg3,
      title: "Explore Thousands of Books",
      description:
        "Access a vast collection of books, research materials, and novels anytime, anywhere, without visiting the library.",
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      speed={2000}
      autoplay={{
        delay: 4000,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      loop={true}
      className="paginationCustom"
    >
      {sliders.map((slider, index) => (
        <SwiperSlide>
          <div
            key={index}
            className=" flex justify-start items-center pl-8 relative w-full h-[500px] rounded bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slider.image})` }}
          >
            <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>
            <div className="z-10 relative space-y-5 px-2 lg:max-w-2/4">
              <h2 className="font-bold text-5xl text-white">{slider.title}</h2>
              <p className="text-white text-xl font-semibold">
                {slider.description}
              </p>

             
                <NavLink to="/books" className="inline-flex items-center gap-2 rounded-2xl font-semibold  px-6 py-4 bg-transparent text-white border-2 border-primary hover:bg-white/20  transition-all duration-300">
                  Explore More
                  <LuCircleArrowOutUpRight className="text-2xl" />
                </NavLink>
            
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
