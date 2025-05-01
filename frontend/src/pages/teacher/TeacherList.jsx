import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import LogoText from "../../components/LogoText";
import { Link } from "react-router-dom";

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
      <div className="px-6 py-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#065f46]">Teacher's List</h2>
          <Link
            to="/app/teachers/register"
            className="flex items-center gap-2 bg-[#065f46] text-white px-4 py-2 rounded-lg shadow hover:shadow-xl transition-all duration-200 border border-transparent hover:border-white"
          >
            ➕ <span className="hidden sm:inline">Add Teacher</span>
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#065f46] text-white sticky top-0 z-10">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">Marital Status</th>
                <th className="py-3 px-4">Date Employed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.length ? (
                teachers.map((s, index) => (
                  <tr
                    key={s.id}
                    className="hover:bg-gray-100 transition-all duration-150"
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      {s.first_name} {s.last_name}
                    </td>
                    <td className="py-3 px-4 text-center">{s.gender}</td>
                    <td className="py-3 px-4 text-center">{s.email}</td>
                    <td className="py-3 px-4 text-center">{s.phone_number}</td>
                    <td className="py-3 px-4 text-center">{s.marital_status}</td>
                    <td className="py-3 px-4 text-center">{s.date_of_employment}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeacherList;
