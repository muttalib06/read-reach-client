import React, { useState } from "react";
import { Search, ChevronDown, Shield, UserCog } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import Swal from "sweetalert2";
import NoUsersFound from "./NoDataFond/NoUsersFound";

const UserManagementTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const axiosSecure = useAxiosSecure();

  // data fetch from database;

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  //   search filter;

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  //   handle user role by admin

  const handleUserRole = async (email, role) => {
    const userRole = {
      roleOfUser: role,
    };

    try {
      const res = await axiosSecure.patch(
        `/update-user-role?email=${email}`,
        userRole
      );
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "User role has been updated",
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

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "librarian":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      {users.length === 0 ? (
        <NoUsersFound></NoUsersFound>
      ) : (
        <div className="min-h-screen bg-linear-to-br  to-gray-50 p-4 md:p-6 lg:p-8">
          <div>
            {/* Header */}
            <div className="mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                User Management
              </h1>
              <p className="text-gray-600">Manage user roles and permissions</p>
            </div>

            {/* Card Container */}
            <div className="bg-white rounded-2xl ">
              {/* Search and Filter Section */}
              <div className="p-4 md:p-6 border-b border-gray-200 bg-linear-to-r from-white ">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search users by name or email..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff7236] focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Total Users:{" "}
                    <span className="text-[#ff7236] font-bold">
                      {filteredUsers.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block  rounded">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-800 text-white border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-orange-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={user.imageUrl}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-800">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative">
                            <button
                              onClick={() =>
                                setOpenDropdown(
                                  openDropdown === user._id ? null : user._id
                                )
                              }
                              className="flex items-center gap-2 px-4 py-2 bg-[#ff7236] text-white rounded-lg hover:bg-[#e86530] transition-colors font-medium text-sm"
                            >
                              Manage Role
                              <ChevronDown className="w-4 h-4" />
                            </button>

                            {openDropdown === user._id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <button
                                  onClick={() =>
                                    handleUserRole(user.email, "librarian")
                                  }
                                  disabled={user.role === "Librarian"}
                                  className="w-full px-4 py-3 text-left text-sm hover:bg-orange-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                  <UserCog className="w-4 h-4 text-blue-600" />
                                  <span>Make Librarian</span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleUserRole(user.email, "admin")
                                  }
                                  disabled={user.role === "Admin"}
                                  className="w-full px-4 py-3 text-left text-sm hover:bg-orange-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border-t border-gray-100 transition-colors"
                                >
                                  <Shield className="w-4 h-4 text-red-600" />
                                  <span>Make Admin</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden">
                {filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="p-4 border-b border-gray-200 hover:bg-orange-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <img
                          src={user.imageUrl}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span
                          className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getRoleBadgeColor(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {user.phone}
                      </span>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === user._id ? null : user._id
                          )
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#ff7236] text-white rounded-lg hover:bg-[#e86530] transition-colors font-medium text-sm"
                      >
                        Manage Role
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {openDropdown === user._id && (
                        <div className="mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <button
                            onClick={() =>
                              handleUserRole(user.email, "librarian")
                            }
                            disabled={user.role === "Librarian"}
                            className="w-full px-4 py-3 text-left text-sm hover:bg-orange-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <UserCog className="w-4 h-4 text-blue-600" />
                            <span>Make Librarian</span>
                          </button>
                          <button
                            onClick={() => handleUserRole(user.email, "admin")}
                            disabled={user.role === "Admin"}
                            className="w-full px-4 py-3 text-left text-sm hover:bg-orange-50 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border-t border-gray-100 transition-colors"
                          >
                            <Shield className="w-4 h-4 text-red-600" />
                            <span>Make Admin</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredUsers.length === 0 && (
                <div className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No users found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;
