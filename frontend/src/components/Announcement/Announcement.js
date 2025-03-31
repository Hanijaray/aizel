import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAnnouncement from "./AddAnnouncement"; // Import axios

import {
  FaSearch,
  FaCalendarAlt,
  FaPlay,
  FaEdit,
  FaShareAlt,
} from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";

const AnnouncementHistory = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(""); // Store selected month
  const [selectedDate, setSelectedDate] = useState(""); // ✅ Define selectedDate state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // State to store selected announcement
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(true); // Toggle AddAnnouncement popup

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  useEffect(() => {
    // Fetch announcements from backend
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/announcements"
        ); // Change URL if needed
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handlePlayClick = (item) => {
    console.log("Selected Announcement:", item); // Debugging
    setSelectedAnnouncement(item); // Store the selected row data
    setShowAddAnnouncement(true); // Show the AddAnnouncement form
  };

  // ✅ Filter Announcements
  const filteredAnnouncements = announcements.filter((item) => {
    const searchText = searchTerm.toLowerCase();
    const itemDate = new Date(item.dateTime);
    const itemMonth = (itemDate.getMonth() + 1).toString().padStart(2, "0");
    const formattedItemDate = itemDate.toISOString().split("T")[0];

    return (
      (item.employeeName.toLowerCase().includes(searchText) ||
        item.subject.toLowerCase().includes(searchText) ||
        item.regarding.toLowerCase().includes(searchText) ||
        item.announcement.toLowerCase().includes(searchText)) &&
      (selectedMonth === "" || itemMonth === selectedMonth) &&
      (selectedDate === "" || formattedItemDate === selectedDate)
    );
  });

  return (
    <div className="flex gap-4 p-4 top-5 relative bottom-10">
      <div className="w-1/2">
        {showAddAnnouncement && (
          <AddAnnouncement
            onClose={() => setShowAddAnnouncement(false)}
            selectedAnnouncement={selectedAnnouncement} // Pass the selected announcement
          />
        )}
      </div>
      <div className="">
        <div className="bg-white shadow-lg rounded-xl p-5 w-[1100px]  h-[600px] ">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-xl font-bold text-black">
              Announcement History
            </h2>
            <span className="text-sm font-bold relative left-[300px] top-1 text-black">
              Fri, Dec 20 2024 20:38:43
            </span>

            <button className="p-3 bg-[#800080] text-white rounded-md w-10 relative left-40">
              <FaShareAlt />
            </button>

            <button className="p-2 bg-[#800080] text-white rounded-md w-10 relative left-0">
              <FiPrinter size={24} />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="border border-[#800080] rounded-md h-[500px]">
            <div className="flex items-center space-x-2 mb-4 mt-4 ">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search History Item"
                  className="w-[300px] p-2 pl-8 border border-black rounded-md focus:outline-none relative left-7"
                />
              </div>

              <button className="p-3 bg-black text-white rounded-md w-10 relative right-14">
                <span className="[&>svg]:h-5 [&>svg]:w-6 relative right-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
              </button>

              {/* Month Dropdown */}
              <select
                className="bg-[#FFA500] font-bold border-2 border-black text-black px-4 py-2 rounded-md relative left-[280px]"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value=""> Month</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              {/* Date Picker */}
              <input
                type="date"
                className="bg-[#FFA500] font-bold border-2 border-black text-black px-0 py-2 rounded-md relative left-[280px]"
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
                onFocus={(e) => e.target.showPicker()}
                placeholder="Date"
              />
            </div>

            {/* Table */}

            <div className="relative left-[30px] bottom-8 top-1 w-[970px] mb-2">
  <table className="w-full border-collapse">
    <thead className="sticky top-0 bg-[#800080] text-white z-10">
      <tr>
        <th className="p-2">User Name</th>
        <th className="p-2">Date & Time</th>
        <th className="p-2">Deadline</th>
        <th className="p-2">Subject</th>
        <th className="p-2">Announcement</th>
        <th className="p-2">View By</th>
        <th className="p-2">Edit</th>
      </tr>
    </thead>
  </table>
  {/* Scrollable tbody */}
  <div className="overflow-y-auto max-h-[350px]">
    <table className="w-full border-collapse">
      <tbody>
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item, index) => (
            <tr key={index} className="border-b text-center">
              <td className="p-2">{item.employeeName}</td>
              <td className="p-2">
                {new Date(item.dateTime).toLocaleDateString()} <br />
                {new Date(item.dateTime).toLocaleTimeString()}
              </td>
              <td className="p-2">{new Date(item.deadline).toLocaleDateString()}</td>
              <td className="p-2">
                {item.subject}
                <p className="text-gray-500 text-sm italic mt-2">{item.regarding}</p>
              </td>
              <td className="p-2">{item.announcement}</td>
              <td className="p-2 flex items-center justify-center space-x-1">
                <button className="px-3 py-1 rounded-md text-white bg-[#800080]">Unread</button>
              </td>
              <td className="p-2">
                <button
                  className="bg-[#FFA500] text-white p-2 rounded-md relative left-[8px]"
                  onClick={() => handlePlayClick(item)}
                >
                  <FaPlay />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center text-gray-500 py-4">
              No announcements found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementHistory;