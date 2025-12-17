import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import Book from "../../components/sharedComponents/book/Book";
import { useNavigate } from "react-router";
import { Search, SlidersHorizontal } from "lucide-react";

const Books = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all_books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-books");
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/server-error");
    }
  }, [error, navigate]);

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by price
    if (sortBy === "price-low") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  }, [books, searchTerm, sortBy]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <div className="text-center mb-10 mt-10">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
          All Available Books
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
      </div>

      {/* Search and Sort Controls */}
      <div className="mb-8 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, author, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="md:w-64">
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-gray-700 appearance-none bg-white cursor-pointer"
              >
                <option value="default">Sort by: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {filteredAndSortedBooks.length}
          </span>{" "}
          of <span className="font-semibold text-gray-800">{books.length}</span>{" "}
          books
        </div>
      </div>

      {/* All books */}
      {filteredAndSortedBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
          {filteredAndSortedBooks.map((book) => (
            <Book key={book._id} book={book}></Book>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No books found
          </h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Books;
