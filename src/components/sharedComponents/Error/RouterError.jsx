import React from "react";

const RouterError = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        {/* OOPS! Text */}
        <h1 className="text-7xl md:text-8xl font-light text-gray-800 mb-4 tracking-wide">
          OOPS!
        </h1>

        {/* 404 Subtitle */}
        <p className="text-gray-600 text-sm md:text-base mb-6 tracking-wider">
          404 - THE PAGE CAN'T BE FOUND
        </p>

        {/* Button */}
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded text-sm font-medium transition-colors duration-200">
          GO TO HOMEPAGE
        </button>
      </div>
    </div>
  );
};

export default RouterError;
