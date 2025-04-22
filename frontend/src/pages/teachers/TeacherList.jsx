import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import LogoText from "../../components/LogoText";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeachers = async () => {
    try {
      const res = await axiosInstance.get("/teachers/");
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      <LogoText />
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-[#065f46]">Teacher List</h2>
          <Link
            to="/teachers/register"
            className="bg-white border border-gray-200 shadow hover:shadow-lg px-4 py-2 rounded-lg text-sm text-[#065f46] font-medium transition"
          >
            ➕ Add Teacher
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
            <thead className="bg-[#065f46] text-white">
              <tr>
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-center">Gender</th>
                <th className="py-2 px-4 text-center">Email</th>
                <th className="py-2 px-4 text-center">Phone</th>
                <th className="py-2 px-4 text-center">Marital Status</th>
                <th className="py-2 px-4 text-center">DOB</th>
                <th className="py-2 px-4 text-center">Employment Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : teachers.length ? (
                teachers.map((t, i) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{i + 1}</td>
                    <td className="py-2 px-4">{`${t.first_name} ${t.last_name}`}</td>
                    <td className="py-2 px-4 text-center">{t.gender}</td>
                    <td className="py-2 px-4 text-center">{t.user?.email || "-"}</td>
                    <td className="py-2 px-4 text-center">{t.phone_number}</td>
                    <td className="py-2 px-4 text-center">{t.marital_status}</td>
                    <td className="py-2 px-4 text-center">{t.date_of_birth}</td>
                    <td className="py-2 px-4 text-center">{t.date_of_employment}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
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
};

export default TeacherList;
