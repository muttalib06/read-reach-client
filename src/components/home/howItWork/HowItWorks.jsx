import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <div className="relative">
          {/* Search Card */}
          <div
            className="w-28 h-16 rounded-xl shadow-2xl relative flex items-center justify-center"
            style={{
              background: "linear-gradient(to right, #f3701d, #ff8c42)",
            }}
          >
            {/* Search Icon */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                style={{ color: "#f3701d" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {/* Book Icon */}
            <div
              className="absolute -top-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transform rotate-12"
              style={{ backgroundColor: "#f3701d" }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
          </div>
          {/* Lines decoration */}
          <div className="absolute -left-12 top-4 space-y-1">
            <div className="w-16 h-1 bg-gray-300 rounded"></div>
            <div className="w-12 h-1 bg-gray-300 rounded"></div>
            <div className="w-14 h-1 bg-gray-300 rounded"></div>
          </div>
          {/* Dotted arc */}
          <svg
            className="absolute -right-24 top-0 w-32 h-16"
            viewBox="0 0 128 64"
          >
            <path
              d="M 10 32 Q 64 -20, 118 32"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>
        </div>
      ),
      title: "Search Your Library",
      description:
        "Browse through our extensive collection of books from partner libraries across Bangladesh",
    },
    {
      icon: (
        <div className="relative flex items-center justify-center h-20">
          {/* Delivery Options */}
          <div className="relative">
            {/* Pickup Icon */}
            <div
              className="w-16 h-16 rounded-xl shadow-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(to bottom right, #f3701d, #ff8c42)",
              }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            {/* Delivery Truck Icon */}
            <div
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "#f3701d" }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
            </div>
          </div>
          {/* Dotted arc left */}
          <svg
            className="absolute -left-24 top-0 w-32 h-16"
            viewBox="0 0 128 64"
          >
            <path
              d="M 118 32 Q 64 -20, 10 32"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>
          {/* Dotted arc right */}
          <svg
            className="absolute -right-24 top-0 w-32 h-16"
            viewBox="0 0 128 64"
          >
            <path
              d="M 10 32 Q 64 -20, 118 32"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>
        </div>
      ),
      title: "Request Pickup or Delivery",
      description:
        "Choose your preferred option - pick up from the library or get it delivered to your doorstep",
    },
    {
      icon: (
        <div className="relative flex items-end justify-center h-20">
          {/* Delivery Process - Stack of Books */}
          <div className="relative">
            {/* Books Stack */}
            <div className="relative w-20 h-16">
              <div
                className="absolute bottom-0 left-2 w-16 h-3 rounded transform -rotate-3"
                style={{ backgroundColor: "#ff9d66" }}
              ></div>
              <div
                className="absolute bottom-2 left-2 w-16 h-3 rounded transform rotate-2"
                style={{ backgroundColor: "#ff8c42" }}
              ></div>
              <div
                className="absolute bottom-4 left-2 w-16 h-3 rounded transform -rotate-1"
                style={{ backgroundColor: "#f3701d" }}
              ></div>
              <div
                className="absolute bottom-6 left-2 w-16 h-12 rounded-lg shadow-xl"
                style={{
                  background:
                    "linear-gradient(to bottom right, #f3701d, #ff8c42)",
                }}
              ></div>
            </div>
            {/* Shield/Safe Icon */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {/* Dotted arc left */}
          <svg
            className="absolute -left-24 top-0 w-32 h-16"
            viewBox="0 0 128 64"
          >
            <path
              d="M 118 32 Q 64 -20, 10 32"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>
          {/* Dotted arc right */}
          <svg
            className="absolute -right-24 top-0 w-32 h-16"
            viewBox="0 0 128 64"
          >
            <path
              d="M 10 32 Q 64 -20, 118 32"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>
        </div>
      ),
      title: "We Collect & Deliver Safely",
      description:
        "Our team ensures secure handling and timely delivery of your books to your location",
    },
    {
      icon: (
        <div className="relative">
          {/* Reading at Home */}
          <div
            className="w-32 h-20 rounded-xl shadow-2xl relative overflow-hidden flex items-center justify-center"
            style={{
              background: "linear-gradient(to bottom right, #f3701d, #ff8c42)",
            }}
          >
            {/* Book Icon */}
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            {/* Home Icon */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/30 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </div>
          {/* Happy Emoji */}
          <div
            className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-xl"
            style={{ backgroundColor: "#ff9d66" }}
          ></div>
          {/* Dotted arc */}
          <svg
            className="absolute -left-24 top-4 w-32 h-16"
            viewBox="0 0 128 64"
          >
            <path
              d="M 118 32 Q 64 -20, 10 32"
              stroke="black"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
          </svg>
        </div>
      ),
      title: "Enjoy Reading From Home",
      description:
        "Relax and immerse yourself in your favorite books from the comfort of your home",
    },
  ];

  return (
    <div className=" mt-10 rounded bg-[#f2f0ee] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 space-y-3">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              How it works
            </h1>
            <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            ReadReach makes book borrowing simple and convenient with our easy
            4-step process
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Icon Container */}
              <div className="flex justify-center items-center mb-8 h-28">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
