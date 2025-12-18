import React, { useEffect, useState } from "react";
import { Search, Trash2, Eye, EyeOff } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import Swal from "sweetalert2";

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const axiosSecure = useAxiosSecure();

  // fetch data from mongodb database;
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  //   search function;
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  //   handle publish status update

  const handlePublishStatus = async (bookId, status) => {
    const publishStatus = {
      published_status: status,
    };
    try {
      const res = await axiosSecure.patch(
        `/publish-status-update/${bookId}`,
        publishStatus
      );
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Publish status has been updated",
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

  //   handle delete function;

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
        const res = await axiosSecure.delete(`/delete-book/${bookId}`);
        if (res.data.deletedCount) {
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

  if (isLoading) {
    return <Spinner></Spinner>;
  }

    useEffect(() => {
      window.scrollTo(0,0);
    },[])

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            Book Management
          </h1>
          <p className="text-gray-600">
            Manage your library books and their availability
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Search Section */}
          <div className="p-4 md:p-6 border-b border-gray-200 bg-linear-to-r from-white to-orange-50">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search books by title or author..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7236] focus:border-transparent transition-all"
                />
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Total Books:{" "}
                <span className="text-[#ff7236] font-bold">
                  {filteredBooks.length}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800 text-white border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded shadow-md ring-2 ring-gray-200"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-800">
                            {book.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {book.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{book.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${
                          book.published_status === "published"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {book.published_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {/* Show Unpublish button if book is published */}
                        {book.published_status === "published" && (
                          <button
                            onClick={() =>
                              handlePublishStatus(book._id, "unpublished")
                            }
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
                          >
                            <EyeOff className="w-4 h-4" />
                            Unpublish
                          </button>
                        )}

                        {/* Show Publish button if book is not published */}
                        {book.published_status !== "published" && (
                          <button
                            onClick={() =>
                              handlePublishStatus(book._id, "published")
                            }
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm bg-[#ff7236] text-white hover:bg-[#e86530]"
                          >
                            <Eye className="w-4 h-4" />
                            Publish
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="-4 border-b border-gray-200p hover:bg-orange-50 transition-colors"
              >
                <div className="flex gap-4 mb-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded shadow-md ring-2 ring-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">
                      {book.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      by {book.author}
                    </p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {book.category}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${
                      book.published
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {book.published ? "Published" : "Unpublished"}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                      book.published
                        ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        : "bg-[#ff7236] text-white hover:bg-[#e86530]"
                    }`}
                  >
                    {book.published ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Publish
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBooks.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No books found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
