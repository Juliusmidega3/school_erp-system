import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import TeacherForm from "./TeacherForm";
import TeacherTable from "./TeacherTable";
import LogoText from "../../components/LogoText";

const RegisterTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [editTeacher, setEditTeacher] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef();

  const fetchTeachers = async () => {
    try {
      const res = await axiosInstance.get("/teachers/");
      setTeachers(res.data);
    } catch (error) {
      console.error("Failed to fetch teacher data:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEdit = (teacher) => {
    setEditTeacher(teacher);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axiosInstance.delete(`/teachers/${id}/`);
        fetchTeachers();
      } catch (error) {
        console.error("Error deleting Teacher:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditTeacher(null);
  };

  const handleAddNew = () => {
    setEditTeacher(null);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleFormSubmit = async (formData, id) => {
    try {
      if (id) {
        await axiosInstance.put(`/teachers/${id}/`, formData);
      } else {
        await axiosInstance.post("/teachers/", formData);
      }
      fetchTeachers();
      setEditTeacher(null);
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  return (
    <div>
      <LogoText />
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
      <div className="flex justify-between mt-3 items-center">
        <h2 className="text-xl font-bold">Teacher List</h2>
        <button
          onClick={handleAddNew}
          className="bg-white shadow p-3 rounded-lg hover:shadow-lg transition border border-gray-200 text-center"
        >
          ➕ Hire a Teacher
        </button>
      </div>
      <TeacherTable teachers={teachers} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RegisterTeacher;
