import React, { useEffect } from "react";
import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import Swal from "sweetalert2";
import NoBookOrders from "./NoDataFond/NoBookOrders";

const LibrarianOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch orders from mongodb of this librarian;

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/librarian-orders?email=${user.email}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // status option

  const statusOptions = [
    {
      label: "pending",
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      label: "processing",
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "shipped",
      icon: Truck,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
    {
      label: "delivered",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      label: "cancelled",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
  ];

  // get status color;

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-300 t-green-800 border-green-200";
      case "shipped":
        return "bg-blue-300 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-300 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-orange-300 text-orange-800 border-orange-200";
      case "cancelled":
        return "bg-red-300 text-red-800 border-red-200";
      default:
        return "bg-gray-300 text-gray-800 border-gray-200";
    }
  };

  // handle status update;

  const handleStatusUpdate = async (orderId, orderStatus) => {
    const status = {
      orderStatus: orderStatus,
    };

    try {
      const res = await axiosSecure.patch(
        `/update-order-status/${orderId}`,
        status
      );
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Status has been updated successfully",
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

  return (
    <div>
      {orders.length === 0 ? (
        <NoBookOrders></NoBookOrders>
      ) : (
        <div className=" bg-gray-50 p-4 md:p-6 lg:p-8">
          <div>
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                Order Management
              </h1>
              <p className="text-gray-600">
                Manage and track all book delivery orders
              </p>
            </div>

            {/* Table Container */}
            <div className=" min-h-screen bg-white rounded-xl  border border-gray-200 ">
              {/* Desktop Table View */}
              <div className="hidden lg:block ">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#2d3e50] text-white">
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Order Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Book
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Order Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {new Date(order.createdAt).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={order.bookImage}
                              alt={order.bookName}
                              className="w-12 h-16 object-cover rounded shadow-sm"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {order.bookName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">
                            $ {order.price}
                          </span>
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
                          <div className="relative">
                            <details className="dropdown">
                              <summary className="btn m-1 bg-primary text-white">
                                status{" "}
                              </summary>
                              <ul className="space-y-4 menu dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
                                {statusOptions.map((option, index) => {
                                  const Icon = option.icon;
                                  return (
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(
                                          order._id,
                                          option.label
                                        )
                                      }
                                      className="flex  items-center gap-4 hover:bg-gray-300 px-1 py-2 rounded"
                                      key={index}
                                    >
                                      <Icon className="text-primary"></Icon>
                                      <span>{option.label}</span>
                                    </button>
                                  );
                                })}
                              </ul>
                            </details>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex gap-4 mb-4">
                      <img
                        src={order.bookImage}
                        alt={order.bookName}
                        className="w-20 h-28 object-cover rounded-lg shadow-sm shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {order.bookName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <p className="text-lg font-bold text-[#f3701d]">
                          $ {order.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500 font-medium">
                        Status:
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="relative">
                      <details className="dropdown">
                        <summary className="btn m-1 bg-primary text-white">
                          status{" "}
                        </summary>
                        <ul className="space-y-4 menu dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
                          {statusOptions.map((option, index) => {
                            const Icon = option.icon;
                            return (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(order._id, option.label)
                                }
                                className="flex  items-center gap-4 hover:bg-gray-300 px-1 py-2 rounded"
                                key={index}
                              >
                                <Icon className="text-primary"></Icon>
                                <span>{option.label}</span>
                              </button>
                            );
                          })}
                        </ul>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibrarianOrders;
