import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const StudentForm = forwardRef(({ onSubmit, initialData, onCancel }, ref) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    admission_number: "",
    class_enrolled: "",
    guardian_name: "",
    guardian_phone: "",
  });

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    resetForm() {
      setFormData({
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        admission_number: "",
        class_enrolled: "",
        guardian_name: "",
        guardian_phone: "",
      });
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, initialData?.id);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-[#065f46]">
        {initialData ? "Edit the Student" : "Register New Student"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
        {/* Gender select dropdown with only Male and Female options */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
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
          required
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
        <input
          type="text"
          name="class_enrolled"
          placeholder="Class"
          value={formData.class_enrolled}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />
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
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={onCancel} // Ensure cancel does not trigger submit
          type="button" // Ensure it's not a form submit button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit" // This triggers the form submit
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {initialData ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
});

export default StudentForm;
