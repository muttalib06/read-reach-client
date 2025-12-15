import React from "react";
import { Receipt } from "lucide-react";

const NoPaymentHistory = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#ff7236] opacity-10 rounded-full blur-xl"></div>
            <div className="relative bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-full">
              <Receipt className="w-16 h-16 text-[#ff7236]" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No Payment History
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-2 text-base">
          You haven't made any payments yet.
        </p>

        {/* Suggestion */}
        <p className="text-gray-500 text-sm">
          Your transaction history will appear here once you borrow books.
        </p>
      </div>
    </div>
  );
};

export default NoPaymentHistory;
