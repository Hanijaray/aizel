import { BsPenFill } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaUserCircle } from 'react-icons/fa';
import { IoMdFitness, IoMdHome } from 'react-icons/io';
import { RiShieldUserFill } from 'react-icons/ri';
import { TiMessages } from "react-icons/ti";
import { MdLocationOn } from "react-icons/md";
import manimg from "../assets/p3.jpg";
import Nav from './Nav';


export default function ProfileHeader() {
  return (
    <>     
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:p-4 rounded space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                    <img src={manimg} className="w-16 h-16 hidden sm:flex sm:w-24 sm:h-24 rounded-full object-cover border" alt="Profile" />
                    <div>
                        <h2 className="hidden sm:flex text-lg font-bold">Welcome Back!</h2>
                        <p className="hidden sm:flex">Jonathan Patterson</p>
                    </div>
                </div>
                <div className=" flex flex-row items-center justify-between gap-2  sm:gap-96 p-0 min-w-screen mt-0 sm:mt-0">
                <div className="flex items-center space-x-1 sm:space-x-2  text-gray-700">
                    <MdLocationOn className="text-[#800080] text-lg ml-2 sm:text-2xl" />
                    <p className="text-xs sm:text-lg">123 Anywhere Street, Any City, live Location</p>
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFfu_ZVNUxQdE0BeCort2WImHvVh95Y12Zg&s"
          alt="Employee"
        />
        <div className="text-left">
          <h2 className="text-lg sm:text-xl font-extrabold">EMPLOYEE NAME</h2>
          <p className="text-black font-medium">Employee Position</p>
          <p className="text-black text-sm font-light">Employee ID</p>
        </div>
      </div>
    
      <div className="flex justify-between">
      <hr className="border-t-2 border-[#800080] w-[250px] sm:w-[570px] mt-4 ml-4" />
      <h3 className="text-lg sm:text-xl font-bold mr-4">DETAILS</h3>
      </div>
      <div className="p-1 ml-4 sm:ml-16">
        <ul className="text-gray-700 sm:space-y-1 text-sm sm:text-base">
          <li><strong>Employee Name:</strong></li>
          <li><strong>Employee Position:</strong></li>
          <li><strong>Employee ID:</strong></li>
          <li><strong>Employee Joining Date:</strong></li>
          <li><strong>Employee Phone Number:</strong></li>
          <li><strong>Employee Emergency Number:</strong></li>
          <li><strong>Employee Permanent Address:</strong></li>
          <div className="sm:pt-8 sm:pb-3 mt-4 sm:space-y-1">
          <li><strong>Employee Login User Name:</strong></li>
          <li><strong>Employee Login Password:</strong></li>
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
  <div className="border-2 border-black bg-secondary text-center text-lg font-semibold sm:p-3 rounded-lg sm:mt-4">
    Total Report : 300 Report
  </div>

  {/* Stats Grid - Force Two Columns on Mobile */}
<div className="grid grid-cols-2 sm:grid-cols-2 gap-4  mt-3 sm:mt-4">
  
  {/* Attendance */}
  <div className="border-2 border-black bg-primary text-white p-0 sm:p-3 rounded-lg flex justify-between items-center">
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
  <div className="border-2 border-black bg-secondary text-black p-0 sm:p-3 rounded-lg flex justify-between items-center">
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
  <div className="border-2 border-black bg-primary text-white p-0 sm:p-3 rounded-lg flex justify-between items-center">
    <p className="ml-2 text-[12px] sm:text-lg">Total <br />Working Hours</p>
    <p className="text-lg sm:text-3xl font-extrabold">80 Hr</p>
  </div>
</div>
</div>

    
    {/* Bottom Navigation */}
<div className="bg-primary text-white flex justify-center space-x-2 sm:space-x-4 py-2 sm:py-4 px-2 sm:px-10 sm:mt-2
    fixed bottom-0 left-0 w-full sm:static">
    <Nav />
</div>

      </div>
      </div>
    </>
  );
}
