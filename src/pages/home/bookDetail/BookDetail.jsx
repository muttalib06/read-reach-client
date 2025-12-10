import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
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
import BookDetailTap from "../../../components/sharedComponents/book/BookDetailTap";
import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "95%",
    sm: "85%",
    md: "75%",
    lg: "65%",
    xl: "55%",
  },
  maxWidth: "900px",
  maxHeight: {
    xs: "90vh",
    sm: "85vh",
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: {
    xs: 2,
    sm: 3,
    md: 4,
  },
  borderRadius: 2,
  overflow: "auto",
};

const BookDetail = () => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = React.useState(false);
  const [count, setCount] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <div className="rounded-sm bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side - Book Image */}
          <div className="rounded-2xl p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-white lg:bg-transparent">
            <div className="w-full max-w-[280px] sm:max-w-sm">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Right Side - Book Details */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Title and Stock */}
            <div className="flex flex-col lg:flex-row sm:items-center sm:justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {book.title}
              </h1>
              <span
                className={`${
                  book.status === "available"
                    ? "text-green-600 font-semibold text-base sm:text-lg"
                    : "text-red-500 font-semibold text-base sm:text-lg"
                } inline-block`}
              >
                {book.status}
              </span>
            </div>

            {/* Author */}
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                Author:
              </p>
              <span className="text-blue-900 text-sm sm:text-base">
                {book.author}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-4 sm:line-clamp-none">
              {book.description}
            </p>

            {/* Price */}
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-500">
              ${book.price}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => {
                    if (count === 0) {
                      return;
                    }
                    setCount(count - 1);
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 hover:bg-gray-100 rounded-l-full transition-colors"
                >
                  <span className="text-lg sm:text-xl font-semibold">−</span>
                </button>
                <span className="px-4 sm:px-6 py-2 sm:py-3 min-w-[50px] sm:min-w-[60px] text-center font-semibold text-sm sm:text-base">
                  {count}
                </span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="px-4 sm:px-6 py-2 sm:py-3 hover:bg-gray-100 rounded-r-full transition-colors"
                >
                  <span className="text-lg sm:text-xl font-semibold">+</span>
                </button>
              </div>

              {/* Read A Little Button */}
              <button
                onClick={handleOpen}
                className="px-5 sm:px-8 py-2 sm:py-3 border-2 border-primary rounded-full font-semibold hover:bg-blue-50 transition text-sm sm:text-base whitespace-nowrap"
              >
                Read A Little
              </button>

              {/* Add To Cart Button */}
              <button className="px-5 sm:px-8 py-2 sm:py-3 bg-primary text-white rounded-full font-semibold transition text-sm sm:text-base whitespace-nowrap">
                Order Now
              </button>

              {/* Wishlist Button */}
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center transition">
                <AiOutlineHeart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Share Button */}
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                <AiOutlineShareAlt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* Book Information */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Row 1 */}
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base min-w-[100px]">
                    ISBN
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base break-all">
                    {book.isbn}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base min-w-[100px]">
                    Language
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {book.language}
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base min-w-[100px]">
                    Total page:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {book.pages}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base min-w-[100px]">
                    Publish Years:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {book.publishedYear}
                  </span>
                </div>

                {/* Row 3 */}
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base min-w-[100px]">
                    Category:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {book.category}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base min-w-[100px]">
                    Publisher
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {book.publisher}
                  </span>
                </div>

                {/* Row 4 */}
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base min-w-[100px]">
                    Library Location
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {book.libraryLocation}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base min-w-[100px]">
                    Total Copies
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    {book.totalCopies}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tap menu */}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <BookDetailTap book={book}></BookDetailTap>
      </div>

      {/* Modal */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={style}>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 sm:p-2 hover:bg-gray-100 rounded-full transition z-10"
              aria-label="Close modal"
            >
              <span className="text-xl sm:text-2xl">&times;</span>
            </button>

            <Typography
              className="text-center pr-8"
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                fontWeight: 600,
                mb: 2,
              }}
            >
              {book.title}
            </Typography>

            <Typography
              id="modal-modal-description"
              sx={{
                mt: 2,
                fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
                lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                color: "text.secondary",
              }}
            >
              {book.description} This book offers a meaningful and engaging
              reading experience designed to help readers explore new ideas,
              deepen their understanding, and enjoy the pleasure of learning.
              Whether you are a student, researcher, or general book lover, this
              title invites you into a thoughtful journey through knowledge,
              imagination, and discovery. Within these pages, you will find
              well-crafted writing, clear explanations, and valuable insights
              that make the subject both accessible and enjoyable. The book is
              structured in a way that encourages curiosity: each chapter
              unfolds with a balanced blend of information, storytelling, and
              reflection. Readers can expect to encounter fresh perspectives,
              practical examples, and memorable moments that spark deeper
              interest in the topic. This preview is intended to give you a
              small taste of the book's tone, style, and purpose. If you enjoy
              exploring ideas, connecting concepts, or simply relaxing with a
              good read, this book will be a wonderful companion. Feel free to
              continue reading, revisit sections, or discover new themes at your
              own pace. Every page has something meaningful to offer, and this
              is just a glimpse of what awaits you in the full reading
              experience. Enjoy your preview — and happy reading!
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default BookDetail;
