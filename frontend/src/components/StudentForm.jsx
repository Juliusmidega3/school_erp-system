// components/StudentForm.jsx
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const StudentForm = forwardRef(({ initialData = {}, onSubmit, onCancel }, ref) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    admission_number: "",
    class_enrolled: "",
    guardian_name: "",
    guardian_phone: ""
  });

  useEffect(() => {
    if (initialData && initialData.id) {
      setFormData({
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        gender: initialData.gender || "",
        date_of_birth: initialData.date_of_birth || "",
        admission_number: initialData.admission_number || "",
        class_enrolled: initialData.class_enrolled || "",
        guardian_name: initialData.guardian_name || "",
        guardian_phone: initialData.guardian_phone || ""
      });
    }
  }, [initialData?.id]);

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setFormData({
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        admission_number: "",
        class_enrolled: "",
        guardian_name: "",
        guardian_phone: ""
      });
    }
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, initialData.id);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="class_enrolled"
        placeholder="Class Enrolled"
        value={formData.class_enrolled}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <input
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="admission_number"
        placeholder="Admission Number"
        value={formData.admission_number}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="guardian_name"
        placeholder="Guardian Name"
        value={formData.guardian_name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="guardian_phone"
        placeholder="Guardian Phone"
        value={formData.guardian_phone}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <div className="flex justify-center gap-4 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {initialData.id ? "Update" : "Register"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
});

export default StudentForm;
