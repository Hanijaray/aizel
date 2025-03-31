import { FaHome } from "react-icons/fa";
import { CiDumbbell } from "react-icons/ci";
import { BsFillPenFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbMessages } from "react-icons/tb";
import { Link } from "react-router-dom"; // Import Link from React Router


const attendanceData = [
    { day: "Monday", state: "Present" },
    { day: "Tuesday", state: "Absent" },
    { day: "Wednesday", state: "Present" },
    { day: "Thursday", state: "Absent" },
    { day: "Friday", state: "Present" },
  ];

  

export default function AttendanceHistory() {
    return (
      <div className="flex flex-col items-center p-6  h-[800px]">
        {/* Attendance History */}
        <div className="max-w-9xl w-full mx-auto flex flex-col  ">
      {/* Title */}
      <div className="w-full px-6">
    <h2 className="text-xl font-bold flex items-center w-full">
        ATTENDANCE HISTORY
        <span className="ml-2 border-t-2 border-black flex-grow"></span>
    </h2>
</div>

      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg  overflow-x-auto  w-full">
        <table className="w-full text-center border-collapse h-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-fuchsia-900 text-white">
              <th className="p-3 whitespace-nowrap">Day</th>
              <th className="p-3 whitespace-nowrap">Date</th>
              <th className="p-3 whitespace-nowrap">Login</th>
              <th className="p-3 whitespace-nowrap">Logout</th>
              <th className="p-3 whitespace-nowrap">State</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {attendanceData.map((row, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="p-3whitespace-nowrap ">{row.day}</td>
                <td className="p-3 whitespace-nowrap">Dec 20 2024</td>
                <td className="p-3 whitespace-nowrap ">08:00am</td>
                <td className="p-3 whitespace-nowrap">08:00am</td>
                <td className="p-3 whitespace-nowrap">
                  <span
                    className={`px-4 py-1 rounded-full font-bold text-white text-sm ${
                      row.state === "Present" ? "bg-fuchsia-900" : "bg-red-500"
                    }`}
                  >
                    {row.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{/* Bottom Navigation */}
<div className="bg-fuchsia-900 w-full p-4 flex justify-center md:justify-around items-center mt-6 space-x-3 md:space-x-4 rounded-lg max-w-4xl mx-auto">
  <a href="/home" className="text-white bg-fuchsia-700 p-3 rounded-full flex items-center justify-center">
    <FaHome size={20} />
  </a>

  <a href="/workout" className="text-white bg-fuchsia-700 p-3 rounded-full flex items-center justify-center">
    <CiDumbbell size={20} />
  </a>

  <a href="/notes" className="text-white bg-fuchsia-700 p-3 rounded-full flex items-center justify-center">
    <BsFillPenFill size={18} />
  </a>

  <a href="/messages" className="text-white bg-fuchsia-700 p-3 rounded-full flex items-center justify-center">
    <TbMessages size={20} />
  </a>

  <a href="/attendance" className="bg-white text-fuchsia-900 rounded-full px-4 py-2 flex items-center space-x-2">
    <MdOutlineVerifiedUser size={20} />
    <span className="hidden md:inline">Attendance</span>
  </a>

  <a href="/profile" className="text-white bg-fuchsia-700 p-3 rounded-full flex items-center justify-center">
    <CgProfile size={20} />
  </a>
</div>


      </div>
     
    );
  }
  
  