import React from "react";
import { useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { IoMdFitness, IoMdHome } from 'react-icons/io';
import { RiShieldUserFill } from 'react-icons/ri';
import manimg from "../assets/p3.jpg";
import ReportPopup from "./ReportPopup"; 
import Nav from "./Nav";

const Dashboard = () => {
    
    const [activeButton, setActiveButton] = useState("Report History");
    const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <div className="min-h-screen min-w-screen bg-gray-100 font-serif m-0 p-0">
    
      {/* User Info */}
       {/* Welcome Section  */}
       <div className="flex flex-col sm:flex-col items-center justify-between p-2 pb-0 sm:p-4  min-w-screen rounded">
       <div className="flex flex-row items-center justify-between w-full mt-2 sm:mt-0">
{/* Left: Profile Image & Name */}
<div className="flex items-center justify-start space-x-3 sm:space-x-4">
    
    <img src={manimg} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border" alt="Profile" />
    <div>
        <h2 className="text-sm sm:text-lg font-bold">Welcome Back!</h2>
        <p className="text-xs sm:text-base text-gray-600">Jonathan Patterson</p>
    </div>
</div>

{/* Right: View Profile Button */}
<button className="bg-[#800080] text-white justify-end px-3 sm:px-5 py-1.5 sm:py-3 rounded-full flex items-center text-xs sm:text-sm font-semibold">
    VIEW PROFILE <FaUserCircle className="ml-2 text-lg sm:text-xl" />
</button>
</div>
{/* Second Line: Location & Login Time */}
<div className="flex flex-row items-center justify-between gap-2  sm:gap-96 p-1 min-w-screen mt-0 sm:mt-0">
    {/* Left: Location */}
    <div className="flex items-center space-x-2  text-gray-700">
        <MdLocationOn className="text-[#800080] text-lg sm:text-2xl" />
        <p className="text-xs sm:text-lg">123 Anywhere Street, Any City, live Location</p>
    </div>

    {/* Right: Login Time */}
    <p className="text-xs sm:text-lg text-gray-700">Login: 9:30 pm</p>
</div>

</div>

            <div className="flex items-center justify-between sm:m-1 ">
    <h3 className="sm:text-xl font-bold text-lg">DAILY REPORT</h3>
    <div className="flex-1 border-t-2 border-[#800080] ml-4"></div>
</div>


<div className="flex flex-col mt-2 sm:flex-row gap-2 sm:gap-5 h-full w-full">

{/* Reports Section */}
<div className="sm:p-4 p-1 pt-0 pb-0 w-full">
  {/* Button Group */}
  <div className="flex  justify-center sm:justify gap-2 w-full">
    {["Report Location", "Add New Report", "Report History"].map((button) => (
      <button
        key={button}
        onClick={() => setActiveButton(button)}
        className={`border text-[9px] sm:text-lg w-full sm:w-fit rounded-full px-4 py-2 transition-all 
          ${activeButton === button ? "bg-[#800080] text-white border-[#800080]" : "border-gray-300 text-gray-700"}`}
      >
        {button}
      </button>
    ))}
  </div>

  {/* Today's Report */}
  <div className="flex items-center justify-between w-full sm:mt-5 mt-3">
    <h3 className="sm:text-xl font-bold text-lg">TODAY’S REPORT</h3>
    <div className="border-t-2 border-[#800080] flex-grow ml-4"></div>
  </div>

  <div className="sm:mt-4 mt-2 space-y-4 border-2 border-[#800080] rounded-lg p-4 h-auto sm:h-[300px] mx-3 flex flex-col">
      
        <div  className="flex justify-center" onClick={() => setPopupOpen(true)}>
          <div className="bg-[#fbc058] text-[9px] sm:text-lg sm:p-6 p-3 rounded-lg w-full sm:w-[80%] max-w-2xl shadow-md">
            <div className="flex justify-between">
              <p><strong>Regarding:</strong></p>
              <p>20:38:43 Fri, Dec 20 2024</p>
            </div>
            <div className="flex justify-between">
              <p><strong>Customer Type:</strong></p>
              <p className="sm:mr-36 mr-[72px]">Subject:</p>
            </div>
          </div>
        </div>    
        <div  className="flex justify-center" onClick={() => setPopupOpen(true)}>
          <div className="bg-[#fbc058] text-[9px] sm:text-lg sm:p-6 p-3 rounded-lg w-full sm:w-[80%] max-w-2xl shadow-md">
            <div className="flex justify-between">
              <p><strong>Regarding:</strong></p>
              <p>20:38:43 Fri, Dec 20 2024</p>
            </div>
            <div className="flex justify-between">
              <p><strong>Customer Type:</strong></p>
              <p className="sm:mr-36 mr-[72px]">Subject:</p>
            </div>
          </div>
        </div>  
      

      {/* Report Popup */}
      <ReportPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </div>
</div>


{/* Report History Section */}
<div className="p-4 w-full">
  <div className="flex items-center justify-between">
  <div className="border-t-2 border-[#800080] flex-grow ml-4"></div>
    <h3 className="sm:text-xl font-bold text-lg">REPORT HISTORY</h3>
  </div>

  <div className="mt-4 space-y-4 border border-purple-950 rounded-lg h-[200px] sm:h-[400px]">
    {[1, 2, 3].map((_, index) => (
      <div key={index} className="border border-purple-500 sm:p-4 p-2 text-[9px] sm:text-lg  rounded-lg m-4">
        <div className="flex justify-between">
          <p><strong>Regarding:</strong></p>
          <p>20:38:43 Fri, Dec 20 2024</p>
        </div>
        <div className="flex justify-between">
          <p><strong>Customer Type:</strong></p>
          <p>Subject:</p>
        </div>
      </div>
    ))}
  </div>

  {/* Bottom Navigation */}
  <div className="mt-4 bg-[#800080] text-white flex flex-wrap justify-center h-auto items-center sm:py-4 py-2 px-5 sm:px-10 gap-2 sm:gap-4 ml-0 mr-0">
   <Nav />
</div>

</div>

</div>

    </div>
  );
};

export default Dashboard;
