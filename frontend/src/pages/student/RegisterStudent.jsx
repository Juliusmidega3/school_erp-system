import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import LogoText from "../../components/LogoText";

const RegisterStudent = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef();

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get("/students/");
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch student data:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditStudent(student);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axiosInstance.delete(`/students/${id}/`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting Student:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditStudent(null);
  };

  const handleAddNew = () => {
    setEditStudent(null);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleFormSubmit = async (formData, id) => {
    try {
      if (id) {
        await axiosInstance.put(`/students/${id}/`, formData);
      } else {
        await axiosInstance.post("/students/", formData);
      }
      fetchStudents();
      setEditStudent(null);
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800">
      {/* Form Container */}
      {showForm && (
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-200">
          <StudentForm
            key={editStudent ? editStudent.id : Date.now()}
            initialData={editStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Heading and Add New Button */}
      <div className="flex justify-between mt-3 items-center">
        <h2 className="text-2xl font-bold text-[#065f46]">Student List</h2>
        <button
          onClick={handleAddNew}
          className="bg-[#065f46] text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          ➕ Enroll a Student
        </button>
      </div>

      {/* Student Table */}
      <StudentTable students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RegisterStudent;
