import React, { useState, useEffect } from "react";
import { TbCancel } from "react-icons/tb";
import axios from "axios"; // Import axios

const AddAnnouncement = ({ onClose, onSubmit, selectedAnnouncement }) => {
  const [approvedEmployees, setApprovedEmployees] = useState([]); // State for employees
  const [formData, setFormData] = useState({
    employeeName: "",
    dateTime: "",
    deadline: "",
    regarding: "",
    subject: "",
    announcement: "",
  });

  const handleClear = () => {
    setFormData({
      employeeName: "",
      dateTime: "",
      deadline: "",
      regarding: "",
      subject: "",
      announcement: "",
    });
  };

  useEffect(() => {
    if (selectedAnnouncement) {
      console.log("Received selectedAnnouncement:", selectedAnnouncement); // Debugging
      setFormData({
        employeeName: selectedAnnouncement.employeeName || "",
        dateTime: selectedAnnouncement.dateTime
          ? new Date(selectedAnnouncement.dateTime).toISOString().slice(0, 16)
          : "",
        deadline: selectedAnnouncement.deadline
          ? new Date(selectedAnnouncement.deadline).toISOString().slice(0, 16)
          : "",
        regarding: selectedAnnouncement.regarding || "",
        subject: selectedAnnouncement.subject || "",
        announcement: selectedAnnouncement.announcement || "",
      });
    }
  }, [selectedAnnouncement]);

  // ✅ Fetch Employee Names on Mount
  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const response = await axios.get("https://aizel-lyaq.onrender.com/api/drivers/employee-names");
        setApprovedEmployees(response.data); // Store employee names
      } catch (error) {
        console.error("Error fetching employee names:", error);
      }
    };

    fetchEmployeeNames();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission (POST/PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedAnnouncement) {
        // 🟢 If editing, send a PUT request
        await axios.put(
          `https://aizel-lyaq.onrender.com/api/announcements/${selectedAnnouncement._id}`,
          formData
        );
        alert("Announcement updated successfully!");
      } else {
        //  If adding new, send a POST request
        await axios.post("https://aizel-lyaq.onrender.com/api/announcements", formData);
        alert("Announcement added successfully!");
      }
    } catch (error) {
      console.error("Error submitting announcement:", error);
      alert("Failed to save announcement.");
    }
  };

  return (
    <div className="w-full max-w-sm bg-[#800080] text-white rounded-xl p-6 shadow-lg h-[600px] relative ">
      <h2 className="text-xl font-bold text-center">
        {" "}
        {selectedAnnouncement ? "Edit Announcement" : "Add Announcement"}
      </h2>
      <div className="mt-4 space-y-3">
        <div>
          <select
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-md bg-[#800080] border border-white text-white font-bold"
            required
          >
            <option value="">User Name</option>
            {approvedEmployees.map((employee) => (
              <option key={employee._id} value={employee.employeeName}>
                {employee.employeeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-md  bg-[#800080] border border-white text-white font-bold"
            placeholder=" Enter Date and Time"
            required
          />
        </div>
        <div>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-md  bg-[#800080] border border-white text-white font-bold"
            required
          />
        </div>
        <div>
          <select
            name="regarding"
            value={formData.regarding}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-md  bg-[#800080] border border-white text-white font-bold"
            required
          >
            <option value="">Choose Regarding</option>
            <option value="client Meeting">Client Meeting</option>
            <option value="Project Meeting">Project Meeting</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-md  bg-[#800080] border border-white text-white font-bold"
            placeholder="Enter subject"
            required
          />
        </div>
        <div>
          <textarea
            name="announcement"
            value={formData.announcement}
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded-md  bg-[#800080] border border-white text-white font-bold h-[150px]"
            placeholder="Enter Announcement"
            required
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between mb-60 space-x-1 w-fit relative top-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-white   text-[#800080] px-14 py-2 rounded-md font-bold "
        >
          {selectedAnnouncement ? "UPDATE " : "ADD "}
        </button>
        <button
          className="bg-white  text-[#800080] px-12 py-2 rounded-md font-bold flex justify-between"
          onClick={handleClear}
        >
          CLEAR
          <TbCancel size={20} className="relative left-[10px] top-1" />
        </button>
      </div>
    </div>
  );
};

export default AddAnnouncement;
