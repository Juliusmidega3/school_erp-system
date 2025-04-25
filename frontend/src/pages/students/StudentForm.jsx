import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const StudentForm = forwardRef(({ onSubmit, initialData, onCancel, classes }, ref) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    admission_number: "",
    class_id: "", // Updated field
    guardian_name: "",
    guardian_phone: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData.user,
        ...initialData,
        password: "", // clear password field when editing
      }));
    }
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    resetForm() {
      setFormData({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        admission_number: "",
        class_id: "", // Updated field
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
  
    const data = {
      user: {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
      },
      class_id: formData.class_id, // Updated field
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      admission_number: formData.admission_number,
      guardian_name: formData.guardian_name,
      guardian_phone: formData.guardian_phone,
    };
  
    // Include password only if it's provided (for registration or password change)
    if (formData.password) {
      data.user.password = formData.password;
    }
  
    console.log("Payload being sent:", data);
  
    onSubmit(data, initialData?.id)
      .catch((error) => {
        if (error.response) {
          console.error("Backend validation errors:", error.response.data);
          alert("Error: " + JSON.stringify(error.response.data, null, 2));
        } else {
          console.error("Error submitting form:", error.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-[#065f46]">
        {initialData ? "Edit the Student" : "Register New Student"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
          name="admission_number"
          placeholder="Admission No."
          value={formData.admission_number}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

        {/* Class selection */}
        <select
          name="class_id" // Updated field
          value={formData.class_id}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        >
          <option value="">Select Class</option>
          {classes && classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
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
