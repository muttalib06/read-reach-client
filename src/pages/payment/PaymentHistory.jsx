import React from "react";

const PaymentHistory = () => {
  const orders = [
    {
      id: "#199453",
      date: "Dec 10, 2025",
      bookName: "To Kill a Mockingbird",
      price: "$18.99",
    },
    {
      id: "#199454",
      date: "Dec 10, 2025",
      bookName: "Effective Java",
      price: "$54.99",
    },
    {
      id: "#a09d11",
      date: "Dec 11, 2025",
      bookName: "Effective Java",
      price: "$54.99",
    },
  ];
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          Transaction History
        </h1>
      </div>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Order Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Book Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 text-sm text-gray-900 font-medium">
                  {order.id}
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">
                  {order.date}
                </td>
                <td className="px-6 py-5 text-sm text-gray-900">
                  {order.bookName}
                </td>
                <td className="px-6 py-5 text-sm text-gray-900 font-semibold">
                  {order.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Order ID
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {order.id}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Price
                </p>
                <p className="text-lg font-bold text-gray-900">{order.price}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Order Date
                </p>
                <p className="text-sm text-gray-700">{order.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Book Name
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  {order.bookName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
