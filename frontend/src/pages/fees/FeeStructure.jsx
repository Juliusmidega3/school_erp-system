import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FeeStructure() {
  const [structure, setStructure] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const item = structure.find(s => s.class_name === className && s.term === term);
      dataByTerm[term] = item || {
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Fee Structure</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {loading ? (
        <p>Loading fee structure...</p>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class:
            </label>
            <select
              className="border p-2 rounded w-full max-w-xs"
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
            <div className="bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Class: {selectedClass}
              </h3>
              <table className="min-w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2">Fee Type</th>
                    <th className="text-right p-2">Term 1</th>
                    <th className="text-right p-2">Term 2</th>
                    <th className="text-right p-2">Term 3</th>
                  </tr>
                </thead>
                <tbody>
                  {feeFields.map((field) => {
                    const grouped = groupByTerm(selectedClass);
                    return (
                      <tr key={field} className="border-t">
                        <td className="p-2 capitalize">{field}</td>
                        <td className="p-2 text-right">{grouped["Term 1"][field]}</td>
                        <td className="p-2 text-right">{grouped["Term 2"][field]}</td>
                        <td className="p-2 text-right">{grouped["Term 3"][field]}</td>
                      </tr>
                    );
                  })}
                  <tr className="font-bold border-t bg-gray-50">
                    <td className="p-2 text-green-800">Total</td>
                    <td className="p-2 text-right text-green-800">{groupByTerm(selectedClass)["Term 1"].total_fee}</td>
                    <td className="p-2 text-right text-green-800">{groupByTerm(selectedClass)["Term 2"].total_fee}</td>
                    <td className="p-2 text-right text-green-800">{groupByTerm(selectedClass)["Term 3"].total_fee}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FeeStructure;
