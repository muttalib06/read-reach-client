import React, { useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Spinner from "../../components/sharedComponents/spinner/Spinner";
import useAuth from "../../hooks/useAuth";
import NoPaymentHistory from "./NoDataFond/NoPaymentHistroy";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (error) {
      navigate("/server-error");
    }
  }, [navigate, error]);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      {payments.length === 0 ? (
        <NoPaymentHistory></NoPaymentHistory>
      ) : (
        <div className="w-full max-w-6xl mx-auto p-4">
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
              Transaction History ({payments.length})
            </h1>
          </div>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Book Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Payment Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-5 text-sm text-gray-900 font-medium">
                      {payment.transactionId}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      {payment.bookName}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-900">
                      {new Date(payment.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-900 font-semibold">
                      $ {payment.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Transaction ID
                    </p>
                    <p className="text-[.6rem] font-semibold text-gray-900">
                      {payment.transactionId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Book Name
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {" "}
                      {payment.bookName}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Payment Date
                    </p>
                    <p className="text-sm text-gray-700">
                      {" "}
                      {new Date(payment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Amount
                    </p>
                    <p className="text-sm text-gray-900 font-medium">
                      {payment.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
