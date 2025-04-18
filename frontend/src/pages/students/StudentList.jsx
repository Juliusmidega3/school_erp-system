import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StudentForm from "../../components/StudentForm";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api
      .get("students/")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching the students", err);
      });
  }, []);

  // Handling editing
  const [editingStudent, setEditingStudent] = useState(null);

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleUpdate = async (formData, id) => {
    try {
      const response = await api.put(`students/${id}/`, formData);
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...response.data } : s))
      );
      setEditingStudent(null); // Close the form after update
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmed) return;
    console.log("Deleting student with ID:", id);
    try {
      await api.delete(`students/${id}/`);
      setStudents((prev) => prev.filter((s) => s.id !== id)); // Remove the student from list immediately
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Registered Students</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">First Name</th>
            <th className="py-2 px-4 border">Last Name</th>
            <th className="py-2 px-4 border">Gender</th>
            <th className="py-2 px-4 border">Class</th>
            <th className="py-2 px-4 border">Admission Number</th>
            <th className="py-2 px-4 border">D.O.B</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="text-center">
              <td className="py-2 px-4 border">{s.first_name}</td>
              <td className="py-2 px-4 border">{s.last_name}</td>
              <td className="py-2 px-4 border">{s.gender}</td>
              <td className="py-2 px-4 border">{s.class_enrolled}</td>
              <td className="py-2 px-4 border">{s.admission_number}</td>
              <td className="py-2 px-4 border">{s.date_of_birth}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingStudent && (
        <div className="mt-4 flex justify-center">
          <div className="w-1/2">
            <StudentForm
              initialData={editingStudent}
              onSubmit={handleUpdate}
              onCancel={() => setEditingStudent(null)} // Close form on cancel
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
