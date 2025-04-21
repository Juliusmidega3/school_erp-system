import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoText from "../components/LogoText";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        const errorData = await response.json();
        alert("Registration failed: " + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Registration error.");
    }
  };

  return (
    <>
      <LogoText/>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[#065f46]">Admin Registration</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Choose a username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Create a password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#065f46] text-white py-2 rounded hover:bg-[#044f3b]">
              Register
            </button>
          </form>
        </div>
      </div>
     </> 
  );
}

export default RegisterPage;
