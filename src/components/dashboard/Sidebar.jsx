import React from "react";
import { X, Home, BookOpen } from "lucide-react";
import { LuBox } from "react-icons/lu";
import { NavLink } from "react-router";
import { GoHistory } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: LuBox, label: "Orders", path: "/dashboard/orders" },
    {
      icon: GoHistory,
      label: "Payment History",
      path: "/dashboard/payment-history",
    },
    {icon:IoIosAddCircle,label:"Add Book",path:"/dashboard/add-book"}
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full text-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static w-64 shadow-xl`}
        style={{ background: "linear-gradient(to bottom, #f3701d, #d15a10)" }}
      >
        {/* Logo Section */}
        <div className="flex shadow items-center justify-between p-6 border-b border-orange-600">
          <NavLink to="/" className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-xl font-bold">ReadReach</h1>
          </NavLink>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden hover:bg-orange-600 p-1 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/dashboard"} // Important: exact match for dashboard
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white hover:bg-gray-200 hover:text-black hover:bg-opacity-10 hover:translate-x-1"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 text-black left-0 right-0 p-4 border-t border-orange-600">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 text-sm">
            <p className="font-semibold mb-1">Need Help?</p>
            <p className="text-xs opacity-90">Contact support for assistance</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
