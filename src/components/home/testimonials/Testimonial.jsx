import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";
import {  Star, ArrowLeft, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);

  useEffect(() => {
    // Fetch testimonials
    fetch("/testimonial.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch(() => {
        // Fallback dummy data for demo
        setTestimonials([
          {
            id: 1,
            name: "Sarah Johnson",
            role: "University Student",
            rating: 5,
            feedback:
              "ReadReach has transformed how I access books for my research. The delivery is always on time, and the collection is extensive!",
            image: "https://i.pravatar.cc/200?img=1",
          },
          {
            id: 2,
            name: "Michael Chen",
            role: "Software Developer",
            rating: 5,
            feedback:
              "As someone who loves reading but hates crowded libraries, this service is a game-changer. Highly recommend!",
            image: "https://i.pravatar.cc/200?img=2",
          },
          {
            id: 3,
            name: "Emily Rodriguez",
            role: "Teacher",
            rating: 5,
            feedback:
              "The convenience of having books delivered to my doorstep is incredible. ReadReach makes reading accessible for everyone!",
            image: "https://i.pravatar.cc/200?img=3",
          },
        ]);
      });
  }, []);

  return (
    <section className="relative mt-20 py-16 md:py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff7236] via-[#ff6b5a] to-[#ff8c5a]"></div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-white" />
            <span>Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            What Our Readers Say
          </h2>

          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-1 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-12 h-1 bg-white rounded-full"></div>
          </div>

          <p className="mx-auto max-w-3xl text-white/90 text-base sm:text-lg md:text-xl leading-relaxed px-4">
            Your experience matters to us. Here's what students, researchers,
            and book lovers are saying about ReadReach.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-7xl mx-auto">
          <Swiper
            onSwiper={setSwiperRef}
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={false}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            loop={testimonials.length > 3}
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
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="testimonial-swiper !pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!h-auto">
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            onClick={() => swiperRef?.slidePrev()}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-14 h-14 rounded-full bg-white text-[#ff7236] items-center justify-center hover:bg-[#ff7236] hover:text-white transition-all duration-300 shadow-xl hover:scale-110 group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => swiperRef?.slideNext()}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-14 h-14 rounded-full bg-white text-[#ff7236] items-center justify-center hover:bg-[#ff7236] hover:text-white transition-all duration-300 shadow-xl hover:scale-110 group"
          >
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20">
          {[
            { number: "5000+", label: "Happy Readers" },
            { number: "10K+", label: "Books Delivered" },
            { number: "4.9", label: "Average Rating" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-white/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .testimonial-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .testimonial-swiper .swiper-slide {
          height: auto;
          display: flex;
        }

        .testimonial-swiper .swiper-pagination {
          bottom: 0;
        }

        .testimonial-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          background: white;
          width: 40px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
