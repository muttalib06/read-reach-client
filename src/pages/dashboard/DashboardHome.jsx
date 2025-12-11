import React from "react";
import { BookOpen, Package, Users, BarChart3 } from "lucide-react";

const DashboardHome = () => {
  return (
    <div>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Books</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    1,248
                  </h3>
                </div>
                <BookOpen className="w-10 h-10" style={{ color: "#f3701d" }} />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Deliveries</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">45</h3>
                </div>
                <Package className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Readers</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">892</h3>
                </div>
                <Users className="w-10 h-10 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">This Month</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">234</h3>
                </div>
                <BarChart3 className="w-10 h-10" style={{ color: "#f3701d" }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Deliveries
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Your content goes here...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
