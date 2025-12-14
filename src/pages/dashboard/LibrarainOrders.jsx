import React, { useState } from "react";
import {
  ChevronDown,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const LibrarianOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch orders from mongodb of this librarian;

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/librarian-orders?email=${user.email}`
      );
      return res.data;
    },
  });
//   const [orders, setOrders] = useState([
//     {
//       id: "693e1b2ddcfdd433b640282e",
//       date: "Dec 14, 2025",
//       bookName: "To Kill a Mockingbird",
//       bookImage:
//         "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
//       price: "$18.99",
//       status: "pending",
//       customerName: "John Doe",
//       address: "123 Main St, New York",
//     },
//     {
//       id: "693e1b2ddcfdd433b640283f",
//       date: "Dec 13, 2025",
//       bookName: "1984",
//       bookImage:
//         "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
//       price: "$15.99",
//       status: "processing",
//       customerName: "Jane Smith",
//       address: "456 Oak Ave, Boston",
//     },
//     {
//       id: "693e1b2ddcfdd433b640284g",
//       date: "Dec 12, 2025",
//       bookName: "The Great Gatsby",
//       bookImage:
//         "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
//       price: "$14.50",
//       status: "shipped",
//       customerName: "Mike Johnson",
//       address: "789 Pine Rd, Chicago",
//     },
//     {
//       id: "693e1b2ddcfdd433b640285h",
//       date: "Dec 11, 2025",
//       bookName: "Pride and Prejudice",
//       bookImage:
//         "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop",
//       price: "$16.75",
//       status: "delivered",
//       customerName: "Sarah Wilson",
//       address: "321 Elm St, Seattle",
//     },
//   ]);

  const [openDropdown, setOpenDropdown] = useState(null);


//   status config;

  const statusConfig = {
    pending: {
      label: "Pending",
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    processing: {
      label: "Processing",
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    shipped: {
      label: "Shipped",
      icon: Truck,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
    },
    delivered: {
      label: "Delivered",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    cancelled: {
      label: "Cancelled",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
  };

  const statusOptions = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setOpenDropdown(null);
  };

  const StatusBadge = ({ status }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color} ${config.bg} border ${config.border}`}
      >
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Order Management
          </h1>
          <p className="text-gray-600">
            Manage and track all book delivery orders
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#2d3e50] text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Order ID
                  </th>
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
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-gray-600">
                        {order.id.substring(0, 12)}...
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {order.date}
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
                        {order.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === order.id ? null : order.id
                            )
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#f3701d] text-white rounded-lg hover:bg-[#d86318] transition-colors text-sm font-medium shadow-sm"
                        >
                          Change Status
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              openDropdown === order.id ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === order.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                            {statusOptions.map((status) => {
                              const config = statusConfig[status];
                              const Icon = config.icon;
                              return (
                                <button
                                  key={status}
                                  onClick={() =>
                                    handleStatusChange(order.id, status)
                                  }
                                  className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${config.color}`}
                                >
                                  <Icon size={16} />
                                  <span className="text-sm font-medium">
                                    {config.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
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
                    <p className="text-xs text-gray-500 mb-2">
                      Order: {order.id.substring(0, 16)}...
                    </p>
                    <p className="text-sm text-gray-600 mb-2">{order.date}</p>
                    <p className="text-lg font-bold text-[#f3701d]">
                      {order.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 font-medium">
                    Status:
                  </span>
                  <StatusBadge status={order.status} />
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === order.id ? null : order.id
                      )
                    }
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f3701d] text-white rounded-lg hover:bg-[#d86318] transition-colors text-sm font-medium shadow-sm"
                  >
                    Change Status
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === order.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === order.id && (
                    <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                      {statusOptions.map((status) => {
                        const config = statusConfig[status];
                        const Icon = config.icon;
                        return (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(order.id, status)}
                            className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${config.color}`}
                          >
                            <Icon size={16} />
                            <span className="text-sm font-medium">
                              {config.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {statusOptions.slice(0, 4).map((status) => {
            const count = orders.filter((o) => o.status === status).length;
            const config = statusConfig[status];
            return (
              <div
                key={status}
                className={`bg-white p-4 rounded-lg shadow-sm border ${config.border}`}
              >
                <div className={`text-2xl font-bold ${config.color} mb-1`}>
                  {count}
                </div>
                <div className="text-sm text-gray-600">{config.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LibrarianOrders;
