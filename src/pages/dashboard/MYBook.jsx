import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Edit, EyeOff, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import Swal from "sweetalert2";

const MYBook = () => {
  const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const axiosSecure = useAxiosSecure();

  //   fetch book data of this librarian;

  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/librarian-book?email=${user.email}`);
      return res.data;
    },
  });

  //   handle publish status;

  const handlePublishStatus = async (status, bookId) => {
    const publishedStatus = {
      published_status: status,
    };
    try {
      const res = await axiosSecure.patch(
        `/publish-status-update/${bookId}`,
        publishedStatus
      );

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Published status has been updated",
          icon: "success",
          draggable: true,
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

  //   manage edit form;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   handle edit form
  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditOpen(true);
  };

  //   handle edit form submit

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Handle form submission here
    setIsEditOpen(false);
    try {
      const res = await axiosSecure.patch(
        `/book-update/${selectedBook._id}`,
        data
      );
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Book information has been updated successfully",
          icon: "success",
          draggable: true,
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

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (isEditOpen) {
    return (
      <div className="bg-gray-50 p-4 md:p-6 lg:p-8">
        <div>
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Edit Book Information
              </h1>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Edit Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="space-y-6">
              {/* Book Cover Preview */}
              {/* Book Cover Preview */}
              <div className="flex flex-col items-center pb-6 border-b">
                <img
                  src={selectedBook?.coverImage}
                  alt="Book Cover"
                  className="w-32 h-48 object-cover rounded-lg shadow-md mb-4"
                />
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL *
                </label>
                <input
                  type="text"
                  defaultValue={selectedBook?.coverImage}
                  {...register("coverImage", {
                    required: "Cover image URL is required",
                  })}
                  className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                />
                {errors.coverImage && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.coverImage.message}
                  </p>
                )}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISBN *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedBook?.isbn}
                    {...register("isbn", { required: "ISBN is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.isbn && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.isbn.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedBook?.title}
                    {...register("title", { required: "Title is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedBook?.author}
                    {...register("author", { required: "Author is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.author && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.author.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Image URL
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedBook?.authorImage}
                    {...register("authorImage")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedBook?.category}
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publisher *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedBook?.publisher}
                    {...register("publisher", {
                      required: "Publisher is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.publisher && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.publisher.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published Year *
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedBook?.publishedYear}
                    {...register("publishedYear", {
                      required: "Published year is required",
                      min: { value: 1000, message: "Year must be valid" },
                      max: {
                        value: new Date().getFullYear() + 1,
                        message: "Year cannot be in the future",
                      },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.publishedYear && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.publishedYear.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published Date
                  </label>
                  <input
                    type="date"
                    defaultValue={selectedBook?.publishedDate}
                    {...register("publishedDate")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Added to Library Date
                  </label>
                  <input
                    type="date"
                    defaultValue={selectedBook?.addedToLibraryDate}
                    {...register("addedToLibraryDate")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedBook?.language}
                    {...register("language", {
                      required: "Language is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.language && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.language.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pages *
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedBook?.pages}
                    {...register("pages", {
                      required: "Number of pages is required",
                      min: { value: 1, message: "Pages must be at least 1" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.pages && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pages.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={selectedBook?.price}
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows="4"
                  defaultValue={selectedBook?.description}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none resize-none"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Library Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Copies *
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedBook?.availableCopies}
                    {...register("availableCopies", {
                      required: "Available copies is required",
                      min: { value: 0, message: "Cannot be negative" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.availableCopies && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.availableCopies.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Copies *
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedBook?.totalCopies}
                    {...register("totalCopies", {
                      required: "Total copies is required",
                      min: { value: 1, message: "Must be at least 1" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.totalCopies && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.totalCopies.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    defaultValue={selectedBook?.status}
                    {...register("status", { required: "Status is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published Status *
                  </label>
                  <select
                    defaultValue={selectedBook?.published_status}
                    {...register("published_status", {
                      required: "Published status is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  >
                    <option value="">Select Status</option>
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                  </select>
                  {errors.published_status && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.published_status.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Library Location *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedBook?.libraryLocation}
                    {...register("libraryLocation", {
                      required: "Library location is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.libraryLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.libraryLocation.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shelf Number *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedBook?.shelfNumber}
                    {...register("shelfNumber", {
                      required: "Shelf number is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.shelfNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shelfNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Days *
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedBook?.rentalDays}
                    {...register("rentalDays", {
                      required: "Rental days is required",
                      min: { value: 1, message: "Must be at least 1 day" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.rentalDays && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.rentalDays.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Late Fee Per Day ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={selectedBook?.lateFeePerDay}
                    {...register("lateFeePerDay", {
                      required: "Late fee is required",
                      min: { value: 0, message: "Cannot be negative" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7700] focus:border-transparent outline-none"
                  />
                  {errors.lateFeePerDay && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lateFeePerDay.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={selectedBook?.deliveryAvailable}
                    {...register("deliveryAvailable")}
                    className="w-5 h-5 text-[#ff7700] border-gray-300 rounded focus:ring-[#ff7700]"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-700">
                    Delivery Available
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={selectedBook?.pickupAvailable}
                    {...register("pickupAvailable")}
                    className="w-5 h-5 text-[#ff7700] border-gray-300 rounded focus:ring-[#ff7700]"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-700">
                    Pickup Available
                  </label>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="flex-1 bg-[#ff7700] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e66900] transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            My Books
          </h1>
          <p className="text-gray-600 mt-2">
            All books you've added to the library
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2c3e50] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Book Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Book Name
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((bookData) => (
                  <tr
                    key={bookData?._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={bookData?.coverImage}
                        alt={bookData?.title}
                        className="w-20 h-28 object-cover rounded shadow-md"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-lg text-gray-800 mb-1">
                        {bookData?.title}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        by {bookData?.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {bookData.category}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            bookData?.published_status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {bookData?.published_status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEdit(bookData)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#ff7700] text-white rounded-lg hover:bg-[#e66900] transition-colors font-medium"
                          title="Edit Book"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>

                        {/* published status button */}

                        {bookData.published_status === "published" ? (
                          <button
                            onClick={() =>
                              handlePublishStatus("unpublished", bookData._id)
                            }
                            className={
                              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium bg-yellow-500 text-white hover:bg-yellow-600"
                            }
                          >
                            <EyeOff className="w-4 h-4" />
                            Unpublish Book
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handlePublishStatus("published", bookData._id)
                            }
                            className={
                              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium bg-green-500 text-white hover:bg-green-600"
                            }
                          >
                            <Eye className="w-4 h-4" />
                            Publish Book
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden p-4 space-y-4">
            {books.map((bookData) => (
              <div
                key={bookData}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex gap-4 mb-4">
                  <img
                    src={bookData.coverImage}
                    alt={bookData.title}
                    className="w-24 h-36 object-cover rounded shadow-md shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {bookData.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      by {bookData.author}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {bookData.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          bookData.published_status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {bookData.published_status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(bookData)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#ff7700] text-white rounded-lg hover:bg-[#e66900] transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Book
                  </button>

                  {/* published status button */}

                  {bookData.published_status === "published" ? (
                    <button
                      onClick={() =>
                        handlePublishStatus("unpublished", bookData._id)
                      }
                      className={
                        "flex items-center justify-center bg-yellow-500 text-white hover:bg-yellow-600 gap-2 px-4 py-3 rounded-lg transition-colors text-sm font-medium "
                      }
                    >
                      <EyeOff className="w-4 h-4" />
                      Unpublish Book
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handlePublishStatus("published", bookData._id)
                      }
                      className={
                        "flex items-center justify-center bg-green-500 text-white hover:bg-green-600 gap-2 px-4 py-3 rounded-lg transition-colors text-sm font-medium"
                      }
                    >
                      <Eye className="w-4 h-4" />
                      Publish Book
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MYBook;
