const express = require("express");
const Attendance = require("../models/Attendance");
const router = express.Router();

// ✅ Save or Update Attendance Record
router.post("/submit", async (req, res) => {
  try {
    const { employeeId, employeeName, position, loginTime, logoutTime, date } = req.body;

    // ✅ Determine Attendance Status
    const status = loginTime === logoutTime ? "Absent" : "Present";

    // ✅ Check if attendance already exists for the same employee on the same date
    let existingAttendance = await Attendance.findOne({ employeeId, date });

    if (existingAttendance) {
      // Update the existing attendance record
      existingAttendance.loginTime = loginTime;
      existingAttendance.logoutTime = logoutTime;
      existingAttendance.status = status;

      await existingAttendance.save();
      return res.status(200).json({ message: "Attendance updated successfully!" });
    } else {
      // Create a new attendance record
      const newAttendance = new Attendance({
        employeeId,
        employeeName,
        position,
        loginTime,
        logoutTime,
        date,
        status,
      });

      await newAttendance.save();
      return res.status(201).json({ message: "Attendance recorded successfully!" });
    }
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Fetch all attendance records
router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data", error });
  }
});

module.exports = router;