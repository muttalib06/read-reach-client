import React from "react";
import {
  Users,
  BookOpen,
  Package,
  DollarSign,
  UserCheck,
  Trash2,
  Settings,
  Check,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import Swal from "sweetalert2";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // fetch total users from database;

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // fetch total orders from database;

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-orders");
      return res.data;
    },
  });
  // fetch total books from database;

  const { data: books = [], refetch } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  //   unpublished book

  const unpublishedBooks = books.filter(
    (book) => book.published_status === "unpublished"
  );

  //   handle publish status;

  const handlePublishStatus = async (bookId, status) => {
    const publishedStatus = {
      published_status: status,
    };
    try {
      const res = await axiosSecure.patch(
        `/publish-status-update/${bookId}`,
        publishedStatus
      );

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Published status has been updated",
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

  // fetch total payments from database;

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-payments");
      return res.data;
    },
  });

  //   fetch normal user;

  const { data: normalUsers = [] } = useQuery({
    queryKey: ["normal-user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/fetch-role-based-user?role=user");
      return res.data;
    },
  });
  //   fetch librarian;

  const { data: librarians = [] } = useQuery({
    queryKey: ["librarian"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/fetch-role-based-user?role=librarian"
      );
      return res.data;
    },
  });
  //   fetch admin;

  const { data: admins = [] } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/fetch-role-based-user?role=admin");
      return res.data;
    },
  });

  // System overview data
  const systemOverview = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      changeType: "increase",
    },
    {
      title: "Total Books",
      value: books.length,
      icon: BookOpen,
      changeType: "neutral",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: Package,
      changeType: "increase",
    },
    {
      title: "Total Payment",
      value: payments.length,
      icon: DollarSign,
      changeType: "increase",
    },
  ];

  // User role breakdown data
  const roleData = [
    { name: "Users", value: normalUsers.length, color: "#3b82f6" },
    { name: "Librarians", value: librarians.length, color: "#10b981" },
    { name: "Admins", value: admins.length, color: "#ff7236" },
  ];

  // Dangerous actions
  const dangerousActions = [
    {
      title: "Delete Book",
      icon: Trash2,
      description: "Permanently remove books from system",
      path: "/dashboard/all-books",
    },
    {
      title: "Manage Roles",
      icon: UserCheck,
      description: "Modify user permissions and roles",
      path: "/dashboard/user-management",
    },
    {
      title: "System Settings",
      icon: Settings,
      description: "Configure critical system parameters",
    },
    {
      title: "Bulk Operations",
      icon: AlertTriangle,
      description: "Execute mass updates or deletions",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* System Overview Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            System Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemOverview.map((item, index) => {
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
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Books Pending Review */}
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
                    Books Pending Review
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Unpublished books awaiting approval
                  </p>
                </div>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  {unpublishedBooks.length} Unpublished
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-center py-4 px-6 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {unpublishedBooks.map((book) => (
                    <tr
                      key={book._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {book.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Submitted:{" "}
                            {new Date(book.addedToLibraryDate).toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-700">{book.author}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200">
                          {book.published_status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              handlePublishStatus(book._id, "published")
                            }
                            className="px-4 py-2 rounded-lg text-white font-medium text-sm hover:opacity-90 hover:shadow-lg transition-all flex items-center gap-1"
                            style={{
                              background:
                                "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                            }}
                          >
                            <Check className="w-4 h-4" />
                            Publish
                          </button>
                          <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Role Breakdown */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              User Role Breakdown
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Distribution by role type
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
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
            <div className="mt-4 space-y-3">
              {roleData.map((item, index) => (
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

        {/* Dangerous Actions Section */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-red-200 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Dangerous Actions
              </h2>
              <p className="text-sm text-red-600 mt-1">
                ⚠️ Admin-only operations - Use with caution
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dangerousActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <NavLink
                  to={action.path}
                  key={index}
                  onClick={action.action}
                  className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white hover:bg-red-50"
                >
                  <div className="relative z-10">
                    <div className="p-4 rounded-xl mb-3 bg-red-100 group-hover:bg-red-200 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-red-600 transition-colors duration-300" />
                    </div>
                    <span className="text-sm font-bold text-gray-900 transition-colors duration-300 block mb-1">
                      {action.title}
                    </span>
                    <span className="text-xs text-gray-600 transition-colors duration-300 text-center">
                      {action.description}
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-red-700 font-medium">
              <strong>Warning:</strong> These actions can permanently affect
              system data. Ensure you have proper authorization and backups
              before proceeding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
