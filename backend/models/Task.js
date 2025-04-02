const mongoose = require("mongoose");

// Check if the model is already compiled
const Task = mongoose.models.Task || mongoose.model("Task", new mongoose.Schema({
  employeeName: { type: String, required: true },
  employeeID: { type: String, required: true },
  definedDate: { type: Date, required: true },
  deadlineDate: { type: Date, required: true },
  category: { type: String, required: true },
  subject: { type: String, required: true },
  details: { type: String, required: true },
  task: { type: String, default: "Report Subject" },
  state: { type: String, default: "Pending" },
  currentDate: { type: Date, default: Date.now },
}));

module.exports = Task;
