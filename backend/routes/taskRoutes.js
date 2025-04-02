const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// ✅ GET all tasks with state management
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        const currentDate = new Date();

        // Auto-update task states based on dates
        const updatedTasks = await Promise.all(
            tasks.map(async (task) => {
                if (task.state === "Pending" && currentDate >= new Date(task.definedDate)) {
                    task.state = "On Progress";
                }
                if (task.state === "On Progress" && currentDate > new Date(task.deadlineDate)) {
                    task.state = "Failed";
                }
                if (task.state !== "Completed") {
                    await task.save();
                }
                return task;
            })
        );

        res.status(200).json(updatedTasks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ POST: Add a new task
router.post("/add", async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json({ message: "Task added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ PUT: Update task state
router.put("/update/:id", async (req, res) => {
    try {
        const { state } = req.body;
        const validStates = ['New Task', 'On Progress', 'Completed', 'Failed', 'Outdated'];
        
        if (!validStates.includes(state)) {
            return res.status(400).json({ message: "Invalid state" });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { state }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "✅ Task updated successfully", updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
