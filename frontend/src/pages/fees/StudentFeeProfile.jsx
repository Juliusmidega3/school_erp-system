import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FaDownload } from "react-icons/fa";

function StudentFeeProfile() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(`/fees/student/${admissionNo}/`);
      setData(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Profile not found or network error.");
    }
  };

  const getPaymentMethodStats = () => {
    const stats = {};
    if (data?.payments) {
      data.payments.forEach(({ method }) => {
        stats[method] = (stats[method] || 0) + 1;
      });
    }
    return stats;
  };

  const methodStats = getPaymentMethodStats();
  const progress = data ? Math.min((data.amount_paid / data.total_fees) * 100, 100) : 0;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#065f46]">Student Fee Profile</h2>
      
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Admission Number"
          className="border p-2 rounded w-full"
          value={admissionNo}
          onChange={(e) => setAdmissionNo(e.target.value)}
        />
        <button
          onClick={fetchProfile}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {data && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-lg mb-2">Name: {data.name}</h3>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="text-sm mb-1">
              Paid: KES {data.amount_paid.toLocaleString()} of KES {data.total_fees.toLocaleString()}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full text-xs text-white text-center"
                style={{ width: `${progress}%` }}
              >
                {Math.min(progress, 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Fee Summary */}
          <p>Total Fees: <strong>KES {data.total_fees.toLocaleString()}</strong></p>
          <p>Amount Paid: <strong>KES {data.amount_paid.toLocaleString()}</strong></p>
          <p>Balance: <strong className={data.balance < 0 ? "text-red-600" : ""}>
            KES {data.balance.toLocaleString()}
          </strong></p>

          {/* Payment Method Stats */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Payment Methods Used</h4>
            <ul className="text-sm list-disc list-inside">
              {Object.entries(methodStats).map(([method, count]) => (
                <li key={method}>{method}: {count} time(s)</li>
              ))}
            </ul>
          </div>

          {/* Payment History */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Payment History</h4>
            <div className="overflow-auto">
              <table className="min-w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Amount (KES)</th>
                    <th className="p-2 border">Method</th>
                    <th className="p-2 border">Receipt</th>
                    <th className="p-2 border">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {data.payments?.map((p, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2 border">{p.date}</td>
                      <td className="p-2 border">{p.amount.toLocaleString()}</td>
                      <td className="p-2 border">{p.method}</td>
                      <td className="p-2 border">{p.receipt}</td>
                      <td className="p-2 border text-center">
                        <button className="text-blue-600 hover:underline flex items-center gap-1">
                          <FaDownload /> PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.payments?.length === 0 && (
                    <tr><td colSpan={5} className="text-center p-4">No payments found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentFeeProfile;
