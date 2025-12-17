import { Quote, Star } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="h-full group">
      <div className="h-full bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden transform hover:-translate-y-2">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff7236] to-[#ff8c5a]"></div>

        {/* Quote icon */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#ff7236]/10 to-[#ff8c5a]/10 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
          <Quote className="w-10 h-10 text-[#ff7236]/30" />
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4 relative z-10">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < (testimonial.rating || 5)
                  ? "text-[#ff7236] fill-[#ff7236]"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Testimonial text */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 flex-grow italic relative z-10">
          "{testimonial.feedback || testimonial.text || testimonial.review}"
        </p>

        {/* Divider */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-[#ff7236] to-transparent mb-6"></div>

        {/* User info */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff7236] to-[#ff8c5a] p-0.5">
              <img
                src={
                  testimonial.image ||
                  testimonial.avatar ||
                  `https://ui-avatars.com/api/?name=${testimonial.name}&background=ff7236&color=fff&size=200`
                }
                alt={testimonial.name}
                className="w-full h-full rounded-full object-cover bg-white"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-lg">
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-600">
              {testimonial.role || testimonial.designation || "Book Lover"}
            </p>
          </div>
        </div>

        {/* Decorative pattern */}
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#ff7236]">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
            <circle cx="30" cy="30" r="20" fill="currentColor" />
            <circle cx="70" cy="70" r="15" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
