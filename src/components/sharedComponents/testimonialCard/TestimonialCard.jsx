import React from "react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="w-full  max-w-sm bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      {/* Quote Icon */}
      <div className="mb-4 sm:mb-6">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-primary"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-900 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-medium">
        {testimonial.review}
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="shrink-0">
          <img
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br  flex items-center justify-center font-bold text-lg sm:text-xl"
            src={testimonial.image}
            alt=""
          />
        </div>

        {/* Name and Title */}
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 font-bold text-sm sm:text-base truncate">
            {testimonial.name}
          </h4>
          <p className="text-gray-500 text-xs sm:text-sm leading-snug">
            {testimonial.profession}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
