const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  employeeName: String,
  profilePhoto: String,
  joiningDate: String,
  phoneNumber: String,
  emergencyPhone: String,
  username: String,
  password: String,
  address: String,
  employeeId: String,
  position: String,
  status: { type: String, default: "Pending" }, // Pending, Approved, Rejected
  requestDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Worker', workerSchema);