const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  position: { type: String, required: true },
  loginTime: { type: String, required: true },
  logoutTime: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);