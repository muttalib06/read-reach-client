import React, { useState } from "react";
import {
  Book,
  Package,
  TrendingUp,
  TrendingDown,
  Plus,
  List,
  ShoppingCart,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import NoBookOrders from "../NoDataFond/NoBookOrders";

const LibrarianDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //   fetch total orders of this librarian;

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/librarian-orders?email=${user.email}`);
      return res.data;
    },
  });

  console.log(orders)

  //   total paid orders
  const paidOrders = orders.filter((order) => order.payment === "paid");
  // total unpaid orders
  const unpaidOrders = orders.filter((order) => order.payment === "unpaid");

  // fetch librarian book from database;
  const { data: totalBooks = [] } = useQuery({
    queryKey: ["librarianBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/librarian-book?email=${user.email}`);
      return res.data;
    },
  });

  //   published books;
  const publishedBooks = totalBooks.filter(
    (book) => book.published_status === "published"
  );

  // unpublished books;
  const unpublishedBooks = totalBooks.filter(
    (book) => book.published_status === "unpublished"
  );

  const summaryData = {
    totalBooks: totalBooks.length,
    publishedBooks: publishedBooks.length,
    unpublishedBooks: unpublishedBooks.length,
    totalOrders: orders.length,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-gray-50 to-orange-50/30">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
            <span className="text-sm text-gray-500 font-medium">
              Real-time data
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Books Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-linear-to-br from-[#ff7236] to-[#ff8c5a]"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-linear-to-br from-[#ff7236] to-[#ff8c5a] shadow-md">
                    <Book size={24} className="text-white" />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-gray-400 group-hover:text-[#ff7236] transition-colors"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">
                    Total Books
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {summaryData.totalBooks.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    In your library
                  </p>
                </div>
              </div>
            </div>

            {/* Published Books Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-linear-to-br from-[#ff7236] to-[#ff8c5a]"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-linear-to-br from-[#ff7236] to-[#ff8c5a] shadow-md">
                    <Book size={24} className="text-white" />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-gray-400 group-hover:text-[#ff7236] transition-colors"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">
                    Published
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {summaryData.publishedBooks.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    Available for orders
                  </p>
                </div>
              </div>
            </div>

            {/* Unpublished Books Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-linear-to-br from-[#ff7236] to-[#ff8c5a]"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-linear-to-br from-[#ff7236] to-[#ff8c5a] shadow-md">
                    <Book size={24} className="text-white" />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-gray-400 group-hover:text-[#ff7236] transition-colors"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">
                    Unpublished
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {summaryData.unpublishedBooks.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    Pending review
                  </p>
                </div>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-linear-to-br from-[#ff7236] to-[#ff8c5a]"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-linear-to-br from-[#ff7236] to-[#ff8c5a] shadow-md">
                    <Package size={24} className="text-white" />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-gray-400 group-hover:text-[#ff7236] transition-colors"
                  />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-1">
                    Total Orders
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {summaryData.totalOrders.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 font-medium">All time</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders Table */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Orders Needing Action
              </h2>
              
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-linear-to-r from-[#ff7236] to-[#ff8c5a]">
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Book Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-linear-to-r hover:from-orange-50/30 hover:to-transparent transition-all duration-200"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-gray-900">
                            {order.bookName}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600 font-medium">
                            {order.email}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {order.status === "Pending" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm bg-amber-100 text-amber-800 border border-amber-300">
                              <Clock size={14} /> Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 size={14} /> Shipped
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <NavLink
                           to="/dashboard/librarian-orders"
                            className="px-4 py-2 text-sm font-bold text-white rounded-lg bg-linear-to-r from-[#ff7236] to-[#ff8c5a] hover:shadow-lg hover:scale-105 transition-all duration-200"
                          >
                             View
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Book Performance */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Payment Status of Orders
              </h2>
              <div className="space-y-4">
                {/* Most Ordered */}
                <div className="relative bg-linear-to-br from-[#ff7236] to-[#ff8c5a] rounded-2xl shadow-xl p-6 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm shadow-md">
                        <TrendingUp size={18} className="text-white" />
                      </div>
                      <span className="text-xs font-bold text-white/90 uppercase tracking-wide">
                        Total Paid Orders
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-white">{paidOrders.length}</span>
                      <span className="text-sm text-white/80 font-medium">
                        total orders
                      </span>
                    </div>
                  </div>
                </div>

                {/* Least Ordered */}
                <div className="relative bg-white rounded-2xl shadow-xl p-6 border-2 border-[#ff7236]/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#ff7236]/5 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-lg bg-gray-100 shadow-md">
                        <TrendingDown size={18} className="text-gray-600" />
                      </div>
                      <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                        Total Unpaid Orders
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-gray-600">
                        {unpaidOrders.length}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">
                        total orders
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4">
                {/* Add New Book Button */}
                <NavLink to="/dashboard/add-book" className="block">
                  <button className="group relative w-full bg-white hover:bg-linear-to-br hover:from-[#ff7236] hover:to-[#ff8c5a] rounded-xl p-5 transition-all duration-300 shadow-md hover:shadow-xl border border-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#ff7236]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-linear-to-br from-[#ff7236] to-[#ff8c5a] shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Plus size={22} className="text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-bold text-gray-900 group-hover:text-white transition-colors text-lg">
                          Add New Book
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors mt-0.5">
                          Add to your catalog
                        </p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-gray-400 group-hover:text-white transition-colors"
                      />
                    </div>
                  </button>
                </NavLink>

                {/* My Books Button */}
                <NavLink to="/dashboard/my-book" className="block">
                  <button className="group relative w-full bg-white hover:bg-linear-to-br hover:from-[#ff7236] hover:to-[#ff8c5a] rounded-xl p-5 transition-all duration-300 shadow-md hover:shadow-xl border border-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#ff7236]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-linear-to-br from-[#ff7236] to-[#ff8c5a] shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <List size={22} className="text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-bold text-gray-900 group-hover:text-white transition-colors text-lg">
                          My Books
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors mt-0.5">
                          View all books
                        </p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-gray-400 group-hover:text-white transition-colors"
                      />
                    </div>
                  </button>
                </NavLink>

                {/* Manage Orders Button */}
                <NavLink to="/dashboard/librarian-orders">
                  <button className="group relative w-full bg-white hover:bg-linear-to-br hover:from-[#ff7236] hover:to-[#ff8c5a] rounded-xl p-5 transition-all duration-300 shadow-md hover:shadow-xl border border-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#ff7236]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-linear-to-br from-[#ff7236] to-[#ff8c5a] shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <ShoppingCart size={22} className="text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-bold text-gray-900 group-hover:text-white transition-colors text-lg">
                          Manage Orders
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors mt-0.5">
                          Track & fulfill orders
                        </p>
                      </div>
                      <ArrowUpRight
                        size={20}
                        className="text-gray-400 group-hover:text-white transition-colors"
                      />
                    </div>
                  </button>
                </NavLink>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LibrarianDashboardHome;
