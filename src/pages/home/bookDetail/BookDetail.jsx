import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/sharedComponents/spinner/Spinner";
import ServerError from "../../../components/sharedComponents/Error/ServerError";
const BookDetail = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookById/${id}`);
      return res.data;
    },
  });

  //   the page start form the top after navigate;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <ServerError code={error.status}></ServerError>
      </div>
    );
  }
  return (
    <div className="min-h-screen rounded-sm bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Book Image */}
          <div className="rounded-2xl p-8 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <img
                src={book.coverImage}
                alt="Castle The Sky"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right Side - Book Details */}
          <div className="space-y-6">
            {/* Title and Stock */}
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
              <span
                className={`${
                  book.status === "available"
                    ? "text-green-600 font-semibold text-lg"
                    : "text-red-500 font-semibold text-lg"
                }`}
              >
                {book.status}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <p className="font-semibold text-gray-900">Author:</p>
              </div>
              <span className="text-blue-900 text-sm">{book.author}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{book.description}</p>

            {/* Price */}
            <div className="text-5xl font-bold text-orange-500">
              ${book.price}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-full">
                <button className="px-6 py-3 hover:bg-gray-100 rounded-l-full">
                  <span className="text-xl font-semibold">−</span>
                </button>
                <span className="px-6 py-3 min-w-[60px] text-center font-semibold">
                  1
                </span>
                <button className="px-6 py-3 hover:bg-gray-100 rounded-r-full">
                  <span className="text-xl font-semibold">+</span>
                </button>
              </div>

              {/* Read A Little Button */}
              <button className="px-8 py-3 border-2 border-primary  rounded-full font-semibold hover:bg-blue-50 transition">
                Read A Little
              </button>

              {/* Add To Cart Button */}
              <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold  transition">
                Order Now
            
              </button>

              {/* Wishlist Button */}
              <button className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center  transition">
                <AiOutlineHeart className="w-5 h-5" />
              </button>

              {/* Share Button */}
              <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                <AiOutlineShareAlt className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Book Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Row 1 */}
                <div className="flex gap-3">
                  <span className="font-semibold text-gray-900 min-w-[100px]">
                    ISBN
                  </span>
                  <span className="text-gray-600">{book.isbn}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-gray-900 min-w-[120px]">
                    Language
                  </span>
                  <span className="text-gray-600">{book.language}</span>
                </div>

                {/* Row 2 */}
                <div className="flex gap-3">
                  <span className="font-semibold text-gray-900 min-w-[100px]">
                    Total page:
                  </span>
                  <span className="text-gray-600">{book.pages}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-gray-900 min-w-[120px]">
                    Publish Years:
                  </span>
                  <span className="text-gray-600">{book.publishedYear}</span>
                </div>

                {/* Row 3 */}
                <div className="flex gap-3">
                  <span className="font-semibold text-gray-900 min-w-[100px]">
                    Category:
                  </span>
                  <span className="text-gray-600">{book.category}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-gray-900 min-w-[120px]">
                    Publisher
                  </span>
                  <span className="text-gray-600">{book.publisher}</span>
                </div>

                {/* Row 4 */}
                <div className="flex gap-3">
                  <span className="font-semibold text-gray-900 min-w-[100px]">
                    Library Location
                  </span>
                  <span className="text-gray-600">{book.libraryLocation}</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold text-gray-900 min-w-[120px]">
                    Total Copies
                  </span>
                  <span className="text-gray-600">{book.totalCopies}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
