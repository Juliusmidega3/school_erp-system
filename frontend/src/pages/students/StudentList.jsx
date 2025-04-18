import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "../../components/StudentForm";
import logo from "../../assets/faulu-logo.png";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  // Fetch students from the API
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/students/");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // Call fetchStudents when the component is mounted
  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete a student
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Handle form submit for creating or updating a student
  const handleFormSubmit = async (formData, id) => {
    try {
      if (id) {
        // Update student if there's an ID
        await axios.put(`http://127.0.0.1:8000/api/students/${id}/`, formData);
      } else {
        // Add new student if there's no ID
        await axios.post("http://127.0.0.1:8000/api/students/", formData);
      }
      fetchStudents();
      setShowForm(false);
      setEditStudent(null);
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  // Edit an existing student's data
  const handleEdit = (student) => {
    setEditStudent(student);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Add a new student (reset the form)
  const handleAddNew = () => {
    setEditStudent(null);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Cancel the form (hide it and reset data)
  const handleCancel = () => {
    setShowForm(false);
    setEditStudent(null);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      <div className="flex items-center gap-4 px-6 py-4 shadow bg-white">
        <img src={logo} alt="Faulu School Logo" className="h-12 w-12 object-contain" />
        <h1 className="text-3xl font-bold text-[#065f46]">
          Faulu School Management System
        </h1>
      </div>

      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#065f46]">Student List</h2>
          <button
            onClick={handleAddNew}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add New Student
          </button>
        </div>

        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
          <thead className="bg-[#065f46] text-white">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Gender</th>
              <th className="py-2 px-4">DOB</th>
              <th className="py-2 px-4">Class</th>
              <th className="py-2 px-4">Guardian</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Admission No.</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length ? (
              students.map((s, index) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    {s.first_name} {s.last_name}
                  </td>
                  <td className="py-2 px-4">{s.gender}</td>
                  <td className="py-2 px-4">{s.date_of_birth}</td>
                  <td className="py-2 px-4">{s.class_enrolled}</td>
                  <td className="py-2 px-4">{s.guardian_name}</td>
                  <td className="py-2 px-4">{s.guardian_phone}</td>
                  <td className="py-2 px-4">{s.admission_number}</td>
                  <td className="py-2 px-4 space-x-2 text-center">
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-3">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showForm && (
          <div className="mt-10 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-200">
            <StudentForm
              initialData={editStudent}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel} // Passing cancel handler here
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;
