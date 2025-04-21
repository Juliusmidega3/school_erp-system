// src/pages/teachers/TeacherDashboard.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import LogoText from "../../components/LogoText";

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState({});
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  // Fetch data when the page loads
  useEffect(() => {
    const fetchTeacherData = async () => {
      const token = localStorage.getItem("teacherToken");
      if (!token) {
        navigate("/teacher-login");
        return;
      }

      try {
        const response = await axiosInstance.get("/api/teacher-dashboard/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeacherData(response.data.teacher);
        setClasses(response.data.classes);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        navigate("/teacher-login");
      }
    };
    fetchTeacherData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("teacherToken");
    navigate("/teacher-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <LogoText />
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-[#065f46] mb-6">Welcome, {teacherData.name} 👋</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">My Classes</h2>
          <ul className="space-y-4 mt-4">
            {classes.length === 0 ? (
              <li className="text-gray-500">No classes assigned yet.</li>
            ) : (
              classes.map((cls) => (
                <li key={cls.id} className="p-4 border border-gray-200 rounded shadow-sm">
                  <p className="text-lg font-medium text-gray-800">{cls.name}</p>
                  <p className="text-gray-500">Students: {cls.student_count}</p>
                </li>
              ))
            )}
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 py-2 px-6 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
