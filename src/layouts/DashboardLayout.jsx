import React, { useState } from "react";
import Spinner from "../components/sharedComponents/spinner/Spinner";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardNav from "../components/dashboard/DashboardNav";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen overflow-y-auto shadow-2xl z-40">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Navigation */}
        <div className="sticky top-0 z-30 shadow-sm">
          <DashboardNav setIsSidebarOpen={setIsSidebarOpen} />
        </div>

        {/* Page Content */}
        <main className="overflow-y-auto bg-gray-50">
          <div className="container px-2 py-3 lg:px-3 lg:py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
