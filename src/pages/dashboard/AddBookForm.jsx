import React from "react";
import {
  BookOpen,
  Upload,
  Calendar,
  DollarSign,
  Package,
  MapPin,
  Clock,
} from "lucide-react";
import { useForm } from "react-hook-form";

const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Convert string 'true'/'false' to boolean for deliveryAvailable and pickupAvailable
    const formattedData = {
      ...data,
      deliveryAvailable: data.deliveryAvailable === 'true',
      pickupAvailable: data.pickupAvailable === 'true',
      publishedYear: Number(data.publishedYear),
      pages: Number(data.pages),
      price: Number(data.price),
      availableCopies: Number(data.availableCopies),
      totalCopies: Number(data.totalCopies),
      rentalDays: Number(data.rentalDays),
      lateFeePerDay: Number(data.lateFeePerDay)
    };
    console.log(formattedData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff7236] rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Book
          </h1>
          <p className="text-gray-600">
            Fill in the details to add a book to your library collection
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#ff7236]">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ISBN */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("isbn", { required: "ISBN is required" })}
                  type="text"
                  placeholder="978-0743273565"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                />
                {errors.isbn && (
                  <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
                )}
              </div>

              {/* Book Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title", { required: "Book title is required" })}
                  type="text"
                  placeholder="The Great Gatsby"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("author", { required: "Author name is required" })}
                  type="text"
                  placeholder="F. Scott Fitzgerald"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                )}
              </div>

              {/* Author Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Image URL
                </label>
                <input
                  {...register("authorImage")}
                  type="url"
                  placeholder="https://example.com/author.jpg"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="Classic Fiction">Classic Fiction</option>
                  <option value="Modern Fiction">Modern Fiction</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Biography">Biography</option>
                  <option value="History">History</option>
                  <option value="Science">Science</option>
                  <option value="Technology">Technology</option>
                  <option value="Self-Help">Self-Help</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition bg-white"
                >
                  <option value="">Select Status</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="reserved">Reserved</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                )}
              </div>

              {/* Cover Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("coverImage", { required: "Cover image URL is required" })}
                    type="url"
                    placeholder="https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                  />
                  <Upload className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.coverImage && (
                  <p className="text-red-500 text-sm mt-1">{errors.coverImage.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Publishing Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#ff7236]">
              Publishing Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Publisher */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publisher <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("publisher", { required: "Publisher is required" })}
                  type="text"
                  placeholder="Scribner"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                />
                {errors.publisher && (
                  <p className="text-red-500 text-sm mt-1">{errors.publisher.message}</p>
                )}
              </div>

              {/* Published Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Year <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("publishedYear", { 
                    required: "Published year is required",
                    min: { value: 1000, message: "Year must be at least 1000" },
                    max: { value: new Date().getFullYear(), message: "Year cannot be in the future" }
                  })}
                  type="number"
                  placeholder="2004"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                />
                {errors.publishedYear && (
                  <p className="text-red-500 text-sm mt-1">{errors.publishedYear.message}</p>
                )}
              </div>

              {/* Published Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Published Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("publishedDate", { required: "Published date is required" })}
                    type="date"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                  />
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.publishedDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.publishedDate.message}</p>
                )}
              </div>

              {/* Added to Library Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Added to Library Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("addedToLibraryDate", { required: "Added to library date is required" })}
                    type="date"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                  />
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.addedToLibraryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.addedToLibraryDate.message}</p>
                )}
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("language", { required: "Language is required" })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition bg-white"
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Arabic">Arabic</option>
                </select>
                {errors.language && (
                  <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>
                )}
              </div>

              {/* Pages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Pages <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("pages", { 
                    required: "Number of pages is required",
                    min: { value: 1, message: "Pages must be at least 1" }
                  })}
                  type="number"
                  placeholder="180"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                />
                {errors.pages && (
                  <p className="text-red-500 text-sm mt-1">{errors.pages.message}</p>
                )}
              </div>

              {/* Price */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("price", { 
                      required: "Price is required",
                      min: { value: 0, message: "Price must be at least 0" }
                    })}
                    type="number"
                    step="0.01"
                    placeholder="15.99"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                  />
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  rows="4"
                  placeholder="Enter book description..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition resize-none"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Inventory & Location Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#ff7236]">
              Inventory & Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Available Copies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Copies <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("availableCopies", { 
                      required: "Available copies is required",
                      min: { value: 0, message: "Available copies must be at least 0" }
                    })}
                    type="number"
                    placeholder="5"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                  />
                  <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.availableCopies && (
                  <p className="text-red-500 text-sm mt-1">{errors.availableCopies.message}</p>
                )}
              </div>

              {/* Total Copies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Copies <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("totalCopies", { 
                      required: "Total copies is required",
                      min: { value: 1, message: "Total copies must be at least 1" }
                    })}
                    type="number"
                    placeholder="8"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                  />
                  <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.totalCopies && (
                  <p className="text-red-500 text-sm mt-1">{errors.totalCopies.message}</p>
                )}
              </div>

              {/* Library Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Library Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("libraryLocation", { required: "Library location is required" })}
                    type="text"
                    placeholder="Central Library - Fiction Section A"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                  />
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.libraryLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.libraryLocation.message}</p>
                )}
              </div>

              {/* Shelf Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shelf Number <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("shelfNumber", { required: "Shelf number is required" })}
                  type="text"
                  placeholder="A-245"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                />
                {errors.shelfNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.shelfNumber.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Delivery & Rental Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-[#ff7236]">
              Delivery & Rental Options
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Available */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Available <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mt-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("deliveryAvailable", { required: "Delivery option is required" })}
                      type="radio"
                      value="true"
                      className="w-4 h-4 text-[#ff7236] focus:ring-[#ff7236] focus:ring-2"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("deliveryAvailable", { required: "Delivery option is required" })}
                      type="radio"
                      value="false"
                      className="w-4 h-4 text-[#ff7236] focus:ring-[#ff7236] focus:ring-2"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
                {errors.deliveryAvailable && (
                  <p className="text-red-500 text-sm mt-1">{errors.deliveryAvailable.message}</p>
                )}
              </div>

              {/* Pickup Available */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Available <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 mt-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("pickupAvailable", { required: "Pickup option is required" })}
                      type="radio"
                      value="true"
                      className="w-4 h-4 text-[#ff7236] focus:ring-[#ff7236] focus:ring-2"
                    />
                    <span className="ml-2 text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      {...register("pickupAvailable", { required: "Pickup option is required" })}
                      type="radio"
                      value="false"
                      className="w-4 h-4 text-[#ff7236] focus:ring-[#ff7236] focus:ring-2"
                    />
                    <span className="ml-2 text-gray-700">No</span>
                  </label>
                </div>
                {errors.pickupAvailable && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupAvailable.message}</p>
                )}
              </div>

              {/* Rental Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rental Days <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("rentalDays", { 
                      required: "Rental days is required",
                      min: { value: 1, message: "Rental days must be at least 1" }
                    })}
                    type="number"
                    placeholder="14"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                  />
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.rentalDays && (
                  <p className="text-red-500 text-sm mt-1">{errors.rentalDays.message}</p>
                )}
              </div>

              {/* Late Fee Per Day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Late Fee Per Day ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register("lateFeePerDay", { 
                      required: "Late fee per day is required",
                      min: { value: 0, message: "Late fee must be at least 0" }
                    })}
                    type="number"
                    step="0.01"
                    placeholder="0.50"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff7236] focus:border-transparent outline-none transition"
                  />
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                </div>
                {errors.lateFeePerDay && (
                  <p className="text-red-500 text-sm mt-1">{errors.lateFeePerDay.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 px-6 py-3 bg-[#ff7236] text-white font-medium rounded-lg hover:bg-[#e56530] transition shadow-lg shadow-[#ff7236]/30"
            >
              Add Book to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;