import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function StudentFeeProfile() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [data, setData] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(`/fees/student/${admissionNo}/`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[#065f46]">Student Fee Profile</h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Admission Number"
          className="border p-2 rounded w-full"
          value={admissionNo}
          onChange={(e) => setAdmissionNo(e.target.value)}
        />
        <button onClick={fetchProfile} className="bg-green-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {data && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Name: {data.name}</h3>
          <p>Total Fees: KES {data.total_fees}</p>
          <p>Amount Paid: KES {data.amount_paid}</p>
          <p>Balance: KES {data.balance}</p>
        </div>
      )}
    </div>
  );
}

export default StudentFeeProfile;
