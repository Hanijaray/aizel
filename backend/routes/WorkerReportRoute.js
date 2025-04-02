const express = require('express');
const DriverReport = require('../models/WorkerReport');
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// POST: Save a new report with an optional photo
router.post("/submit", upload.single("photo"), async (req, res) => {
  try {
    const reportData = {
      ...req.body,
      photo: req.file ? `/uploads/${req.file.filename}` : "", // Save the file path
    };
    const report = new DriverReport(reportData);
    await report.save();
    res.status(201).json({ message: "Report saved successfully", report });
  } catch (error) {
    res.status(500).json({ message: "Error saving report", error });
  }
});

// Get all reports
router.get('/', async (req, res) => {
    try {
        const reports = await DriverReport.find().sort({ reportDate: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error: error.message });
    }
});

// Get reports by driver ID
router.get('/:driverId', async (req, res) => {
    try {
        const reports = await DriverReport.find({ driverId: req.params.driverId }).sort({ reportDate: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error: error.message });
    }
});

module.exports = router;
