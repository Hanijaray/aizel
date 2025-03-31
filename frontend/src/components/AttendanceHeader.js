import AttendanceForm from "./AttendanceForm";
import AttendanceHistory from "./AttendanceHistory";
import { FaLocationDot } from "react-icons/fa6";

import { IoMdPerson } from "react-icons/io";
import image from "../assets/p2.png";

export default function AttendanceHeader() {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
    

      {/* User Info */}
      <div className="text-white p-4 w-full max-w-9xl flex flex-col md:flex-row md:justify-between items-center md:text-left mt-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-0 md:space-x-4">
        <img src={image} alt="Profile" className="h-12 w-12 rounded-full" />

          <div>
            <p className="font-bold text-black">Welcome Back!</p>
            <p className="text-sm text-gray-600">Jonathan Patterson</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 mt-3 md:mt-0">
        <span className="text-fuchsia-900"><FaLocationDot /></span>
          <p>123 Anywhere Street, Any City, Live Location</p>
        </div>
        <div className="text-gray-600 text-sm mt-3 md:mt-0">Login: 9:30 pm</div>
        <button className="bg-fuchsia-900 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mt-4 md:mt-0">
          <span>VIEW PROFILE</span>
          <span><IoMdPerson /></span>
        </button>
      </div>

      {/* Attendance Section */}
      <div className="w-full max-w-9xl mt-4 px-6">
        <h2 className="text-xl font-bold">ATTENDANCE</h2>
        <hr className="border-t-2 border-gray-300 mt-1" />
      </div>

      {/* Merged Attendance Form & History - Make them Equal Height */}
      <div className="flex flex-col md:flex-row w-full max-w-9xl mt-6 space-y-0 md:space-y-0 md:space-x-6 items-stretch">
        <div className="w-full md:w-2/3 flex flex-col flex-1 h-[600px]">
          <AttendanceForm />
        </div>
        <div className="w-full md:w-2/3 flex flex-col flex-1 h-[600px]">
          <AttendanceHistory />
        </div>
      </div>
    </div>
  );
}


  
  