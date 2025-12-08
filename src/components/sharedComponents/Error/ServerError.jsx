import React from "react";

const ServerError = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
              />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          500 - Server error
        </h1>

        {/* Error Description */}
        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
          Oops something went wrong. Try to refresh this page or feel free to
          contact us if the problem persists.
        </p>
      </div>
    </div>
  );
};

export default ServerError;
