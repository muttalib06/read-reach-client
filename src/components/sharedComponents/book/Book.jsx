import React from "react";
import { CiStar } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";

const Book = () => {
  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded-lg shadow-sm">
      {/* Book Cover Image - Compact */}
      <div className="relative bg-gray-100 rounded-lg p-4 flex justify-center items-center mb-3 overflow-hidden group">
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>

        <img
          src="https://covers.openlibrary.org/b/isbn/9781451648539-L.jpg"
          alt="Grow Flower Book Cover"
          className="rounded h-40 w-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-110 cursor-pointer relative z-10"
        />

        {/* Quick View Button (appears on hover) */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 z-20 shadow-lg">
          Quick View
        </button>
      </div>

      {/* Category */}
      <p className="text-gray-500 text-xs mb-1">Design Low Book</p>

      {/* Title - Shorter */}
      <h1 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
        Simple Things You To Save BOOK
      </h1>

      {/* Price - Compact */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl font-bold text-orange-500">$30.00</span>
        <span className="text-sm text-gray-400 line-through">$39.99</span>
      </div>

      {/* Author and Rating - More Compact */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Wilson"
            alt="Wilson"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-gray-700 text-sm font-medium">Wilson</span>
        </div>

        {/* Star Rating - Smaller */}
        <div className="flex gap-0.5">
          <CiStar className="w-4 h-4 fill-orange-400 text-orange-400" />
          <CiStar className="w-4 h-4 fill-orange-400 text-orange-400" />
          <CiStar className="w-4 h-4 fill-orange-400 text-orange-400" />
          <CiStar className="w-4 h-4 fill-orange-400 text-orange-400" />
          <CiStar className="w-4 h-4 text-orange-400" />
        </div>
      </div>

      {/* Add to Cart Button - Compact */}
      <button className="w-full border border-primary hover:bg-primary text-black font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors text-sm">
        <LuShoppingCart className="w-4 h-4" />
        Add To Cart
      </button>
    </div>
  );
};

export default Book;
