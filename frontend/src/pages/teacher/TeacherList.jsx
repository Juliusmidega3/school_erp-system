import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import LogoText from "../../components/LogoText";
import { Link, useNavigate } from "react-router-dom";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const res = await axiosInstance.get("/teachers/");
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      <LogoText />
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#065f46]">Teacher's List</h2>
          <Link
            to="/app/teachers/register"
            className="bg-white shadow p-3 rounded-lg hover:shadow-lg transition border border-gray-200 text-center"
          >
            ➕
          </Link>
        </div>

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
          <thead className="bg-[#065f46] text-white">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Gender</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone Number</th>
              <th className="py-2 px-4">Marital Status</th>
              <th className="py-2 px-4">Date Employed.</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length ? (
              teachers.map((s, index) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    {s.first_name} {s.last_name}
                  </td>
                  <td className="py-2 px-4 text-center">{s.gender}</td>
                  <td className="py-2 px-4 text-center">{s.email}</td>
                  <td className="py-2 px-4 text-center">{s.phone_number}</td>
                  <td className="py-2 px-4 text-center">{s.marital_status}</td>
                  <td className="py-2 px-4 text-center">{s.date_of_employment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-3">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherList;
