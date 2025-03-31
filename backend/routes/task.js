const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/billing-system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const TaskSchema = new mongoose.Schema({
  employeeName: String,
  employeeID: String,
  definedDate: String,
  deadlineDate: String,
  category: String,
  subject: String,
  details: String,
  task: String,
  state: String,
  currentDate: String,
});

const Task = mongoose.model("Task", TaskSchema);

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/tasks/add", async (req, res) => {
  const { employeeName, employeeID, definedDate, deadlineDate, category, subject, details, task, state, currentDate } = req.body;

  if (!employeeName || !employeeID || !category || !subject) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newTask = new Task({
      employeeName,
      employeeID,
      definedDate,
      deadlineDate,
      category,
      subject,
      details,
      task,
      state,
      currentDate,
    });

    await newTask.save();
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
