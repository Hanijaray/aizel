import { useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import img1 from "../../assets/img1.png";
import axios from "axios";
import { IoMdFitness, IoMdHome } from 'react-icons/io';
import { RiShieldUserFill } from 'react-icons/ri';
import { BsPenFill } from "react-icons/bs";
import { BiSolidCommentDetail } from "react-icons/bi";


function handleSaveReport() {
  const formData = new FormData();
  formData.append("regarding", document.querySelector("input[placeholder='Regarding']").value);
  formData.append("subject", document.querySelector("input[placeholder='Subject']").value);
  formData.append("customerType", document.querySelector("input[placeholder='Customer Type']").value);
  formData.append("state", document.querySelector("input[placeholder='State']").value);
  formData.append("companyName", document.querySelector("input[placeholder='Company Name']").value);
  formData.append("communicatorName", document.querySelector("input[placeholder='Communicator Name']").value);
  formData.append("latitude", document.querySelector("input[placeholder='Latitude']").value);
  formData.append("longitude", document.querySelector("input[placeholder='Longitude']").value);
  formData.append("detail", document.querySelector("input[placeholder='Detail']").value);

  // Add the photo file
  const photoInput = document.querySelector("input[type='file']");
  if (photoInput.files[0]) {
    formData.append("photo", photoInput.files[0]);
  }

  axios.post("https://aizel-lyaq.onrender.com/api/reports", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      console.log("Report saved:", response.data);
      alert("Report saved successfully!");
      window.location.reload(); // Reload page to refresh data
    })
    .catch((error) => {
      console.error("Error saving report:", error);
      alert("Failed to save report.");
    });
}

export default function Location1() {

  const [activeButton, setActiveButton] = useState("Report History");
  return (

    <div className="w-full  bg-black overflow-x-hidden pt-0 sm:m-0  overflow-y-auto">
      <div className="bg-white px-4 md:p-2 shadow-lg w-full h-full mt-0 pt-0 relative overflow-hidden">
        {/* Welcome Section  */}
        <div className="flex flex-col sm:flex-col items-center justify-between p-2 pb-0 sm:p-4  min-w-screen rounded">
          <div className="flex flex-row items-center justify-between w-full mt-2 sm:mt-0">
            {/* Left: Profile Image & Name */}
            <div className="flex items-center justify-start space-x-3 sm:space-x-4">

              <img src={img1} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border" alt="Profile" />
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
              <p className="text-[10px] sm:text-lg">123 Anywhere Street, Any City, live Location</p>
            </div>

            {/* Right: Login Time */}
            <p className="text-[10px] sm:text-lg text-gray-700">Login: 9:30 pm</p>
          </div>

        </div>
        <div className="flex items-center justify-between sm:m-1 ">
          <h3 className="sm:text-xl font-bold text-lg">DAILY REPORT</h3>
          <div className="flex-1 border-t-2 border-[#800080] ml-4"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full space-y-6 md:space-y-0 md:space-x-10">
          <div className="flex flex-col space-y-4 w-full md:w-1/2 text-white">
            {/* Button Group */}
            <div className="flex  justify-center  sm:justify gap-2 w-full">
              {["Report Location", "Add New Report", "Report History"].map((button) => (
                <button
                  key={button}
                  onClick={() => setActiveButton(button)}
                  className={`border text-[9px] sm:text-lg w-full sm:w-fit rounded-full px-4 py-2 transition-all 
          ${activeButton === button ? "bg-[#800080] text-white border-[#800080]" : "border-gray-300 text-gray-300"}`}
                >
                  {button}
                </button>
              ))}
            </div>
            <div className="flex flex-col space-y-3 w-full justify-center items-center">
              {["Regarding", "Subject", "Customer Type", "State", "Company Name", "Communicator Name"].map((placeholder) => (
                <input
                  key={placeholder}
                  type="text"
                  placeholder={placeholder}
                  className="border-2 p-2 w-[95%] md:w-[90%] h-[45px] md:h-[50px] rounded border-[#800080] placeholder-black text-black font-bold"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4 w-full md:w-1/2 text-white mb-6">
            <div className="relative">
              <label className="border-2 p-2 w-[95%] md:w-[90%] mx-auto h-[45px] md:h-[50px] rounded border-[#800080] text-black font-bold flex items-center justify-start cursor-pointer">
                <span id="fileLabel" className="text-black">Add Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                  onChange={(e) => {
                    // Update the label text when a file is selected
                    const label = document.getElementById('fileLabel');
                    label.textContent = e.target.files[0] ? e.target.files[0].name : 'Add Photo';
                  }}
                />
              </label>
            </div>
            {["Latitude", "Longitude"].map((placeholder, index) => (
              <input
                key={index}
                type="text"
                placeholder={placeholder}
                className="border-2 p-2 w-[95%] md:w-[90%] mx-auto h-[45px] md:h-[50px] rounded border-[#800080] placeholder-black text-black font-bold"
              />
            ))}
            <input
              type="text"
              placeholder="Detail"
              className="border-2 p-2 w-[95%] md:w-[90%] mx-auto h-[90px] rounded border-[#800080] placeholder-black text-black font-bold"
            />
            <button
              onClick={handleSaveReport}
              className="bg-yellow-500 text-black py-2 px-5 rounded text-lg md:text-2xl sm:pb-2 pb-20 font-bold h-[55px] md:h-[70px] w-[95%] md:w-[90%] mx-auto"
            >
              SAVE REPORT
            </button>
            {/* Fixed Bottom Navigation */}
            <div className="fixed sm:static sm:w-[650px] bottom-0 left-0 w-full  sm:mx-10 bg-[#800080] text-white flex flex-wrap justify-center h-auto items-center sm:py-4 py-2 px-5 sm:px-5 gap-2 sm:gap-4 z-50">
              <a href="/home">
                <IoMdHome size={50} className="sm:w-12 sm:h-12 w-6 h-6 rounded-full border" />
              </a>

              <a href="/fitness">
                <IoMdFitness size={50} className="sm:w-12 sm:h-12 w-6 h-6 rounded-full border" />
              </a>

              <a href="/report" className="bg-white px-3 py-2 flex items-center text-[#800080] rounded-full">
                <BsPenFill size={50} className="sm:w-8 sm:h-8 w-4 h-4 rounded-full" />
                <button className="ml-2 rounded-full sm:text-xl text-base font-medium font-[cursive]">Report</button>
              </a>

              <a href="/comments">
                <BiSolidCommentDetail size={50} className="sm:w-12 sm:h-12 w-6 h-6 rounded-full border" />
              </a>

              <a href="/security">
                <RiShieldUserFill size={50} className="sm:w-12 sm:h-12 w-6 h-6 rounded-full border" />
              </a>

              <a href="/profile">
                <FaUserCircle size={50} className="sm:w-12 sm:h-12 w-6 h-6 rounded-full border" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}