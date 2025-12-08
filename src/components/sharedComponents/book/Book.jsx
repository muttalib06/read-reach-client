import React from "react";
import { CiStar } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";

const Book = ({ book }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm flex flex-col h-full">
      {/* Book Cover Image - Compact */}
      <div className="relative bg-gray-100 rounded-lg p-4 flex justify-center items-center mb-3 overflow-hidden group">
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>

        <img
          src={book.coverImage}
          alt={book.title}
          className="rounded h-40 w-auto object-cover transition-all duration-500 ease-in-out group-hover:scale-110 cursor-pointer relative z-10"
        />

        {/* Quick View Button (appears on hover) */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 z-20 shadow-lg">
          Quick View
        </button>
      </div>

      {/* Category */}
      <p className="text-gray-500 text-xs mb-1">{book.category}</p>

      {/* Title - Shorter */}
      <h1 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
        {book.title}
      </h1>

      {/* Price - Compact */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl font-bold text-orange-500">${book.price}</span>
      </div>

      {/* Spacer - pushes content below to bottom */}
      <div className="flex-grow"></div>

      {/* Author and Rating - More Compact with fixed min-height */}
      <div className="flex items-center justify-between mb-3 min-h-[24px]">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-700 text-sm font-medium">
            {book.author}
          </span>
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
      <button className="w-full border border-primary text-black font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-2 text-sm relative overflow-hidden group transition-colors duration-300 hover:text-white">
        <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
        <LuShoppingCart className="w-4 h-4 relative z-10" />
        <span className="relative z-10">Add To Cart</span>
      </button>
    </div>
  );
};

export default Book;
