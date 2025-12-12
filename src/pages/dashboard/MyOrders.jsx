import React, { useEffect } from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import ServerError from "../../components/sharedComponents/Error/ServerError";
import { FaAmazonPay } from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  // load order data from database;
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });

  // handle payment;

  const handlePayment = async (orderedBook) => {
    const orderInfo = {
      orderName: orderedBook.bookName,
      email: orderedBook.email,
      price: orderedBook.price,
      bookId: orderedBook._id,
    };

    try {
      const res = await axiosSecure.post("/create-checkout-session", orderInfo);
      window.location.replace(res.data.url);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  // handle delete order
  const handleDelete = async (orderId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.patch(`/order-status/${orderId}`);
          if (res.deletedCount) {
            Swal.fire({
              title: "Cancelled!",
              text: "Your order has been cancelled.",
              icon: "success",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      navigate("/server-error");
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment?.toLowerCase()) {
      case "paid":
        return "text-green-800";
      case "unpaid":
        return "text-red-500";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            Order Management
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Track and manage your book orders
          </p>
        </div>

        {/* Desktop Table View - Hidden on Mobile/Tablet */}
        <div className="hidden lg:block shadow bg-white rounded-xl overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Order Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Book Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {order._id}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      {order.bookName}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 font-semibold">
                      ${order.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex text-xs font-medium ${getPaymentColor(
                          order.payment
                        )}`}
                      >
                        {order.payment || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {order.status === "pending" && (
                          <button
                            onClick={() => handlePayment(order)}
                            className="p-2 btn bg-primary  rounded-lg transition-colors"
                            title="View"
                          >
                            <FaAmazonPay className="text-2xl text-white" />
                          </button>
                        )}

                        {/* when no action needed */}

                        {order.status !== "pending" && (
                          <button disabled="true" className="btn">
                            No Action Needed
                          </button>
                        )}

                        {order.status === "pending" && (
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors btn"
                            title="Delete"
                          >
                            <MdCancelPresentation className="text-2xl" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile/Tablet Card View - Visible on Small Screens */}
        <div className="lg:hidden space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-5"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-200">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg sm:text-xl font-bold text-slate-900">
                    ${order.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Book Name */}
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-1 font-medium">
                  Book Name
                </p>
                <p className="text-sm sm:text-base text-slate-900 font-medium">
                  {order.bookName}
                </p>
              </div>

              {/* Status and Payment */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">
                    Order Status
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">
                    Payment Status
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border ${getPaymentColor(
                      order.payment
                    )}`}
                  >
                    {order.payment || "Pending"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {order.status === "pending" && (
                  <button
                    onClick={() => handlePayment(order)}
                    className="px-3 py-2 sm:py-2.5 bg-primary text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FaAmazonPay className="text-2xl text-white" />
                    <span className="hidden sm:inline">View</span>
                  </button>
                )}

                {order.status === "pending" && (
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="px-3 py-2 sm:py-2.5 text-red-500 text-xs sm:text-sm font-medium rounded-lg btn transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MdCancelPresentation className="text-2xl" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
