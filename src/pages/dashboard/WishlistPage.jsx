import {
  Heart,
  Trash2,
  ShoppingCart,
  Search,
  MapPin,
  Star,
  BookOpen,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarked, FaPhone, FaUser } from "react-icons/fa";

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

const WishlistPage = () => {
  const { user } = useAuth();
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const axiosSecure = useAxiosSecure();

  //   order modal state management;
  const [openOrder, setOpenOrder] = useState(false);
  const handleOrderOpen = (book) => {
    setSelectedBook(book);
    setOpenOrder(true);
  };
  const handleOrderClose = () => setOpenOrder(false);

  // fetch wishlist book from the database;
  const {
    data: wishlistBooks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["wishlistBook", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist-books?email=${user.email}`);
      return res.data;
    },
  });

  //   filtered book;

  const filteredBooks = wishlistBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //   manage order form;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // send the order data to database;

  const handleOrder = async (data) => {
    if (!selectedBook) return;
    const orderInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      createdAt: new Date(),
      bookName: selectedBook.title,
      price: selectedBook.price,
      bookImage: selectedBook.coverImage,
      librarian_email: selectedBook.librarian_email,
      bookId: selectedBook._id,
      payment: "unpaid",
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/order", orderInfo);
      if (res.data.insertedId) {
        reset();
        handleOrderClose();
        setSelectedBook(null);
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

  //   handle delete;
  const handleDelete = async (bookId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/delete-wishlist-book/${bookId}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
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
    window.scrollTo(0,0);
  },[])

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl flex items-center gap-4 font-bold text-slate-800 mb-2">
                <Heart className="text-red-500" fill="#ff7700" size={32} />
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-1">
                {wishlistBooks.length} books saved
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search books or authors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7700] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {wishlistBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No books found
            </h3>
            <p className="text-gray-600">
              {wishlistBooks.length === 0
                ? "Your wishlist is empty. Start adding books you'd like to read!"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-gray-200">
                  <tr className="text-white ">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider cursor-pointer ">
                      <div className="flex items-center gap-2">Author</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer">
                      <div className="flex items-center gap-2">Rating</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer ">
                      <div className="flex items-center gap-2">Library</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBooks.map((book) => (
                    <tr
                      key={book._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded shadow-sm"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">
                              {book.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              Added: {book.publishedDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{book.author}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-orange-50 text-[#ff7700] text-xs font-medium rounded-full">
                          {book.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star
                            size={16}
                            className="text-yellow-400"
                            fill="#facc15"
                          />
                          <span className="font-semibold text-gray-900">
                            {book.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <MapPin
                            size={16}
                            className="text-[#ff7700] mt-0.5 shrink-0"
                          />
                          <div>
                            <div className="text-sm text-gray-900 font-medium">
                              {book.libraryLocation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {book.status === "available" ? (
                          <span className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            Unavailable
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOrderOpen(book)}
                            disabled={
                              book.status === "available" ? false : true
                            }
                            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                              book.status === "available"
                                ? "bg-[#ff7700] text-white hover:bg-[#e66d00]"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                            title={
                              book.status
                                ? "Order this book"
                                : "Book not available"
                            }
                          >
                            <ShoppingCart size={16} />
                            Order
                          </button>
                          <button
                            onClick={() => handleDelete(book.bookId)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove from wishlist"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredBooks.map((book) => (
                <div key={book.id} className="p-4 hover:bg-gray-50">
                  <div className="flex gap-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded shadow-sm shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">
                            {book.author}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(book.bookId)}
                          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-color shrink-0"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mb-2 text-sm">
                        <span className="inline-block px-2 py-0.5 bg-orange-50 text-[#ff7700] text-xs font-medium rounded">
                          {book.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star
                            size={14}
                            className="text-yellow-400"
                            fill="#facc15"
                          />
                          <span className="font-semibold text-gray-900">
                            {book.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin size={14} className="text-[#ff7700] shrink-0" />
                        <span className="truncate">{book.libraryLocation}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {book.status === "available" ? (
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            Unavailable
                          </span>
                        )}
                        <button
                          onClick={() => handleOrderOpen(book)}
                          disabled={book.status === "available" ? false : true}
                          className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                            book.status === "available"
                              ? "bg-[#ff7700] text-white hover:bg-[#e66d00]"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          <ShoppingCart size={16} />
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
                  <FaMapMarked className="text-gray-400 mt-1" />
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

export default WishlistPage;
