import { useState } from "react";
import { Menu, Settings, LogOut, User, Bell } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const DashboardNav = ({ setIsSidebarOpen }) => {
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden hover:bg-orange-50 p-2 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" style={{ color: "#f3701d" }} />
          </button>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
            Dashboard
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Notifications */}
          <button className="relative hover:bg-orange-50 p-2 rounded-lg transition-colors">
            <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: "#f3701d" }}
            ></span>
          </button>

          {/* Avatar & Logout */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 lg:gap-3 hover:bg-orange-50 p-2 rounded-lg transition-colors"
            >
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                  <img src={user?.photoURL} />
                </div>
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.displayName}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 flex items-center gap-2 border-t border-gray-200 mt-2"
                  style={{ color: "#f3701d" }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;
;
