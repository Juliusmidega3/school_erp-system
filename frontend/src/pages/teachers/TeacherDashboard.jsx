import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const TeacherDashboard = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axiosInstance.get("/teacher-dashboard/");
        setTeacherInfo(response.data);
      } catch (err) {
        setError("Failed to load teacher data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-[#065f46] mb-6">
          Teacher Dashboard
        </h2>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {teacherInfo && (
          <div>
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-700">
                Welcome, {teacherInfo.teacher.name}
              </h3>
              <p className="text-gray-600">{teacherInfo.teacher.email}</p>
            </div>

            <h4 className="text-xl font-semibold text-gray-700 mb-4">Assigned Classes</h4>
            {teacherInfo.classes.length > 0 ? (
              <ul className="space-y-2">
                {teacherInfo.classes.map((cls) => (
                  <li
                    key={cls.id}
                    className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition"
                  >
                    {cls.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">You are not assigned to any classes yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
