import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import TeacherForm from "./TeacherForm";
import TeacherTable from "./TeacherTable";

const RegisterTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [editTeacher, setEditTeacher] = useState(null);
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
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/teachers/${id}/`);
    fetchTeachers();
  };

  const handleCancel = () => {
    setEditTeacher(null);
    formRef.current.resetForm();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {editTeacher ? "Edit Teacher" : "Register Teacher"}
      </h1>
      <TeacherForm
        ref={formRef}
        initialData={editTeacher}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <TeacherTable teachers={teachers} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RegisterTeacher;
