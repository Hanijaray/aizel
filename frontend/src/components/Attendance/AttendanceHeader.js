import AttendanceForm from "./AttendanceForm";
import AttendanceHistory from "./AttendanceHistory";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserCircle } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { BsPenFill } from "react-icons/bs";
import { BiSolidCommentDetail } from "react-icons/bi";

import { IoMdPerson } from "react-icons/io";
import manimg from "../../assets/Man.jpg";

import Header from '../Header';

export default function AttendanceHeader() {
  return (
    <div className="min-h-screen min-w-screen bg-white font-serif m-0 p-0">
     {/* Fixed Header */}
     <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Header />
    </div>
    {/* <div className="flex flex-col items-center bg-gray-100 min-h-screen"> */}
     {/* Fixed Header */}
     

       {/* Welcome Section  */}
             <div className="flex flex-col sm:flex-col items-center justify-between p-2 pb-0 sm:p-4 sm:mt-16 mt-[56px]   min-w-screen rounded">
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

      {/* Attendance Section */}
      <div className="flex items-center justify-between sm:m-1 ">
    <h3 className="sm:text-xl font-bold text-lg"> ATTENDANCE</h3>
    <div className="flex-1 border-t-2 border-[#800080] ml-4"></div>
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
    {/* </div> */}
    </div>
  );
}


  
  