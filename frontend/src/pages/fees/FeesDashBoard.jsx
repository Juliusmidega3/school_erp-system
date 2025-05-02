import React from "react";
import { Link } from "react-router-dom";

function FeesDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#065f46] mb-6">Fees Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/app/fees/add-payment" className="bg-green-50 p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-green-700 mb-2">➕ Add Payment</h2>
          <p className="text-gray-600 text-sm">Record a new student payment.</p>
        </Link>

        <Link to="/app/fees/structure" className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">📊 Fee Structure</h2>
          <p className="text-gray-600 text-sm">View the school's fee breakdown.</p>
        </Link>

        <Link to="/app/fees/student-profile" className="bg-yellow-50 p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">🧾 Student Fee Profile</h2>
          <p className="text-gray-600 text-sm">View and search individual student fees.</p>
        </Link>
      </div>
    </div>
  );
}

export default FeesDashboard;
