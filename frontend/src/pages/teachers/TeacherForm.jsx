import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";

// Helper function to flatten nested objects into FormData
const buildFormData = (data) => {
  const formData = new FormData();

  for (const key in data) {
    if (typeof data[key] === "object" && data[key] !== null && !(data[key] instanceof File)) {
      for (const nestedKey in data[key]) {
        formData.append(`${key}.${nestedKey}`, data[key][nestedKey]);
      }
    } else if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  }

  return formData;
};

const TeacherForm = forwardRef(({ onSubmit, initialData, onCancel }, ref) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    marital_status: "",
    date_of_birth: "",
    date_of_employment: "",
    profile_picture: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        password: "",
        email: initialData.user?.email || "",
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        gender: initialData.gender || "",
        phone_number: initialData.phone_number || "",
        marital_status: initialData.marital_status || "",
        date_of_birth: initialData.date_of_birth || "",
        date_of_employment: initialData.date_of_employment || "",
        profile_picture: null,
      });
    }
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    resetForm() {
      setFormData({
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        gender: "",
        phone_number: "",
        marital_status: "",
        date_of_birth: "",
        date_of_employment: "",
        profile_picture: null,
      });
    },
  }));

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture") {
      setFormData((prev) => ({ ...prev, profile_picture: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the user object
    const userPayload = { email: formData.email };
    if (!initialData || formData.password) {
      userPayload.password = formData.password;
    }

    // Combine full data
    const dataToSubmit = {
      user: userPayload,
      first_name: formData.first_name,
      last_name: formData.last_name,
      gender: formData.gender,
      phone_number: formData.phone_number,
      marital_status: formData.marital_status,
      date_of_birth: formData.date_of_birth,
      date_of_employment: formData.date_of_employment,
      profile_picture: formData.profile_picture,
    };

    const formDataToSubmit = buildFormData(dataToSubmit);
    onSubmit(formDataToSubmit, initialData?.id);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto"
    >
      <h3 className="text-xl font-semibold mb-4 text-[#065f46]">
        {initialData ? "Edit Teacher" : "Hire Teacher"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
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
          <option value="Other">Other</option>
        </select>

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
          <option value="Single">Single</option>
          <option value="Married">Married</option>
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
          type="date"
          name="date_of_employment"
          value={formData.date_of_employment}
          onChange={handleChange}
          required
          className="border p-2 rounded-md"
        />

        <div className="col-span-2">
          <label className="block text-sm mb-1 text-gray-700">
            Profile Picture (optional)
          </label>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between gap-4">
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

export default TeacherForm;
