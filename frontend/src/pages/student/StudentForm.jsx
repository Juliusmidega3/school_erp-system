import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

const StudentForm = forwardRef(({ onSubmit, initialData, onCancel }, ref) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    parent_name: "",
    parent_phone: "",
    enrolled_class: "",
    admission_number: "",
   
    
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
        date_of_birth: "",
        gender: "",
        parent_name: "",
        parent_phone: "",
        enrolled_class: "",
        admission_number: "",
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
        {initialData ? "Edit the Student" : "Enrol"}
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

        <div>
            <label className="block mb-1 text-sm text-gray-700" htmlFor="date_of_employment">
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
        
        {/* Gender select dropdown with only Male and Female options */}
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
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="parent_name"
          placeholder="Parent's Name"
          value={formData.parent_name}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

       
        <input
          type="text"
          name="parent_phone"
          placeholder="Parent's Tel"
          value={formData.parent_phone}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        /> 

       <select
          name="enrolled_class"
          value={formData.enrolled_class}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        >
          <option value="">Enrolled Class</option>
          <option value="PP1">PP1</option>
          <option value="PP2">PP2</option>
          <option value="Grade 1">Grade 1</option>
          <option value="Grade 2">Grade 2</option>
          <option value="Grade 3">Grade 3</option>
          <option value="Grade 4">Grade 4</option>
          <option value="Grade 5">Grade 5</option>

        </select>  

        <input
          type="text"
          name="admission_number"
          placeholder="Admission No"
          value={formData.admission_number}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        /> 

 
        
      </div>

      <div className="mt-4 flex justify-between gap-4">
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