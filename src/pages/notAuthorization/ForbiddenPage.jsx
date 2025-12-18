import React, { useEffect } from "react";

const ForbiddenPage = () => {
  const handleGoLoginPage = () => {
    // Replace with your actual navigation logic
    window.location.href = "/login";
  };
   useEffect(() => {
    window.scrollTo(0,0);
  },[])
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-3 sm:px-4 py-4">
      <div className="max-w-xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header Section with Brand Color */}
          <div className="bg-[#ff7236] px-4 sm:px-6 py-6 sm:py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white rounded-full"></div>
            </div>

            {/* Shield Icon */}
            <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full mb-3 sm:mb-4 shadow-lg">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff7236]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
              Access Forbidden
            </h1>
            <p className="text-white text-opacity-90 text-sm sm:text-base">
              403 - Forbidden
            </p>
          </div>

          {/* Content Section */}
          <div className="px-4 sm:px-6 py-5 sm:py-6">
            <div className="text-center mb-4 sm:mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                You don't have permission to access this resource
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                This content is restricted. Contact your administrator if you
                need access to this resource.
              </p>
            </div>

            {/* Reasons List */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-5">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 sm:mb-3">
                Common Reasons:
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  "Your account lacks required permissions",
                  "This resource is admin-only",
                  "Your role doesn't allow this action",
                ].map((reason, index) => (
                  <li
                    key={index}
                    className="flex items-start text-gray-600 text-xs sm:text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-[#ff7236] mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button */}
            <div className="mb-4">
              <button
                onClick={handleGoLoginPage}
                className="w-full bg-[#ff7236] hover:bg-[#e66530] text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
              >
                Go to Login Page
              </button>
            </div>

            {/* Help Link */}
            <div className="text-center">
              <a
                href="/contact"
                className="text-[#ff7236] hover:text-[#e66530] font-medium transition duration-200 inline-flex items-center text-xs sm:text-sm"
              >
                Need help? Contact Support
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-4 text-gray-500 text-xs">
          <p>Error Code: 403</p>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
