import React from "react";

const StarIcon = ({ filled }) => (
  <svg
    className="w-5 h-5 sm:w-6 sm:h-6"
    fill={filled ? "#FF8A00" : "none"}
    stroke={filled ? "#FF8A00" : "#D1D5DB"}
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const BookReview = ({ order }) => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white">
      <div>
        {/* Existing Review */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-6 border-b border-gray-200">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Leslie Alexander"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                  Leslie Alexander
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  February 10, 2024 at 2:37 pm
                </p>
              </div>
              <div className="flex gap-1">
                <StarIcon filled={true} />
                <StarIcon filled={true} />
                <StarIcon filled={true} />
                <StarIcon filled={true} />
                <StarIcon filled={false} />
              </div>
            </div>
            <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
              Neque porro est qui dolorem ipsum quia quaed inventor veritatis et
              quasi architecto var sed efficitur turpis gilla sed sit amet
              finibus eros. Lorem Ipsum is simply dummy
            </p>
          </div>
        </div>

        {/* Review Form */}
        <div className="mt-6 sm:mt-8">
          {/* Rating Section */}
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Your Rating*
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-700 sm:mr-2">
                Your Rating*
              </span>
              <div className="flex gap-1">
                <StarIcon filled={false} />
                <StarIcon filled={false} />
                <StarIcon filled={false} />
                <StarIcon filled={false} />
                <StarIcon filled={false} />
              </div>
            </div>
          </div>

          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Your Name*
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
                Your Email*
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2">
              Message*
            </label>
            <textarea
              placeholder="Write Message"
              rows="5"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2 mb-6">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 mt-0.5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="terms" className="text-xs sm:text-sm text-gray-700">
              I Accept Your{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            disabled={!order}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-full transition-colors disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
          >
            Submit Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookReview;
