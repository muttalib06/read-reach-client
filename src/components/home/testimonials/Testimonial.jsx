import React, { useEffect, useState } from "react";
import TestimonialCard from "../../sharedComponents/testimonialCard/TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/testimonial.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <div
      className="mt-20 rounded py-12 md:py-16"
      style={{
        background: "linear-gradient(135deg, #ea3f29 0%, #ff6b5a 100%)",
      }}
    >
      <div className="text-center mb-12 md:mb-16 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          What Our Readers Say
        </h2>
        <div className="w-20 h-1 bg-white mx-auto mb-4"></div>

        <p className="mx-auto max-w-2xl text-white text-base sm:text-lg md:text-xl leading-relaxed">
          Your experience matters to us. Here's what students, researchers, and
          book lovers are saying about ReadReach.
        </p>
      </div>

      {/* Testimonial cards slider */}
      <div className="container mx-auto px-4 pb-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={2}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom CSS for Swiper styling */}
      <style jsx>{`
        .testimonial-swiper {
          padding-bottom: 50px;
        }

        /* Equal height for all slides */
        .testimonial-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .testimonial-swiper .swiper-slide {
          height: auto;
          display: flex;
          flex-direction: column;
        }

        .testimonial-swiper .swiper-pagination {
          bottom: 10px;
        }

        .testimonial-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          background: white;
          width: 30px;
          border-radius: 5px;
        }

        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .testimonial-swiper .swiper-button-next:hover,
        .testimonial-swiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .testimonial-swiper .swiper-button-next::after,
        .testimonial-swiper .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .testimonial-swiper .swiper-button-next,
          .testimonial-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonial;
