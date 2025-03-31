import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPenFill } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaUserCircle } from 'react-icons/fa';
import { IoMdFitness, IoMdHome } from 'react-icons/io';
import { RiShieldUserFill } from 'react-icons/ri';
import { TiMessages } from "react-icons/ti";
import { MdLocationOn } from "react-icons/md";

export default function ProfileHeader() {
  const [worker, setWorker] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workers/first"); 
        setWorker(response.data);
      } catch (err) {
        setError("Failed to fetch worker details");
      }
    };

    fetchWorker();
  }, []);

  return (
    <>     
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:p-4 rounded space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                    <img src={`http://localhost:5000/${worker?.profilePhoto}`} className="w-16 h-16 hidden sm:flex sm:w-24 sm:h-24 rounded-full object-cover border" alt="Profile" />
                    <div>
                        <h2 className="hidden sm:flex text-lg font-bold">Welcome Back!</h2>
                        <p className="hidden sm:flex">{worker?.employeeName || "Loading..."}</p>
                    </div>
                </div>
                <div className=" flex flex-row-reverse sm:flex-row items-center justify-between gap-2  sm:gap-96 p-0 min-w-screen mt-0 sm:mt-0">
                <div className="flex items-center space-x-1 sm:space-x-2  text-gray-700">
                    <MdLocationOn className="text-[#800080] text-lg ml-2 sm:text-2xl" />
                    <p className="text-xs sm:text-lg">{worker?.address || "Fetching location..."}</p>
                </div>
                <p className="text-xs sm:text-lg text-gray-700 mr-2">Login:9:30pm</p>
            </div>
                <button className="hidden sm:flex bg-primary text-white px-4 py-2 rounded-full items-center text-sm sm:text-base">
                    VIEW PROFILE <FaUserCircle className="ml-2" />
                </button>
            </div>
            
      {/* Profile Heading */}
      <div className="flex items-center justify-between sm:m-1 mt-2">
        <h3 className="sm:text-4xl font-bold text-lg ml-3">Profile</h3>
        <div className="flex-1 border-t-2 border-[#800080] ml-2 mr-3 mt-3"></div>
    </div>

        {/* Employee Details */}
        <div className="flex flex-col sm:flex-row justify-between gap-0 sm:gap-0">
          
        <div className="w-full sm:w-[700px] sm:ml-28 mx-auto bg-white sm:border border-gray-200 mt-0 sm:shadow-lg sm:rounded-lg overflow-hidden">
        <div className="sm:p-4 p-2 flex items-center justify-center space-x-4 sm:space-x-6">
        <img
          className="w-20 h-20 sm:w-28 sm:h-28 border-2 rounded-xl border-gray-300 object-cover"
          src={`http://localhost:5000/${worker?.profilePhoto}`}
          alt="Employee"
        />
        <div className="text-left">
          <h2 className="text-lg sm:text-xl font-extrabold">{worker?.employeeName || "Loading..."}</h2>
          <p className="text-black font-medium">{worker?.position || "Loading..."}</p>
          <p className="text-black text-sm font-light">{worker?.employeeId || "Loading..."}</p>
        </div>
        </div>
    
        <div className="flex justify-between">
        <hr className="border-t-2 border-[#800080] w-[250px] sm:w-[570px] mt-4 ml-4" />
        <h3 className="text-lg sm:text-xl font-bold mr-4">DETAILS</h3>
        </div>
        <div className="p-1 ml-4 sm:ml-16">
          <ul className="text-gray-700 sm:space-y-1 text-sm sm:text-base">
            <li><strong>Employee Name:</strong> {worker?.employeeName}</li>
            <li><strong>Employee Position:</strong> {worker?.position}</li>
            <li><strong>Employee ID:</strong> {worker?.employeeId}</li>
            <li><strong>Employee Joining Date:</strong> {worker?.joiningDate?.substring(0, 10)}</li>
            <li><strong>Employee Phone Number:</strong> {worker?.phoneNumber}</li>
            <li><strong>Employee Emergency Number:</strong> {worker?.emergencyPhone}</li>
            <li><strong>Employee Permanent Address:</strong> {worker?.address}</li>
            <div className="sm:pt-8 sm:pb-3 mt-4 sm:space-y-1">
            <li><strong>Employee Login User Name:</strong> {worker?.username}</li>
            <li><strong>Employee Login Password:</strong> {worker?.password}</li>
            </div>
          </ul>
        </div>
      </div>

        {/* Working state */}
        <div className="flex flex-col sm:mr-20">
        <div className="w-full  mx-auto bg-white shadow-lg rounded-lg overflow-hidden sm:border border-gray-200 mt-0 pb-1 sm:pb-5 px-4 sm:px-6">
  
        {/* Header Section */}
        <div className="flex justify-between items-center mt-2 mb-2 sm:mt-4">
          <hr className="border-t-2 border-[#800080] w-[50%] sm:w-[320px]" />
          <h3 className="text-xl sm:text-2xl font-bold">WORKING STATE</h3>
        </div>

        {/* Total Report */}
        <div className="border-2 border-black bg-[#fbc058] text-center text-lg font-semibold sm:p-3 rounded-lg sm:mt-4">
          Total Report : 300 Report
        </div>

        {/* Stats Grid - Force Two Columns on Mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-2  mt-3 sm:mt-4">
        
        {/* Attendance */}
        <div className="border-2 border-black bg-[#800080] text-white p-0 sm:p-3 rounded-lg flex justify-between items-center">
          <div className="flex flex-col gap-1 ml-2">
            <p className="text-sm sm:text-lg">Attendance</p>
            <p className="text-xl sm:text-4xl font-extrabold">90%</p>
          </div>
          <div className="flex flex-col items-center mr-2">
            <FaArrowTrendUp className="w-6 h-6 sm:w-10 sm:h-10" />
            <p className="text-[10px] sm:text-sm">28 Days</p>
          </div>
        </div>

        {/* Absent */}
        <div className="border-2 border-black bg-[#fbc058] text-black p-0 sm:p-3 rounded-lg flex justify-between items-center">
          <div className="flex flex-col gap-1 ml-2">
            <p className="text-sm sm:text-lg">Absent</p>
            <p className="text-xl sm:text-4xl font-extrabold">8%</p>
          </div>
          <div className="flex flex-col items-center mr-2">
            <FaArrowTrendDown className="w-6 h-6 sm:w-10 sm:h-10" />
            <p className="text-[10px] sm:text-sm">2 Days</p>
          </div>
        </div>

        {/* Permission */}
        <div className="border-2 border-black bg-white text-black p-0 sm:p-3 rounded-lg flex justify-between items-center">
          <div className="ml-2">
            <p className="text-sm sm:text-lg">Permission</p>
            <p className="text-xl sm:text-4xl font-extrabold">2%</p>
          </div>
          <div className="text-right mr-2">
            <p className="text-xl sm:text-4xl font-extrabold">3</p>
            <p className="text-[10px] sm:text-sm">Hours</p>
          </div>
        </div>

        {/* Total Working Hours */}
        <div className="border-2 border-black bg-[#800080] text-white p-0 sm:p-3 rounded-lg flex justify-between items-center">
          <p className="ml-2 text-[12px] sm:text-lg">Total <br />Working Hours</p>
          <p className="text-lg sm:text-3xl font-extrabold">80 Hr</p>
        </div>
      </div>
      </div>

    
            {/* Bottom Navigation */}
            <div className="bg-primary text-white flex justify-center space-x-2 sm:space-x-4 py-2 sm:py-4 px-2 sm:px-10 sm:mt-2
            fixed bottom-0 left-0 w-full sm:static">
            <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                <IoMdHome className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                <IoMdFitness className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                <BsPenFill className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                <TiMessages className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-full">
                <RiShieldUserFill className="w-5 h-5 sm:w-8 sm:h-8" />
            </div>
            <div className="w-16 sm:w-24 h-10 sm:h-16 flex flex-row items-center justify-center space-x-1 sm:space-x-2 border-2 border-white rounded-full bg-white text-purple-700 px-2 sm:px-4">
                <FaUserCircle className="w-5 h-5 sm:w-8 sm:h-8" />
                <span className="text-sm sm:text-xs font-bold">Profile</span>
            </div>
        </div>

      </div>
      </div>
    </>
  );
}
