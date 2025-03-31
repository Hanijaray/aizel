const mongoose = require("mongoose");

const AddAnnouncementSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  dateTime: { type: Date, required: true },
  deadline: { type: Date, required: true },
  regarding: { type: String, required: true },
  subject: { type: String, required: true },
  announcement: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AddAnnouncement", AddAnnouncementSchema);