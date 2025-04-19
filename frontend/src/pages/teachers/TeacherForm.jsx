import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const TeacherForm = forwardRef(({ onSubmit, initialData, onCancel }, ref) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone_number: "",
    marital_status: "",
    date_of_birth: "",
    date_of_employment: "",
    
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
        email: "",
        phone_number: "",
        marital_status: "",
        date_of_birth: "",
        date_of_employment: "",
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
        {initialData ? "Edit the Teacher" : "Register New Teacher"}
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
          <option value="O">Other</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

       
       <select
          name="marital_status"
          value={formData.marital_status}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        >
          <option value="">Marital Status</option>
          <option value="S">Single</option>
          <option value="M">Maried</option> 
        </select>  

        <div>
            <label className="block mb-1 text-sm text-gray-700" htmlFor="date_of_birth">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
        </div>

        <div>
            <label className="block mb-1 text-sm text-gray-700" htmlFor="date_of_birth">
              Date of Employment
            </label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_employment"
              value={formData.date_of_employment}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
        </div>


       
        
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

export default TeacherForm;
