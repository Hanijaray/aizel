import { LuCalendarFold } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

export default function AttendanceForm() {
    return (
      <div className="flex flex-col items-center p-4 sm:p-6 lg:w-3/2">
        {/* Attendance Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-xl font-bold">Attendance Form</h2>
          <p className="text-gray-600 text-sm mb-4">
            Please fill out this form to record your Attendance
          </p>
          <div className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <select className="p-2 border rounded-lg sm:w-1/2 bg-fuchsia-900 text-white mb-2 sm:mb-0 sm:mr-2">
                <option>Your Name</option>
              </select>
              <div className="text-left text-sm">
                <p>Employee ID:</p>
                <p>Position:</p>
              </div>
            </div>
            <div className="flex justify-between">
  <button className="p-2 border rounded-lg  bg-fuchsia-900  text-white w-full sm:w-1/2 mb-2 sm:mb-0 sm:mr-2 flex items-center justify-center space-x-2">
    <span>Login Time</span> 
    <LuCalendarFold />
  </button>
  <button className="p-2 border rounded-lg bg-fuchsia-900 text-white w-full sm:w-1/2 mb-2 sm:mb-0 sm:mr-2 flex items-center justify-center space-x-2">
    <span>Logout Time</span>
    <LuCalendarFold />
  </button>
</div>

          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
      {/* Attendance Card */}
      <div className="bg-fuchsia-900 text-white p-4 rounded-lg flex-1 flex flex-col items-center shadow-lg">
        <p className="text-lg font-bold">Attendance</p>
        <div className="flex items-center space-x-2">
          <p className="text-2xl font-bold">90%</p>
          <FaArrowTrendUp className="text-2xl" />
        </div>
        <p className="text-sm">28 Days</p>
      </div>
      
      {/* Absent Card */}
      <div className="bg-yellow-500 text-black p-4 rounded-lg flex-1 flex flex-col items-center shadow-lg">
        <p className="text-lg font-bold">Absent</p>
        <div className="flex items-center space-x-2">
          <p className="text-2xl font-bold">10%</p>
          <FaArrowTrendDown className="text-2xl" />
        </div>
        <p className="text-sm">2 Days</p>
      </div>
    </div>
        </div>
    
    );
  }
  