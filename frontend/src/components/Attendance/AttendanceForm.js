import { LuCalendarFold } from "react-icons/lu";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AttendanceForm() {
  const [approvedEmployees, setApprovedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loginTime, setLoginTime] = useState(""); // ✅ State for login time
  const [logoutTime, setLogoutTime] = useState(""); // ✅ State for logout time
  const [date, setDate] = useState(""); // ✅ State for Date

  // ✅ Fetch Approved Employees from Backend
  useEffect(() => {
    const fetchApprovedEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/workers/approved");
        console.log("Approved Employees:", response.data); // Debugging
        setApprovedEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchApprovedEmployees();
  }, []);

  // ✅ Handle Employee Selection
  const handleEmployeeSelect = (e) => {
    const employeeName = e.target.value;
    const employee = approvedEmployees.find((emp) => emp.employeeName === employeeName);
    setSelectedEmployee(employee || null);
  };
  const handleSubmit = async () => {
    if (!selectedEmployee || !loginTime || !logoutTime) {
      alert("Please fill all fields before submitting.");
      return;
    }
  
    const attendanceData = {
      employeeId: selectedEmployee.employeeId,
      employeeName: selectedEmployee.employeeName,
      position: selectedEmployee.position,
      loginTime,
      logoutTime,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/attendance/submit", attendanceData);
      alert(response.data.message);
      setLoginTime("");
      setLogoutTime("");
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance.");
    }
  };
  
 
  return (
    <div className="flex flex-col items-center sm:mt-0 sm:pt-2 sm-pb-0 sm:mb-0  p-4 sm:p-6 lg:w-3/2">
      {/* Attendance Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-gray-300 border-2 w-full max-w-2xl text-center">
        <h2 className="text-xl font-bold">Attendance Form</h2>
        <p className="text-gray-600 text-sm mb-4">
          Please fill out this form to record your Attendance
        </p>
        <div className="border-2 border-fuchsia-900 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <select
              className="p-2 border rounded-lg sm:w-1/2 bg-fuchsia-900 text-white mb-2 sm:mb-0 sm:mr-2"
              onChange={handleEmployeeSelect}
            >
              <option value="">Select Employee</option>
              {approvedEmployees.length > 0 ? (
                approvedEmployees.map((employee) => (
                  <option key={employee._id} value={employee.employeeName}>
                    {employee.employeeName}
                  </option>
                ))
              ) : (
                <option disabled>No Approved Employees</option>
              )}
            </select>

            <div className="text-left text-sm">
              <p><strong>Employee ID:</strong> {selectedEmployee ? selectedEmployee.employeeId : "N/A"}</p>
              <p><strong>Position:</strong> {selectedEmployee ? selectedEmployee.position : "N/A"}</p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap justify-between items-center space-y-2 sm:space-y-0">
            <div className="p-3 border rounded-lg bg-fuchsia-900 text-white w-full sm:w-1/3 flex flex-col items-center space-y-2">
              <span>Login Time</span>
              <input
                type="time"
                value={loginTime}
                onChange={(e) => setLoginTime(e.target.value)}
                className="bg-white text-black rounded-lg p-2 w-full cursor-pointer"
              />
            </div>

            <div className="p-3 border rounded-lg bg-fuchsia-900 text-white w-full sm:w-1/3 flex flex-col items-center space-y-2">
              <span>Logout Time</span>
              <input
                type="time"
                value={logoutTime}
                onChange={(e) => setLogoutTime(e.target.value)}
                className="bg-white text-black rounded-lg p-2 w-full cursor-pointer"
              />
            </div>

            <div className="p-3 border rounded-lg bg-fuchsia-900 text-white w-full sm:w-1/3 flex flex-col items-center space-y-2">
              <span>Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white text-black rounded-lg p-2 w-full cursor-pointer"
              />
            </div>
          </div>

          <button 
    onClick={handleSubmit}
    className="p-2 border rounded-lg bg-white border-fuchsia-900 text-fuchsia-900 w-full flex items-center justify-center space-x-2 mt-2">
    <span>Enter</span>
    <LuCalendarFold />
  </button>
        </div>
      </div>

      {/* Attendance & Absent Cards */}
      <div className="flex justify-center mt-6 space-x-4 sm:space-y-0 sm:space-x-4 w-full max-w-2xl">
        <div className="bg-fuchsia-900 text-white p-4 rounded-lg flex-1 flex flex-col items-center shadow-lg">
          <p className="text-lg font-bold">Attendance</p>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold">90%</p>
            <FaArrowTrendUp className="text-2xl" />
          </div>
          <p className="text-sm">28 Days</p>
        </div>

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
