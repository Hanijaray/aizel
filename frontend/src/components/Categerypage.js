import { useState } from "react";
import Map from "../components/Map";
import { BiMessageDetail } from "react-icons/bi";
import { FaBell, FaUser } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { PiUserCircleFill } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { TbMessages } from "react-icons/tb";
import { FaPenClip, FaLocationDot } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Logincard from "./Logincard";
import "./Popup.css";

const Category = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showSecondPopup, setShowSecondPopup] = useState(false);
    const [showThirdPopup, setShowThirdPopup] = useState(false);
    const [showFourthPopup, setShowFourthPopup] = useState(false);

 
  return (
    <div className="bg-gray-100 flex flex-col items-center p-4">
   <header className="w-full flex justify-between items-center text-white py-2 px-4 rounded-md"
        style={{ backgroundColor: "#950f95" }}>
        <div className="flex items-center gap-2">
          <img src="./Images/logo3.png" alt="Logo" className="w-12 h-6 sm:w-14 sm:h-7" />
          <span className="text-lg sm:text-2xl text-yellow-500 font-serif font-bold">AZIEL</span>
        </div>
        <div className="flex gap-2 relative">
        <span className="w-8 h-8 sm:w-10 sm:h-9 flex items-center justify-center bg-white rounded-lg">
          <BiMessageDetail className="text-lg sm:text-xl" style={{ color: "#950f95" }} />
        </span>
        
        <div className="relative">
          <FaBell className="w-8 h-8 sm:w-10 sm:h-9 p-1 sm:p-2 bg-white rounded-lg me-2 sm:me-4" style={{ color: "#950f95" }} />
          <span className="absolute top-0 lg:right-6 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>
      
      </header>
      
<div className="flex lg:mb-3 px-4 items-center justify-between w-full lg:mt-3 sm:mt-1 mb-1 mt-1">
  <div id="card" className="flex items-center">
    <img src="./Images/emp1.jpeg" alt="employee1" className="h-12 w-12 lg:h-14 lg:w-14 rounded-full border-2" />
    <div className="ml-3">
      <span className="text-sm lg:text-md font-bold">Welcome Back!</span><br />
      <span className="text-gray-500  text-xs lg:text-sm">Jonathan Patterson</span>
    </div>   
  </div>
  <button
    className="ml-auto text-white px-3 lg:px-5 py-1 rounded-2xl  text-xs lg:text-sm flex items-center mr-3 bg-[#950f95]">
    VIEW PROFILE <FaUser className="ml-2" />
  </button>
</div>
      <main className="w-full flex flex-col sm:flex-row sm:items-start gap-4 lg:mt-3">
       <div className="w-full sm:w-1/2 flex flex-col">
      <div className="flex items-center px-4 lg:mb-3  text-gray-500 text-xs mb-1 ">
            <FaLocationDot style={{ color: "#950f95" }} />
            <span className="ml-2">123 Anywhere Street, Any City, Live Location</span>
            <span className="ml-auto text-xs">Login: _______</span>
          </div>
          <div>
<Logincard></Logincard>
</div>
          <div className="flex justify-between items-center lg:mt-5 px-2 mt-1 mb-1">
            <span className="text-gray-700 font-bold text-xs lg:text-sm">Category</span>
            <span className="text-gray-500 text-xs lg:text-sm cursor-pointer">See More</span>
          </div>
          <div className="flex flex-wrap sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 lg:mt-2">
            {[
              { icon: <CgGym />, label: "Daily Task" },
              { icon: <FaPenClip />, label: "Report" },
              { icon: <TbMessages />, label: "Permission" },
              { icon: <TiTick />, label: "Attendance" },
              { icon: <PiUserCircleFill />, label: "Profile" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-14 h-14 lg:w-20 lg:h-20 lg:ms-5 sm:w-16 sm:h-16  flex items-center justify-center"
                  style={{ backgroundColor: "#950f95", borderRadius: "50px" }}>
                  <div className="  text-3xl lg:text-5xl  text-white">{item.icon}</div>
                </div>
                <span className="text-xs sm:text-sm text-gray-700 mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

<div >
   <div className="p-4 rounded-lg w-full bg-[#950f95]" >
        <div className="flex justify-between items-center flex-wrap">
          <span className="text-sm font-semibold text-white">Enter subject</span>
          <button
            className="bg-yellow-400 rounded-xl text-xs px-3 py-1 text-black"
            onClick={() => setShowPopup(true)}>
            New Task
          </button>
        </div>
        <p className="text-xs mt-1 text-white flex justify-between w-full">
          <span>Days remaining: 3</span>
          <span className="text-xs text-white">Date: 10:00 AM | Deadline: 6:00 PM</span>
        </p>
      </div>
     
        {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center fixed-popup  backdrop-blur-xs">
          <div className="bg-white p-3 rounded-lg shadow-lg w-85 max-w-full mx-4">
                        <p className="text-black text-sm font-semibold flex mb-1">Category:   
                          <RxCross2 className="ms-60 "onClick={() => setShowPopup(false)} /></p>
                        <hr className="text-gray-200"></hr>
         <p className="text-black text-xs">
              Review the project requirements carefully to understand<br></br> the scope.
              Break down the tasks into smaller, manageable<br></br> steps for better organization.
              Assign deadlines to each step <br></br>to ensure timely completion.
              Finally, start working on the<br></br> first task with focus and efficiency.
            </p>
            <button
              className="mt-4 bg-[#ffb200] text-black px-3 py-2 rounded-lg w-full font-bold"
              onClick={() => {
                setShowPopup(false);
                setShowSecondPopup(true);
              }}>
              Update State
            </button>
          </div>
        </div>
      )}
      
  {showSecondPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50   backdrop-blur-xs">
          <div className="bg-white p-4 rounded-lg shadow-lg w-88 max-w-full mx-4">
            <p className="text-black text-sm font-semibold mb-1 flex">Category:
            <RxCross2 className="ms-60 " onClick={() => setShowSecondPopup(false)}/>
            </p>
            <hr className="text-gray-200"></hr>
         <p className="text-black text-xs mt-3">
              Review the project requirements carefully to understand<br /> the
              scope. Break down the tasks into smaller, manageable<br /> steps
              for better organization. Assign deadlines to each step <br /> to
              ensure timely completion. Finally, start working on the<br />{" "}
              first task with focus and efficiency.
            </p>
            <div className="flex justify-between mt-4">
              <button
                className="bg-[#ffb200] text-black px-3 py-2 rounded-lg w-1/2 mr-2 font-bold"
                onClick={() => {
                  setShowSecondPopup(false);
                  setShowThirdPopup(true);
                }}>
                Completed
              </button>

              <button
                className="bg-[#e54d76] text-white px-3 py-2 rounded-lg w-1/2 font-bold"
                onClick={() => {
                  setShowSecondPopup(false);
                  setShowFourthPopup(true);
                }}>Failed
              </button>
            </div>
          </div>
        </div>
      )}
      {showThirdPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-xs">
          <div className="bg-white p-4 rounded-lg shadow-lg w-74 max-w-full mx-4">
            
            <p className="items-center justify-center font-bold">Are you sure this task has been<br></br> 
              <span className="text-2xl font-bold items-center justify-center ms-15 mb-2">Completed?</span></p>
             <button
                className="bg-[#45a834] text-white px-3 py-2 rounded-lg w-65 mt-1 mr-2 mb-1 font-bold font-caladea"
                onClick={() => setShowThirdPopup(false)}>
                COMPLETED
              </button>
              <button
                className="bg-[#1b3f4b] text-white px-3 py-2 rounded-lg w-65 font-bold font-caladea"
                onClick={() => setShowThirdPopup(false)}>
              CANCEL
              </button>
            </div>
        </div>
      )}
     {showFourthPopup && (
        <div className="fixed inset-0 background-black-500 flex items-center justify-center  z-50 backdrop-blur-xs">
          <div className="bg-white p-4 rounded-lg shadow-lg w-74 max-w-full mx-4">
            
            <p className="items-center justify-center font-bold">Are you sure this task has been<br></br> 
              <span className="text-2xl font-bold items-center justify-center ms-24 mb-2">Failed?</span></p>
           <button
                className="bg-[#45a834] text-white px-3 py-2 rounded-lg w-65 mt-1 mr-2 mb-1 font-bold font-caladea"
                onClick={() => setShowFourthPopup(false)}>
                FAILED
              </button>
              <button
                className="bg-[#1b3f4b] text-white px-3 py-2 rounded-lg w-65 font-bold font-caladea"
                onClick={() => setShowFourthPopup(false)}>
              CANCEL
              </button>  
            </div>
        </div>
      )}
<div className="map-container">
          <div className="text-gray-700 font-bold text-xs sm:text-sm lg:mb-2 sm:mb-0 mt-1 mb-1 ">Your Current Location</div>

< Map />
</div>
</div>
       </main>
    </div>
  );
};

export default Category;








