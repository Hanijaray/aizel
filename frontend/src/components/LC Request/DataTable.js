import React, { useState, useEffect } from "react";
import axios from "axios"; // For API requests

import { MdPrint } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io5";

function DataTable({ workers, onEditdatatable,onSelectWorker}) {
  const [filteredWorkers, setFilteredWorkers] = useState(workers);
  const [currentTime, setCurrentTime] = useState(" ");
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [approvedWorkers, setApprovedWorkers] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  const fetchApprovedRequests = async () => {
    try {
      const response = await axios.get("https://aizel-lyaq.onrender.com/api/workers/approved"); 
      setApprovedRequests(response.data);
    } catch (error) {
      console.error("Error fetching approved access requests:", error);
    }
  };
  
 

  useEffect(() => {
    setFilteredWorkers(workers);
  }, [workers]);

  
  const formatCurrentTime = () => {
    const now = new Date();
    const day = now.toLocaleString("default", { weekday: "long" });
    const month = now.toLocaleString("default", { month: "long" });
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${day}, ${month} ${date}, ${year} ${hours}:${minutes}:${seconds}`;
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const filtered = workers.filter(worker => {
      const matchesSearchQuery = worker.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMonth = selectedMonth === "Month" || new Date(worker.joiningDate).toLocaleString("default", { month: "long" }) === selectedMonth;
      return matchesSearchQuery && matchesMonth;
    });
    setFilteredWorkers(filtered);
  }, [searchQuery, selectedMonth, workers]);

  
  const handlePrint = () => {
    window.print();
  };

  
  const handleShare = async () => {
    const shareData = {
      title: "Work Report",
      text: "Check out this work report.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  
  const months = [...Array(12)].map((_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const toggleMonthDropdown = () => {
    setIsMonthDropdownOpen(!isMonthDropdownOpen);
  };

  
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false);
  };


  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const handleFilterByDate = () => {
    if (selectedDate) {
      const filtered = workers.filter(worker => {
        const workerDate = new Date(worker.joiningDate).toISOString().split('T')[0];
        return workerDate === selectedDate;
      });
      setFilteredWorkers(filtered);
    } else {
      setFilteredWorkers(workers);
    }
  };

  const filterFromSearchHistory = (criteria) => {
    const filtered = workers.filter(worker => {
      const matchesName = worker.employeeName.toLowerCase().includes(criteria.name.toLowerCase());
      const matchesPhone = worker.phoneNumber.includes(criteria.phoneNumber);
      const matchesAddress = worker.address.toLowerCase().includes(criteria.address.toLowerCase());
      const matchesDate = criteria.date ? new Date(worker.joiningDate).toISOString().split('T')[0] === criteria.date : true;
      const matchesMonth = criteria.month === "Month" || new Date(worker.joiningDate).toLocaleString("default", { month: "long" }) === criteria.month;
      return matchesName && matchesPhone && matchesAddress && matchesDate && matchesMonth;
    });
    setFilteredWorkers(filtered);
  };

  return (
    <div className="flex font-sans flex-wrap  gap-1 w-[950px]">
      <div className="bg-white p-1 shadow-md flex-1 rounded-lg">
        <div className="flex gap-3 ">
          <h1 className="text-xl flex font-sans ms-2 font-semibold text-black">
            Available Workers
            
            <div className="flex place-items-end px-20 py-5 space-x-20">
              <span><div className="px-9"></div></span>
            </div>
            <div className="ms-100 flex flex-wrap gap-0 " style={{ fontSize: "15px" }}>
              {currentTime}
             
              <button onClick={handleShare}>
                <IoShareSocialOutline className="text-2xl rounded-lg p-1 text-white ml-3 mb-4" style={{ backgroundColor: "#950f95" }} />
              </button>
         
             
              <button onClick={handlePrint}>
                <MdPrint className="text-2xl ms-5 text-white rounded-lg p-1 mb-4" style={{ backgroundColor: "#950f95" }} />
              </button>
              
            </div>
          </h1>
        </div>
    
        <div className="border-1 border-pink-900 rounded-lg p-1">
          <div className=" justify-between py-2">
            <div className="flex">
              <input
                type="text"
                placeholder="Search History Item"
                className="border rounded-lg w-60 px-2 h-8 text-center"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <IoSearchOutline className="text-white text-2xl h-7 w-7 rounded-lg bg-black ms-2" />
              <div className="space-x-14 flex ms-50 font-serif">
           
                <div className="flex place-items-end px-20 py-5 gap-0"></div>
                <div className="relative">
                  <button onClick={toggleMonthDropdown} className="bg-yellow-400 px-8 py-1 w-38 text-center rounded-md flex items-center font-bold border border-black">
                    {selectedMonth} <IoMdArrowDropdown style={{ marginLeft: "18px", fontSize: "20px" }} />
                  </button>
                  {isMonthDropdownOpen && (
                    <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-lg w-40 z-10">
                      {months.map((month, index) => (
                        <div key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleMonthSelect(month)}>
                          {month}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <span className="absolute left-3 top-1/2 px-12 transform -translate-y-1/2 text-black font-caladea font-bold pointer-events-none">Date</span>
                  <input
                    type="Date"
                    className="bg-yellow-400 font-caladea px-4 py-1 ms-1 rounded-md font-bold border border-black cursor-pointer text-transparent"
                    value={selectedDate}
                    onChange={handleDateChange}
                    onClick={handleFilterByDate}
                    style={selectedDate === "" ? { color: "transparent" } : { color: "black" }}
                  />
                </div>
               
              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="border-collapse h-full w-full  text-sm">
              <thead>
                <tr className="text-white" style={{ backgroundColor: "#950f95" }}>
                  <th className="py-1">Profile</th>
                  <th className="py-1">Name</th>
                  <th className="py-1">ID & Position</th>
                  <th className="py-1">Phone Number</th>
                  <th className="py-1">Address</th>
                  <th className="py-1">Username</th>
                  <th className="py-1">Password</th>
                  <th className="py-1">Edit</th>
                </tr>
              </thead>
              <tbody>
          {approvedRequests.map((worker) => (
            <tr key={worker._id}>
              <td className="p-1 border-b border-gray-200 text-center">
              <img
  src={worker.profilePhoto ? worker.profilePhoto : "/Images/default-image.png"}
  alt="Profile"
  className="w-10 h-10 rounded-full object-cover"
/>
</td>
              <td className="p-1 border-b border-gray-200 text-center">{worker.employeeName}</td>
              <td className="p-1 border-b border-gray-200 text-center">
                {worker.employeeId}, <br />
                <span className="text-gray-400">{worker.position}</span>
              </td>
              <td className="p-1 border-b border-gray-200 text-center">{worker.phoneNumber}</td>
              <td className="p-1 border-b border-gray-200 text-center">{worker.address}</td>
              <td className="p-1 border-b border-gray-200 text-center">{worker.username}</td>
              <td className="p-1 border-b border-gray-200 text-center">{worker.password}</td>
              <td className="p-1 border-b border-gray-200 text-center">
              <button onClick={() => onEditdatatable(worker._id)}> 

  <IoLogoYoutube  className="text-2xl text-yellow-300 hover:text-green-800" />
  </button>
</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
          <div className="mt-4">
            <ul>
              {searchHistory.map((criteria, index) => (
                <li key={index} className="cursor-pointer hover:bg-gray-200 p-2" onClick={() => filterFromSearchHistory(criteria)}>
                  {criteria.name} - {criteria.phoneNumber} - {criteria.address} - {criteria.date} - {criteria.month}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
