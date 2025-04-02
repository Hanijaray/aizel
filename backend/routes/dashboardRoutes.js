const express = require('express');
const router = express.Router();
const DashboardTask = require('../models/DashboardTask');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await DashboardTask.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task state
router.put('/update/:id', async (req, res) => {
  try {
    const { state } = req.body;
    const updatedTask = await DashboardTask.findByIdAndUpdate(req.params.id, { state }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
