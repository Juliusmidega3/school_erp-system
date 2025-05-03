import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function FeeStructure() {
  const [structure, setStructure] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Fee Structure",
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [structureRes, classRes] = await Promise.all([
          axios.get("http://localhost:8000/api/fees/structure/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/classes/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStructure(structureRes.data);
        setClasses(classRes.data);
        setSelectedClass(classRes.data[0]?.id || "");
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const groupByTerm = (className) => {
    const terms = ["Term 1", "Term 2", "Term 3"];
    const dataByTerm = {};

    terms.forEach(term => {
      const filteredItems = structure.filter(s => s.class_name === className && s.term === term);

      dataByTerm[term] = filteredItems.length > 0 
        ? {
            tuition: filteredItems.reduce((sum, s) => sum + Number(s.tuition), 0),
            lunch: filteredItems.reduce((sum, s) => sum + Number(s.lunch), 0),
            transport: filteredItems.reduce((sum, s) => sum + Number(s.transport), 0),
            activity: filteredItems.reduce((sum, s) => sum + Number(s.activity), 0),
            development: filteredItems.reduce((sum, s) => sum + Number(s.development), 0),
            total_fee: filteredItems.reduce((sum, s) => sum + Number(s.total_fee), 0),
          }
        : {
            tuition: 0,
            lunch: 0,
            transport: 0,
            activity: 0,
            development: 0,
            total_fee: 0
          };
    });

    return dataByTerm;
  };

  const feeFields = ["tuition", "lunch", "transport", "activity", "development"];
  const groupedFees = selectedClass ? groupByTerm(selectedClass) : {};

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-green-900 mb-8 text-center">
          Fee Structure
        </h2>

        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

        {loading ? (
          <p className="text-center text-gray-600">Loading fee structure...</p>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-md font-medium text-gray-700 mb-2">
                Select Class:
              </label>
              <select
                className="border border-gray-300 p-3 rounded-lg w-full max-w-xs shadow-sm focus:ring-2 focus:ring-green-500"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedClass && (
              <>
                <div ref={printRef} className="bg-white p-6 shadow-xl rounded-2xl border border-green-100">
                  <h3 className="text-2xl font-bold text-green-700 mb-6">
                    Class: <span className="font-normal">{selectedClass}</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border text-sm text-gray-700">
                      <thead>
                        <tr className="bg-green-100 text-green-800">
                          <th className="text-left p-3">Fee Type</th>
                          <th className="text-right p-3">Term 1</th>
                          <th className="text-right p-3">Term 2</th>
                          <th className="text-right p-3">Term 3</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeFields.map((field, idx) => (
                          <tr
                            key={field}
                            className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                          >
                            <td className="p-3 capitalize font-medium">{field}</td>
                            <td className="p-3 text-right">
                              {Math.round(groupedFees["Term 1"]?.[field] || 0).toLocaleString()}
                            </td>
                            <td className="p-3 text-right">
                              {Math.round(groupedFees["Term 2"]?.[field] || 0).toLocaleString()}
                            </td>
                            <td className="p-3 text-right">
                              {Math.round(groupedFees["Term 3"]?.[field] || 0).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-green-50 border-t">
                          <td className="p-3 text-green-800">Total</td>
                          <td className="p-3 text-right text-green-800">
                            {Math.round(groupedFees["Term 1"]?.total_fee || 0).toLocaleString()}
                          </td>
                          <td className="p-3 text-right text-green-800">
                            {Math.round(groupedFees["Term 2"]?.total_fee || 0).toLocaleString()}
                          </td>
                          <td className="p-3 text-right text-green-800">
                            {Math.round(groupedFees["Term 3"]?.total_fee || 0).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Print Button */}
                <div className="mt-6 text-right">
                  <button
                    onClick={handlePrint}
                    className="px-6 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition"
                  >
                    Export as PDF / Print
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FeeStructure;
