import React, { useState } from "react";
import axios from "axios";
// import UserTable from "./UserTable";
import DataTable from "./DataTable";


const Form = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    profilePhoto: null,
    joiningDate: "",
    phoneNumber: "",
    emergencyPhone: "",
    username: "",
    password: "",
    address: "",
    employeeId: "",
    position: "",
  });

  const [acceptedWorkers, setAcceptedWorkers] = useState([]);
  const [rejectedWorkers, setRejectedWorkers] = useState([]);



  const handleAccept = (index) => {
    const workerToAccept = workers[index];

    // Add worker to acceptedWorkers
    setAcceptedWorkers((prev) => [...prev, workerToAccept]);

    // Remove worker from workers list
    setWorkers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReject = (index) => {
    // Remove worker from the workers list
    setWorkers((prev) => prev.filter((_, i) => i !== index));
  };


  const [workers, setWorkers] = useState([
    {
      profile: "https://via.placeholder.com/50",
      employeeName: "John Doe",
      employeeId: "12345",
      position: "Manager",
      phoneNumber: "+1234567890",
      address: "123 Main St, City",
      username: "johndoe",
      password: "password123",
      lastEdit: "2025-03-12 10:00",
    },
    {
      profile: "https://via.placeholder.com/50",
      employeeName: "Jane Smith",
      employeeId: "54321",
      position: "Developer",
      phoneNumber: "+9876543210",
      address: "456 Elm St, Town",
      username: "janesmith",
      password: "password456",
      lastEdit: "2025-03-11 09:30",
    },
  ]);


  const [editingWorkerIndex, setEditingWorkerIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = {
      employeeName: formData.employeeName,
      profilePhoto: formData.profilePhoto,
      joiningDate: formData.joiningDate,
      phoneNumber: formData.phoneNumber,
      emergencyPhone: formData.emergencyPhone,
      username: formData.username,
      password: formData.password,
      address: formData.address,
      employeeId: formData.employeeId,
      position: formData.position,
      status: "Pending",
    };
  
    try {
      const response = await axios.post(
        "https://aizel-lyaq.onrender.com/api/accessRequests",
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Request Sent:", response.data);
      alert("Request Sent to Admin");
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request");
    }
  };
  
  const handleEditdatatable = async (workerId) => {
    console.log("Fetching worker details for:", workerId );
    try {
      const response = await axios.get(`https://aizel-lyaq.onrender.com/api/workers/${workerId}`);
      console.log("Worker data received:", response.data);
  
      const workerToEdit = response.data;
      setFormData({
        employeeName: workerToEdit.employeeName || "",
        profilePhoto: workerToEdit.profilePhoto || null,
        joiningDate: workerToEdit.joiningDate || "",
        phoneNumber: workerToEdit.phoneNumber || "",
        emergencyPhone: workerToEdit.emergencyPhone || "",
        username: workerToEdit.username || "",
        password: workerToEdit.password || "",
        address: workerToEdit.address || "",
        employeeId: workerToEdit.employeeId || "",
        position: workerToEdit.position || "",
      });
  
      setEditingWorkerIndex(workerId);
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching worker details:", error);
    }
};
 
  
const handleUpdate = async () => {
  if (!editingWorkerIndex) {
    alert("No worker selected for update.");
    return;
  }

  try {
    const response = await axios.put(
      `https://aizel-lyaq.onrender.com/api/workers/${editingWorkerIndex}`,
      formData
    );

    console.log("Update successful:", response.data);
    alert("Worker details updated successfully!");

    // Update the workers list in the frontend
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) =>
        worker.employeeId === formData.employeeId ? { ...formData } : worker
      )
    );

    // Reset form and exit editing mode
    setIsEditing(false);
    setEditingWorkerIndex(null);
    setFormData({
      employeeName: "",
      profilePhoto: null,
      joiningDate: "",
      phoneNumber: "",
      emergencyPhone: "",
      username: "",
      password: "",
      address: "",
      employeeId: "",
      position: "",
    });
  } catch (error) {
    console.error("Error updating worker:", error);
    alert("Failed to update worker details.");
  }
};


  
 
  



   return (
    <div className="flex ms-2 mt-5">
      <div className="bg-[#fbc058] border-1 border-red-800  rounded-lg pl-8 max-w-md mx-auto p-6  shadow-lg">
        <h2 className="text-center mr-3 text-xl font-bold font-bricolag">
          {editingWorkerIndex !== null ? "Edit" : "Add"} Employee <br /> Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3 ">
          <input
            type="text"
            name="employeeName"
            placeholder="Employee Name"
            style={{
                border:"2px solid #000",
                boardRadius:"5px",
            }}
            className="font-bricolag w-full p-2 border rounded bg-[#fbc058] border-black border-w-[2px] text-black placeholder:text-black "
            onChange={handleChange}
            value={formData.employeeName}
            required
            
          />
          <input
            type="file"
            name="profilePhoto"
            onChange={handleChange}
            accept="image/*"
            style={{
                border:"2px solid #000",
                boardRadius:"5px",
            }}
            className="w-full p-2 border rounded bg-[#fbc058] border-black border-w-[2px] text-black placeholder:text-black"
          />
          <input
            type="date"
            name="joiningDate"
            onChange={handleChange}
            value={formData.joiningDate}
            required
            style={{
                border:"2px solid #000",
                boardRadius:"5px",
            }}
            className="w-full p-2 border rounded bg-[#fbc058] border-black border-w-[2px] text-black placeholder:text-black"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phoneNumber}
            required
            style={{
                border:"2px solid #000",
                boardRadius:"5px",
            }}
            className="w-full p-2 border rounded bg-[#fbc058] border-black border-w-[2px] text-black placeholder:text-black"
          />
          <input
            type="tel"
            name="emergencyPhone"
            placeholder="Emergency Phone Number"
            onChange={handleChange}
            value={formData.emergencyPhone}
            required
            style={{
                border:"2px solid #000",
                boardRadius:"5px",
            }}
            className="w-full p-2 border rounded bg-[#fbc058] border-black border-w-[2px] text-black placeholder:text-black"
          />
          <input
            type="text"
            name="username"
            placeholder="Employee Username"
            onChange={handleChange}
            value={formData.username}
            required
            style={{
                border:"2px solid #000",
                boardRadius:"5px",
            }}
            className="w-full p-2 border rounded bg-[#fbc058] border-black border-w-[2px] text-black placeholder:text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Employee Password"
            onChange={handleChange}
            value={formData.password}
            required
            style={{
                border:"2px solid #000",
                boardRadius:"5px",
            }}
            className="w-full p-2 border rounded bg-[#fbc058] border-black border-w-[2px] text-black placeholder:text-black"
          />
          <input
            type="text"
            name="address"
            placeholder="Permanent Address"
            onChange={handleChange}
            value={formData.address}
            required
            style={{
                border:"2px solid #000",
                boardRadius:"5px",
            }}
            className="w-full p-2 border rounded bg-[#fbc058] border-black border-w-[2px] text-black placeholder:text-black"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              type="text"
              name="employeeId"
              placeholder="Enter ID"
              onChange={handleChange}
              value={formData.employeeId}
              required
              className="w-44 p-2 border rounded bg-[#fbc058] border-black text-black placeholder:text-black" 
              style={{
                border: "2px solid #000",
                borderRadius: "5px",
              }}
            />
            <select
              name="position"
              onChange={handleChange}
              value={formData.position}
              required
              className="w-44 p-2 border rounded bg-[#fbc058] border-black text-black placeholder:text-black" 
              style={{
                border: "2px solid #000",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              <option value="">Position</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
            </select>
          </div>
          <div className="flex btn-group">
            <div>


              {isEditing ? (
                <div>
                  <button
                   onClick={handleUpdate} // Call the modified handleUpdate
                    style={{
                      width: "130px",
                      background: "green",
                      color: "white",
                      padding: "7px",
                      marginTop: "7px",
                      border: "none",
                      borderRadius: "5px",
                      marginRight: "5px",
                    }}
                  >
                    Update
                  </button>

                  <button
                    style={{
                      width: "130px",
                      background: "red",
                      color: "white",
                      padding: "7px",
                      marginTop: "7px",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  className="font-serif w-96 p-3 bg-black text-white font-bold rounded"
                  type="submit"
                  onClick={handleSubmit}
                
                >
                  Request Admin
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      
      <div>
      </div>
      <div>
        <div>
        <DataTable workers={[...acceptedWorkers]} onEditdatatable={handleEditdatatable} />
        </div>
      </div>
      {/* <UserTable workers={workers} onEditusertable={handleEditusertable} onAccept={handleAccept} onReject={handleReject} /> */}
        
    </div>
    
  );
};

export default Form;
