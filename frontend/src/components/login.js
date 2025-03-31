import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DriverLogin = () => {
  const [employeeId, setemployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
  
    try {
      const response = await fetch("http://localhost:5000/api/accessRequests/login", { // ✅ Updated API URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, password }), // ✅ Corrected field name
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      }
  
      const data = await response.json();
      navigate(`/category?id=${data.employeeId}`); // ✅ Redirect with correct ID
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Driver Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Driver ID"
            value={employeeId}
            onChange={(e) => setemployeeId(e.target.value)}
            required
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mb-2"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
        {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default DriverLogin;
