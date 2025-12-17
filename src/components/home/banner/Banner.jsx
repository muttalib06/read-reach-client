import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ArrowRight, BookOpen, TrendingUp, Sparkles } from "lucide-react";
import { NavLink } from "react-router";

const Banner = () => {
  const sliders = [
    {
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80",
      title: "Library at Your Doorstep",
      description:
        "Request your favorite books and have them delivered directly to your home or office—no more waiting in lines.",
      icon: <BookOpen className="w-6 h-6" />,
      badge: "Fast Delivery",
    },
    {
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80",
      title: "Borrow, Read, Return—Simplified",
      description:
        "Enjoy hassle-free borrowing with our streamlined process. Keep books for up to 30 days with easy returns.",
      icon: <TrendingUp className="w-6 h-6" />,
      badge: "Easy Process",
    },
    {
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80",
      title: "Explore Thousands of Books",
      description:
        "Access a vast collection of books, research materials, and novels anytime, anywhere, without visiting the library.",
      icon: <Sparkles className="w-6 h-6" />,
      badge: "10K+ Books",
    },
  ];

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        speed={1200}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        className="banner-swiper"
      >
        {sliders.map((slider, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-sm">
              {/* Background Image with Parallax Effect */}
              <div
                className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-8000ms"
                style={{ backgroundImage: `url(${slider.image})` }}
              />

              {/* Gradient Overlays for Better Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

              {/* Content Container */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-full">
                  <div className="w-full lg:w-2/3 space-y-6 md:space-y-8 animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                      {slider.icon}
                      <span>{slider.badge}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                      {slider.title.split(" ").map((word, i) => (
                        <span
                          key={i}
                          className="inline-block animate-slide-up"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          {word}{" "}
                        </span>
                      ))}
                    </h1>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                      {slider.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <NavLink to="/books" className="group relative px-8 py-4 bg-linear-to-r from-[#ff7236] to-[#ff8c5a] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#ff7236]/50">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Explore Books
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-linear-to-r from-[#ff8c5a] to-[#ffaa7a] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </NavLink>

                      <NavLink to="/aboutUs" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                        Learn More
                      </NavLink>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 md:gap-8 pt-6">
                      <div className="text-white">
                        <div className="text-2xl md:text-3xl font-bold">
                          10K+
                        </div>
                        <div className="text-sm text-gray-300">
                          Books Available
                        </div>
                      </div>
                      <div className="text-white">
                        <div className="text-2xl md:text-3xl font-bold">
                          5K+
                        </div>
                        <div className="text-sm text-gray-300">
                          Happy Readers
                        </div>
                      </div>
                      <div className="text-white">
                        <div className="text-2xl md:text-3xl font-bold">
                          24/7
                        </div>
                        <div className="text-sm text-gray-300">
                          Service Available
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-[#ff7236]/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-20 right-40 w-32 h-32 bg-[#ff7236]/30 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
        <svg
          className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
        <svg
          className="w-6 h-6 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <style>{`
        .banner-swiper .swiper-pagination {
          bottom: 30px;
        }
        
        .banner-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s;
        }
        
        .banner-swiper .swiper-pagination-bullet-active {
          width: 40px;
          border-radius: 6px;
          opacity: 1;
          background: linear-gradient(to right, #ff7236, #ff8c5a);
        }
        
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
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }
        
        @media (max-width: 640px) {
          .banner-swiper .swiper-pagination {
            bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
