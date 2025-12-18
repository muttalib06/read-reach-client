import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/sharedComponents/spinner/Spinner";
import BookDetailTap from "../../../components/sharedComponents/book/BookDetailTap";
import { Box, Modal, Typography } from "@mui/material";
import { ShoppingCart } from "lucide-react";
import { CgUnavailable } from "react-icons/cg";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

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
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const axiosSecure = useAxiosSecure();

  // order modal state management;

  const [openOrder, setOpenOrder] = useState(false);
  const handleOrderOpen = () => setOpenOrder(true);
  const handleOrderClose = () => setOpenOrder(false);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const { id } = useParams();

  // fetch book data from database;
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

  // fetch user from the mongodb fo this user's email;

  const { data: role } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data.role;
    },
  });

  // get order of this book and user;

  const { data: order = undefined, refetch } = useQuery({
    queryKey: ["order", user.email],
    enabled: role === "user" && !!user?.email && !!book?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orderByIdAndEmail?email=${user.email}&bookId=${book._id}`
      );
      return res.data;
    },
  });

  // order form management;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // send the order data to database;

  const handleOrder = async (data) => {
    const orderInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      createdAt: new Date(),
      bookName: book.title,
      price: book.price,
      bookImage: book.coverImage,
      librarian_email: book.librarian_email,
      bookId: book._id,
      payment: "unpaid",
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/order", orderInfo);
      if (res.data.insertedId) {
        reset();
        refetch();
        handleOrderClose();
        Swal.fire({
          title: "Order submitted successfully",
          icon: "success",
          draggable: true,
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  // handle to add wish list;

  const handleToAddWishlist = async () => {
    try {
      const bookInfo = {
        ...book,
        email: user.email,
        bookId: book._id,
      };
      const res = await axiosSecure.post("/add-wishlist?email", bookInfo);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Added ot Wishlist",
          icon: "success",
          draggable: true,
        });
      }
      if (res.data.message === "Already in Wishlist") {
        Swal.fire({
          title: "Already in Wishlist",
          icon: "info",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/server-error");
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="rounded-sm bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side - Book Image */}
          <div className="rounded-2xl p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-white lg:bg-transparent">
            <div className="w-full max-w-[280px] sm:max-w-sm">
              <img
                src={book?.coverImage}
                alt={book?.title}
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
                {book?.status}
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

              {/* order button*/}
              <button
                disabled={book.status === "available" ? false : true}
                onClick={handleOrderOpen}
                className="group px-5 sm:px-8 py-2 sm:py-3 bg-primary text-white rounded-full font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap hover:bg-primary/90 hover:shadow-lg hover:scale-105 flex items-center gap-2"
              >
                {book.status === "available" ? (
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                ) : (
                  <CgUnavailable className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                )}

                <span>
                  {book.status === "available" ? "Order Now" : "Can't Order"}
                </span>
              </button>

              {/* Wishlist Button */}
              {role === "user" && (
                <button
                  onClick={() => handleToAddWishlist()}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <FaHeart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </button>
              )}
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
        <BookDetailTap book={book} order={order}></BookDetailTap>
      </div>

      {/* book modal*/}
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

      {/* order modal */}

      <div className="mt-20">
        <Modal
          open={openOrder}
          onClose={handleOrderClose}
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
              onClick={handleOrderClose}
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
              Order Now
            </Typography>

            <Typography
              id="modal-modal-description"
              component="div"
              sx={{
                mt: 2,
                fontSize: { xs: "0.875rem", sm: "0.95rem", md: "1rem" },
                lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                color: "text.secondary",
              }}
            >
              {/* Form */}
              <form
                onSubmit={handleSubmit(handleOrder)}
                className="p-4 space-y-3"
              >
                {/* Name (Readonly) */}
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <FaUser className="text-gray-400" />
                  <input
                    type="text"
                    {...register("name")}
                    value={user?.displayName}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                  />
                </div>

                {/*  Email (Readonly) */}
                {/*  Email readonly  */}
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-gray-400" />
                  <input
                    type="email"
                    {...register("email")}
                    value={user?.email}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg focus-within:border-orange-500 transition">
                  <FaPhone className="text-gray-400" />
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    placeholder="Phone Number *"
                    className="flex-1 text-sm outline-none"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}

                {/* Address */}
                <div className="flex items-start gap-2 p-3 border-2 border-gray-200 rounded-lg focus-within:border-orange-500 transition">
                  <FaMapMarkerAlt className="text-gray-400 mt-1" />
                  <textarea
                    placeholder="Delivery Address *"
                    {...register("address", {
                      required: "Address is required",
                    })}
                    rows="2"
                    className="flex-1 text-sm outline-none resize-none"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  // onClick={handleOrderClose}
                  type="submit"
                  className=" btn bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  Place Order
                </button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default BookDetail;
