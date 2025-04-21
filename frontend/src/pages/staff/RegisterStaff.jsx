import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import StaffForm from "./StaffForm";
import StaffTable from "./StaffTable";
import LogoText from "../../components/LogoText";

const RegisterStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const [editStaff, setEditStaff] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef();

  const fetchStaffs = async () => {
    try {
      const res = await axiosInstance.get("/staffs/");
      setStaffs(res.data);
    } catch (error) {
      console.error("Failed to fetch staff data:", error);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleEdit = (staff) => {
    setEditStaff(staff);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await axiosInstance.delete(`/staffs/${id}/`);
        fetchStaffs();
      } catch (error) {
        console.error("Error deleting Staff:", error);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditStaff(null);
  };

  const handleAddNew = () => {
    setEditStaff(null);
    setShowForm(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleFormSubmit = async (formData, id) => {
    try {
      if (id) {
        await axiosInstance.put(`/staffs/${id}/`, formData);
      } else {
        await axiosInstance.post("/staffs/", formData);
      }
      fetchStaffs();
      setEditStaff(null);
    } catch (error) {
      console.error("Error saving staff:", error);
    }
  };

  return (
    <div>
      <LogoText />
      {showForm && (
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-200">
          <StaffForm
            key={editStaff ? editStaff.id : Date.now()}
            initialData={editStaff}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}
      <div className="flex justify-between mt-3 items-center">
        <h2 className="text-xl font-bold">Staff List</h2>
        <button
          onClick={handleAddNew}
          className="bg-white shadow p-3 rounded-lg hover:shadow-lg transition border border-gray-200 text-center"
        >
          ➕ Hire a Staff
        </button>
      </div>
      <StaffTable staffs={staffs} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RegisterStaff;
