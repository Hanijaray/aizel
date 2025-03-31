const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

const validStates = ['New Task', 'On Progress', 'Completed', 'Failed', 'Outdated'];

// Update Task State
router.put('/update/:id', async (req, res) => {
  try {
    const { state } = req.body;
    if (!validStates.includes(state)) {
      return res.status(400).json({ message: "Invalid task state" });
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { state }, { new: true });
    res.json({ message: "✅ Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
