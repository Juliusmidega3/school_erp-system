import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Sample mock data — replace with API later
const recentPayments = [
  { id: 1, name: "Jane Mwangi", class: "Grade 4", amount: 15000, date: "2025-05-02" },
  { id: 2, name: "Ali Yusuf", class: "PP2", amount: 12000, date: "2025-05-01" },
  { id: 3, name: "Grace Otieno", class: "Grade 2", amount: 18000, date: "2025-04-30" },
];

function FeesDashboard() {
  const cardData = [
    {
      to: "/app/fees/add-payment",
      title: "➕ Add Payment",
      subtitle: "Record a new student payment.",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      delay: 0.1,
    },
    {
      to: "/app/fees/structure",
      title: "📊 Fee Structure",
      subtitle: "View the school's fee breakdown.",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      delay: 0.2,
    },
    {
      // Update this to a real student ID or a future search page
      to: "/app/fees/student/1",
      title: "🧾 Student Fee Profile",
      subtitle: "View and search individual student fees.",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      delay: 0.3,
    },
  ];

  return (
    <div className="p-6 sm:p-8 bg-[#F9FAFB] min-h-screen">
      <h1 className="text-3xl font-bold text-[#065f46] mb-8">Fees Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cardData.map(({ to, title, subtitle, bgColor, textColor, delay }) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ scale: 1.03 }}
          >
            <Link
              to={to}
              className={`${bgColor} p-6 rounded-2xl shadow-md hover:shadow-lg transition block h-full`}
            >
              <h2 className={`text-xl font-semibold ${textColor} mb-2`}>{title}</h2>
              <p className="text-gray-600 text-sm">{subtitle}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-[#065f46] mb-4">🧾 Recent Transactions</h2>

        {recentPayments.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent transactions available.</p>
        ) : (
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Student</th>
                <th className="p-3 border-b">Class</th>
                <th className="p-3 border-b text-right">Amount (KES)</th>
                <th className="p-3 border-b text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((tx) => (
                <tr key={tx.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{tx.name}</td>
                  <td className="p-3">{tx.class}</td>
                  <td
                    className={`p-3 text-right ${
                      tx.amount > 15000 ? "text-green-600 font-medium" : ""
                    }`}
                  >
                    {tx.amount.toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    {new Intl.DateTimeFormat("en-KE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(tx.date))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FeesDashboard;
