import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GrTransaction } from "react-icons/gr";
import Spinner from "../../components/sharedComponents/spinner/Spinner";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      const handleVerifyPayment = async () => {
        try {
          const res = await axiosSecure.get(`/payment-status/${sessionId}`);
          setSessionData(res.data);
        } catch {
          navigate("/server-error");
        } finally {
          setLoading(false);
        }
      };

      handleVerifyPayment();
    } else {
      setLoading(false);
    }
  }, [axiosSecure, navigate, searchParams]);

  useEffect(() => {
    setTimeout(() => setAnimationComplete(true), 500);
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-2 sm:p-3">
      <div className="max-w-xl w-full">
        {/* Success Card */}
        <div
          className={`bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden transform transition-all duration-700 ${
            animationComplete ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Header Section with Icon */}
          <div className="bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 p-3 sm:p-4 text-center relative overflow-hidden">
            {/* Animated Checkmark */}
            <div className="relative inline-block mb-1.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-white mb-0.5 tracking-tight">
              Payment Successful!
            </h1>
            <p className="text-xs sm:text-sm text-white/95 font-medium">
              Your books are on their way 📚
            </p>
          </div>

          {/* Order Details Section */}
          <div className="p-3 sm:p-4">
            {/* Thank You Message */}
            <div className="text-center mb-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                Thank you for your order!
              </h2>
              <p className="text-xs text-slate-600 wrap-break-words">
                Confirmation sent to{" "}
                <span className="font-semibold text-amber-600 break-all">
                  {sessionData?.customer_email}
                </span>
              </p>
            </div>

            {/* Order Info Cards */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {/* Order ID */}
              <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-lg p-2.5 border border-amber-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-linear-to-br from-amber-500 to-amber-600 rounded flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-slate-500">
                      Order ID
                    </p>
                    <p className="font-bold text-slate-800 text-xs truncate">
                      {sessionData?.metadata.orderId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-lg p-2.5 border border-amber-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-linear-to-br from-amber-500 to-amber-600 rounded flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-slate-500">
                      Paid
                    </p>
                    <p className="font-bold text-slate-800 text-xs">
                      ${sessionData?.amount_total}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-linear-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-lg p-2.5 mb-3 border border-amber-200">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-amber-500 to-amber-600 rounded flex items-center justify-center shrink-0">
                  <GrTransaction />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-medium text-slate-500">
                    Transaction ID
                  </p>
                  <p className="font-bold text-slate-800 text-xs">
                    ${sessionData?.payment_intent}
                  </p>
                </div>
              </div>
            </div>

            {/* What's Next Section */}
            <div className="border-t border-slate-100 pt-2.5 mb-3">
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm mb-2 flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-amber-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>What's Next?</span>
              </h3>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <div className="w-4 h-4 bg-linear-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[9px] font-bold">1</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Email confirmation
                  </p>
                </li>
                <li className="flex items-start gap-1.5">
                  <div className="w-4 h-4 bg-linear-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[9px] font-bold">2</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Shipping notification
                  </p>
                </li>
                <li className="flex items-start gap-1.5">
                  <div className="w-4 h-4 bg-linear-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[9px] font-bold">3</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Track from account
                  </p>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mb-2.5">
              <NavLink
                to="/dashboard/orders"
                className="w-full sm:flex-1 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold py-2 px-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1 text-xs"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Order
              </NavLink>
              <NavLink
                to="/"
                className="w-full sm:flex-1 bg-white text-amber-600 font-bold py-2 px-3 rounded-lg border-2 border-amber-500 hover:bg-amber-50 transition-all duration-300 flex items-center justify-center gap-1 text-xs"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </NavLink>
            </div>

            {/* Support Section */}
            <div className="text-center text-[10px] bg-amber-50 rounded p-2 border border-amber-200">
              <p className="text-slate-600">
                Need help?{" "}
                <a
                  href="mailto:support@readreach.com"
                  className="text-amber-600 font-semibold hover:underline break-all"
                >
                  support@readreach.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-2 text-[9px] text-slate-600">
          <p className="flex items-center justify-center gap-1 bg-white/60 backdrop-blur-sm rounded-full px-2 py-1 mx-auto">
            <svg
              className="w-3 h-3 text-emerald-500 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Secured by Stripe</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
