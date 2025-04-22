import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const StudentForm = forwardRef(({ onSubmit, initialData, onCancel }, ref) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    address: "",
    admission_number: "",
    class_enrolled: "",
    guardian_name: "",
    guardian_phone: "",
    profile_picture: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        password: "", // clear password on edit
        profile_picture: null, // reset picture unless re-uploading
      }));
    }
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    resetForm() {
      setFormData({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        address: "",
        admission_number: "",
        class_enrolled: "",
        guardian_name: "",
        guardian_phone: "",
        profile_picture: null,
      });
    },
  }));

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture") {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    for (let key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        submissionData.append(key, formData[key]);
      }
    }
    onSubmit(submissionData, initialData?.id);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-[#065f46]">
        {initialData ? "Edit the Student" : "Register New Student"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required={!initialData}
          className="border p-2 rounded-md"
        />

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />

        <input
          type="text"
          name="admission_number"
          placeholder="Admission No."
          value={formData.admission_number}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

        <select
          name="class_enrolled"
          value={formData.class_enrolled}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        >
          <option value="">Class Enrolled</option>
          <option value="PP 1">PP 1</option>
          <option value="PP 2">PP 2</option>
          <option value="Grade 1">Grade 1</option>
          <option value="Grade 2">Grade 2</option>
          <option value="Grade 3">Grade 3</option>
          <option value="Grade 4">Grade 4</option>
          <option value="Grade 5">Grade 5</option>
          <option value="Grade 6">Grade 6</option>
          <option value="Grade 7">Grade 7</option>
          <option value="Grade 8">Grade 8</option>
          <option value="Grade 9">Grade 9</option>
        </select>

        <input
          type="text"
          name="guardian_name"
          placeholder="Guardian Name"
          value={formData.guardian_name}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          name="guardian_phone"
          placeholder="Guardian Phone"
          value={formData.guardian_phone}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

        <div className="col-span-2">
          <label className="block text-sm mb-1 text-gray-700">Profile Picture (optional)</label>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={onCancel}
          type="button"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {initialData ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
});

export default StudentForm;
