import React, { useState } from "react";
import { Eye, Edit2, Trash2, Search } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderDate: "2024-12-10",
      bookName: "The Art of Computer Programming",
      price: 89.99,
      status: "Delivered",
    },
    {
      id: 2,
      orderDate: "2024-12-09",
      bookName: "Clean Code",
      price: 45.5,
      status: "Shipped",
    },
    {
      id: 3,
      orderDate: "2024-12-08",
      bookName: "Design Patterns",
      price: 62.0,
      status: "Processing",
    },
    {
      id: 4,
      orderDate: "2024-12-07",
      bookName: "Introduction to Algorithms",
      price: 95.0,
      status: "Pending",
    },
    {
      id: 5,
      orderDate: "2024-12-05",
      bookName: "JavaScript: The Good Parts",
      price: 32.99,
      status: "Cancelled",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleView = (id) => {
    alert(`Viewing order #${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing order #${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-linear-to-br from-slate-50 to-slate-100">
      <div>
        {/* Header */}
        <div className="mb-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Order Management
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Track and manage your book orders
          </p>
        </div>

        {/* Desktop Table View - Hidden on Mobile/Tablet */}
        <div className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
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
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        #{order.id.toString().padStart(4, "0")}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(order.orderDate).toLocaleDateString("en-US", {
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
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(order.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(order.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No orders found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Showing {filteredOrders.length} of {orders.length} orders
              </span>
              <span className="font-medium">
                Total: $
                {filteredOrders
                  .reduce((sum, order) => sum + order.price, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Card View - Visible on Small Screens */}
        <div className="lg:hidden space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-5"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-200">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                      Order #{order.id.toString().padStart(4, "0")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {new Date(order.orderDate).toLocaleDateString("en-US", {
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

                {/* Status Badge */}
                <div className="mb-4">
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

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    onClick={() => handleView(order.id)}
                    className="px-3 py-2 sm:py-2.5 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye size={16} />
                    <span className="hidden sm:inline">View</span>
                  </button>
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="px-3 py-2 sm:py-2.5 bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Edit2 size={16} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="px-3 py-2 sm:py-2.5 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
              <p className="text-slate-500 text-sm sm:text-base">
                No orders found matching your search.
              </p>
            </div>
          )}

          {/* Mobile Footer Summary */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span className="text-slate-600 font-medium">
                  Total Orders:
                </span>
                <span className="font-bold text-slate-900">
                  {filteredOrders.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base pt-2 border-t border-slate-200">
                <span className="text-slate-600 font-medium">
                  Total Amount:
                </span>
                <span className="font-bold text-slate-900 text-lg">
                  $
                  {filteredOrders
                    .reduce((sum, order) => sum + order.price, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyOrders;
