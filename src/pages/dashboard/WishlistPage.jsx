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

const WishlistPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch wishlist book from the database;
  const { data: wishlistBooks = [], isLoading } = useQuery({
    queryKey: ["wishlistBook", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist-books?email=${user.email}`);
      return res.data;
    },
  });
  // Sample wishlist data
  //   const wishlistItems = [
  //     {
  //       id: 1,
  //       title: "The Midnight Library",
  //       author: "Matt Haig",
  //       category: "Fiction",
  //       rating: 4.5,
  //       cover:
  //         "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
  //       library: "Central Library",
  //       distance: "2.3 km",
  //       available: true,
  //       addedDate: "2024-12-15",
  //     },
  //     {
  //       id: 2,
  //       title: "Atomic Habits",
  //       author: "James Clear",
  //       category: "Self-Help",
  //       rating: 4.8,
  //       cover:
  //         "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=300&fit=crop",
  //       library: "North Branch Library",
  //       distance: "4.1 km",
  //       available: true,
  //       addedDate: "2024-12-14",
  //     },
  //     {
  //       id: 3,
  //       title: "Project Hail Mary",
  //       author: "Andy Weir",
  //       category: "Science Fiction",
  //       rating: 4.7,
  //       cover:
  //         "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop",
  //       library: "Downtown Library",
  //       distance: "5.8 km",
  //       available: false,
  //       addedDate: "2024-12-10",
  //     },
  //     {
  //       id: 4,
  //       title: "The Psychology of Money",
  //       author: "Morgan Housel",
  //       category: "Finance",
  //       rating: 4.6,
  //       cover:
  //         "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=200&h=300&fit=crop",
  //       library: "Central Library",
  //       distance: "2.3 km",
  //       available: true,
  //       addedDate: "2024-12-08",
  //     },
  //     {
  //       id: 5,
  //       title: "Educated",
  //       author: "Tara Westover",
  //       category: "Biography",
  //       rating: 4.9,
  //       cover:
  //         "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop",
  //       library: "West Side Library",
  //       distance: "3.5 km",
  //       available: true,
  //       addedDate: "2024-12-05",
  //     },
  //     {
  //       id: 6,
  //       title: "The Silent Patient",
  //       author: "Alex Michaelides",
  //       category: "Thriller",
  //       rating: 4.4,
  //       cover:
  //         "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&h=300&fit=crop",
  //       library: "East Branch Library",
  //       distance: "6.2 km",
  //       available: true,
  //       addedDate: "2024-12-03",
  //     },
  //   ];

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
                    <th className="px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center gap-2">Author</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                      <div className="flex items-center gap-2">Rating</div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-gray-100">
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
                  {wishlistBooks.map((book) => (
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
              {wishlistBooks.map((book) => (
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
                        <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-color shrink-0">
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
    </div>
  );
};

export default WishlistPage;
