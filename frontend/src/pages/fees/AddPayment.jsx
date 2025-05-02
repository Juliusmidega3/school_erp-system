import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-hot-toast";

function AddPayment() {
  const [form, setForm] = useState({ admission_number: "", amount: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/fees/payments/", form);
      toast.success("Payment recorded successfully!");
      setForm({ admission_number: "", amount: "" });
    } catch (err) {
      console.error(err);
      toast.error("Error recording payment.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[#065f46]">Add Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">
        <input
          type="text"
          placeholder="Admission Number"
          className="w-full border p-2 rounded"
          value={form.admission_number}
          onChange={(e) => setForm({ ...form, admission_number: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount Paid"
          className="w-full border p-2 rounded"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPayment;
