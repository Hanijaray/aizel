const express = require("express");
const router = express.Router();
const AddAnnouncement = require("../models/AddAnnouncement");

// ✅ Add a new announcement
router.post("/", async (req, res) => {
  try {
    const {
      employeeName,
      dateTime,
      deadline,
      regarding,
      subject,
      announcement,
    } = req.body;

    // Validate required fields
    if (
      !employeeName ||
      !dateTime ||
      !deadline ||
      !regarding ||
      !subject ||
      !announcement
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newAnnouncement = new AddAnnouncement({
      employeeName,
      dateTime: new Date(dateTime), // ✅ Convert to Date before saving
      deadline: new Date(deadline), // ✅ Convert to Date before saving
      regarding,
      subject,
      announcement,
    });

    await newAnnouncement.save();
    res.status(201).json({
      message: "✅ Announcement added successfully!",
      announcement: newAnnouncement,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "❌ Failed to add announcement", details: error.message });
  }
});

// ✅ Fetch all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await AddAnnouncement.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({
      error: "❌ Failed to fetch announcements",
      details: error.message,
    });
  }
});
// ✅ Update an existing announcement by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      employeeName,
      dateTime,
      deadline,
      regarding,
      subject,
      announcement,
    } = req.body;

    // Validate required fields
    if (
      !employeeName ||
      !dateTime ||
      !deadline ||
      !regarding ||
      !subject ||
      !announcement
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedAnnouncement = await AddAnnouncement.findByIdAndUpdate(
      id,
      {
        employeeName,
        dateTime: new Date(dateTime),
        deadline: new Date(deadline),
        regarding,
        subject,
        announcement,
      },
      { new: true } // Return the updated document
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.json({
      message: "✅ Announcement updated successfully!",
      announcement: updatedAnnouncement,
    });
  } catch (error) {
    res.status(500).json({
      error: "❌ Failed to update announcement",
      details: error.message,
    });
  }
});

module.exports = router;
