import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import html2pdf from "html2pdf.js";

function FeeStructure() {
  const [feeData, setFeeData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("PP1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    axiosInstance
      .get("/fees/structure/")
      .then((res) => {
        console.log("Fee data:", res.data); // Log the data for debugging
        setFeeData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching fee data:", err);
        setError("Failed to load fee structure.");
        setLoading(false);
      });
  }, []);

  const handleDownload = () => {
    const element = printRef.current;
    const opt = {
      margin: 0.5,
      filename: `${selectedClass.replace(/\s/g, "_")}_Fee_Structure.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Find selected class data from feeData
  const selectedClassData = feeData.find((cls) => cls.name === selectedClass);
  console.log("Selected class data:", selectedClassData); // Log selected class data

  const structure = selectedClassData
    ? Object.entries(selectedClassData.term_fees).map(([term, items]) => ({
        term,
        items,
      }))
    : [];

  const currencyFormatter = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  });

  const total = structure.reduce((acc, item) => {
    return acc + item.items.reduce((t, x) => t + Number(x.amount), 0);
  }, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-800">Fee Structure</h2>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded p-2 bg-white"
        >
          {feeData.map((grade) => (
            <option key={grade.name} value={grade.name}>
              {grade.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading fee structure...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          {/* Printable Section */}
          <div ref={printRef} className="bg-white p-6 rounded shadow">
            {/* School Header */}
            <div className="text-center mb-6 border-b pb-4">
              <img src="/logo.png" alt="Logo" className="mx-auto h-20 mb-2" />
              <h1 className="text-2xl font-bold text-green-900">Faulu School</h1>
              <p className="text-sm text-gray-600 italic">
                Empowering Learners for Tomorrow
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Generated on: {currentDate}
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-2 text-green-700">
              Fee Structure for {selectedClass}
            </h3>

            {structure.length > 0 ? (
              structure.map((term, termIndex) => (
                <div key={`${selectedClass}-${term.term}-${termIndex}`} className="mb-4">
                  <h4 className="font-bold text-md mb-2 text-gray-700">{term.term}</h4>
                  <table className="w-full border border-gray-300 mb-2 text-sm">
                    <thead className="bg-green-700 text-white">
                      <tr>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-right">Amount (KES)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {term.items.map((item, idx) => (
                        <tr
                          key={`${selectedClass}-${term.term}-${item.category}-${idx}`}
                          className="border-t"
                        >
                          <td className="p-2">{item.category}</td>
                          <td className="p-2 text-right">
                            {currencyFormatter.format(Number(item.amount))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p className="text-red-600">No fee structure available for this class.</p>
            )}

            <div className="font-bold text-right text-green-800">
              Total per Year: {currencyFormatter.format(total)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleDownload}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Print
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FeeStructure;
