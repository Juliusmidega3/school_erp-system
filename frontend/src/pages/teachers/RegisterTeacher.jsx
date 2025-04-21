import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import TeacherForm from "./TeacherForm";
import TeacherTable from "./TeacherTable";
import LogoText from "../../components/LogoText";

const RegisterTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [editTeacher, setEditTeacher] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef();

  const fetchTeachers = async () => {
    const res = await axios.get("http://localhost:8000/api/teachers/");
    setTeachers(res.data);
  };


  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (formData, id) => {
    if (id) {
      await axios.put(`http://localhost:8000/api/teachers/${id}/`, formData);
    } else {
      await axios.post("http://localhost:8000/api/teachers/", formData);
    }
    fetchTeachers();
    formRef.current.resetForm();
    setEditTeacher(null);
  };

  const handleEdit = (teacher) => {
    setEditTeacher(teacher);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

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

  const handleCancel = () => {
    setShowForm(false);
    setEditTeacher(null);
  };

  const handleAddNew = () => {
    setEditTeacher(null);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollIntoView, behavior: "smooth" });
  };

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

  return (
    <div>       
      <LogoText  />  
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
        <h2 className="text-xl font-bold  ">Teacher List</h2>
        <button onClick={handleAddNew} className="bg-white shadow p-3 rounded-lg hover:shadow-lg transition border border-gray-200 text-center">➕ Hire a Teacher</button> 
      </div>  
      <TeacherTable teachers={teachers} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RegisterTeacher;
