import React from "react";
import {
  Package,
  Clock,
  XCircle,
  CreditCard,
  Book,
  FileText,
  User,
  List,
  ArrowRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
 
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch order data from database;

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  //   fetch recent orders
  const { data: recentOrders = [] } = useQuery({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/recent-orders?email=${user.email}`);
      return res.data;
    },
  });

  // pending orders
  const pendingOrders = orders.filter((order) => order.status === "pending");
  //   processing orders
  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  );
  // shipped orders
  const shippedOrders = orders.filter((order) => order.status === "shipped");
  // delivered orders;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  //   cancel orders
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
  );

  // paid orders
  const paidOrders = orders.filter((order) => order.status === "processing");
  // Sample data for summary cards
  const summaryData = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: Package,
      changeType: "increase",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.length,
      icon: Clock,

      changeType: "neutral",
    },
    {
      title: "Cancelled Orders",
      value: cancelledOrders.length,
      icon: XCircle,

      changeType: "decrease",
    },
    {
      title: "Paid Orders",
      value: paidOrders.length,
      icon: CreditCard,

      changeType: "increase",
    },
  ];

  // Sample data for recent orders
  //   const recentOrders = [
  //     {
  //       id: "#ORD-1024",
  //       bookName: "The Great Gatsby",
  //       author: "F. Scott Fitzgerald",
  //       status: "Delivered",
  //       payment: "Paid",
  //       orderDate: "Dec 10, 2024",
  //       amount: "$12.99",
  //     },
  //     {
  //       id: "#ORD-1023",
  //       bookName: "To Kill a Mockingbird",
  //       author: "Harper Lee",
  //       status: "Shipped",
  //       payment: "Paid",
  //       orderDate: "Dec 12, 2024",
  //       amount: "$14.50",
  //     },
  //     {
  //       id: "#ORD-1022",
  //       bookName: "1984",
  //       author: "George Orwell",
  //       status: "Pending",
  //       payment: "Paid",
  //       orderDate: "Dec 13, 2024",
  //       amount: "$11.99",
  //     },
  //     {
  //       id: "#ORD-1021",
  //       bookName: "Pride and Prejudice",
  //       author: "Jane Austen",
  //       status: "Delivered",
  //       payment: "Paid",
  //       orderDate: "Dec 08, 2024",
  //       amount: "$13.25",
  //     },
  //     {
  //       id: "#ORD-1020",
  //       bookName: "The Catcher in the Rye",
  //       author: "J.D. Salinger",
  //       status: "Cancelled",
  //       payment: "Refunded",
  //       orderDate: "Dec 11, 2024",
  //       amount: "$15.00",
  //     },
  //   ];

  // Data for pie chart with brand colors
  const chartData = [
    { name: "Pending", value: pendingOrders.length, color: "#fbbf24" },
    { name: "Processing", value: processingOrders.length, color: "#0d5f2a" },
    { name: "Shipped", value: shippedOrders.length, color: "#60a5fa" },
    { name: "Delivered", value: deliveredOrders.length, color: "#34d399" },
  ];

  //   // Bar chart data for monthly overview
  //   const monthlyData = [
  //     { month: "Aug", orders: 15 },
  //     { month: "Sep", orders: 18 },
  //     { month: "Oct", orders: 22 },
  //     { month: "Nov", orders: 20 },
  //     { month: "Dec", orders: 24 },
  //   ];

  // Quick actions
  const quickActions = [
    {
      title: "Browse Books",
      icon: Book,
      description: "Explore our collection",
      path: "/books",
    },
    {
      title: "View All Orders",
      icon: List,
      description: "Track your orders",
      path: "/dashboard/orders",
    },
    {
      title: "View Invoices",
      icon: FileText,
      description: "Download receipts",
      path: "/dashboard/payment-history",
    },
    {
      title: "Profile",
      icon: User,
      description: "View your info",
      path: "/dashboard/profile",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-emerald-700 bg-emerald-50 border border-emerald-200";
      case "shipped":
        return "text-blue-700 bg-blue-50 border border-blue-200";
      case "pending":
        return "text-amber-700 bg-amber-50 border border-amber-200";
      case "cancelled":
        return "text-rose-700 bg-rose-50 border border-rose-200";
      default:
        return "text-gray-700 bg-gray-50 border border-gray-200";
    }
  };

  const getPaymentColor = (payment) => {
    return payment === "paid"
      ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
      : "text-rose-700 bg-rose-50 border border-rose-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff7236 0%, #ff9156 100%)",
                        boxShadow: "0 8px 32px rgba(255, 114, 54, 0.2)",
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">
                      {item.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                </div>
                <div
                  className="px-6 py-3 border-t border-gray-100"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,114,54,0.05) 0%, rgba(255,140,92,0.05) 100%)",
                  }}
                >
                  <p className="text-xs text-gray-500">At a Glance</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Orders Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200">
            <div
              className="px-6 py-5 border-b border-gray-200"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,114,54,0.05) 0%, rgba(255,140,92,0.05) 100%)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Recent Orders
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Your latest book deliveries
                  </p>
                </div>
                <NavLink
                  to="/dashboard/orders"
                  className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all text-white px-4 py-2 rounded-lg hover:shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff7236 0%, #ff9156 100%)",
                  }}
                >
                  View All <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-center py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {order.bookName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {order.author}
                          </p>
                          <p className="text-xs text-gray-400 mt-1 font-mono">
                            Order Date:{" "}
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold ${getPaymentColor(
                            order.payment
                          )}`}
                        >
                          {order.payment}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-900 text-sm">
                          ${order.price}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <NavLink
                          to="/dashboard/orders"
                          className="px-4 py-2 rounded-lg text-white font-medium text-sm hover:opacity-90 hover:shadow-lg transition-all"
                          style={{
                            background:
                              "linear-gradient(135deg, #ff7236 0%, #ff9156 100%)",
                          }}
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

          {/* Charts Section */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Order Distribution
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Current status breakdown
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {chartData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3 shadow-sm"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-600 mt-1">
              Navigate to commonly used features
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <NavLink
                  to={action.path}
                  key={index}
                  className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden bg-white"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff7236 0%, #ff9156 100%)",
                    }}
                  ></div>
                  <div className="relative z-10">
                    <div
                      className="p-4 rounded-xl mb-3 transition-all duration-300 group-hover:bg-white/20"
                      style={{ backgroundColor: "rgba(255, 114, 54, 0.1)" }}
                    >
                      <Icon className="w-7 text-[#ff7236] h-7 transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 group-hover:text-white transition-colors duration-300 block mb-1">
                      {action.title}
                    </span>
                    <span className="text-xs text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                      {action.description}
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
