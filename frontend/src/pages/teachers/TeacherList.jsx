import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherForm from "./TeacherForm";
import LogoText from "../../components/LogoText";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);

  // Fetch teachers from the API
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/teachers/");
      setTeachers(res.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Delete a teachers
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/teachers/${id}/`);
        fetchTeachers();
      } catch (error) {
        console.error("Error deleting Teacher:", error);
      }
    }
  };

  // Submit form for adding or updating teacher
  const handleFormSubmit = async (formData, id) => {
    try {
      if (id) {
        await axios.put(`http://127.0.0.1:8000/api/teachers/${id}/`, formData);
      } else {
        await axios.post("http://127.0.0.1:8000/api/teachers/", formData);
      }
      fetchTeachers();
      setEditTeacher(null); // clear edit mode
      // setShowForm(false); ❌ leave form open after submit
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  // Start editing an existing teacher
  const handleEdit = (teacher) => {
    setEditTeacher(teacher);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Open the form to add new teacher
  const handleAddNew = () => {
    setEditTeacher(null);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Cancel the form
  const handleCancel = () => {
    setShowForm(false);
    setEditTeacher(null);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800 font-sans">
      <LogoText/>
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#065f46]">Teacher's List</h2>
          <button
            onClick={handleAddNew}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add New Teacher
          </button>
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
              <th className="py-2 px-4">DOB</th>
              <th className="py-2 px-4">Date Employed.</th>
              <th className="py-2 px-4">Actions</th>
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
                  <td className="py-2 px-4 text-center">{s.marital_status}</td>
                  <td className="py-2 px-4 text-center">{s.date_of_employment}</td>

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
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showForm && (
          <div className="mt-10 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-200">
            <TeacherForm
              key={editTeacher ? editTeacher.id : Date.now()}
              initialData={editTeacher}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherList;
