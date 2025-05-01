import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import LogoText from "../../components/LogoText";
import { Link, useNavigate } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get("/students/");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-[#065f46] tracking-wide">Student's List</h2>
          <Link
            to="/app/students/register"
            className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-lg shadow-md hover:shadow-xl transition-all ease-in-out duration-300"
          >
            ➕ Add Student
          </Link>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-[#065f46] text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium">#</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium">DOB</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Gender</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Parent's Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Parent's Tel</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Enrolled Class</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Admission No</th>
              </tr>
            </thead>
            <tbody>
              {students.length ? (
                students.map((s, index) => (
                  <tr
                    key={s.id}
                    className="border-b hover:bg-gray-50 transition-all ease-in-out duration-200"
                  >
                    <td className="py-3 px-4 text-sm">{index + 1}</td>
                    <td className="py-3 px-4 text-sm">{s.first_name} {s.last_name}</td>
                    <td className="py-3 px-4 text-sm text-center">{s.date_of_birth}</td>
                    <td className="py-3 px-4 text-sm text-center">{s.gender}</td>
                    <td className="py-3 px-4 text-sm text-center">{s.parent_name}</td>
                    <td className="py-3 px-4 text-sm text-center">{s.parent_phone}</td>
                    <td className="py-3 px-4 text-sm text-center">{s.enrolled_class}</td>
                    <td className="py-3 px-4 text-sm text-center">{s.admission_number}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-3 text-sm font-medium text-gray-500">
                    No students found.
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

export default StudentList;
