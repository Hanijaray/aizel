const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Added for frontend API calls
const AccessRequest = require("../models/AccessRequest");


// Enable CORS
router.use(cors());

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ✅ Submit Access Request
router.post("/", upload.single("profilePhoto"), async (req, res) => {
  try {
    const { employeeName, joiningDate, phoneNumber, emergencyPhone, username, password, address, employeeId, position } = req.body;

    console.log("Received Request:", req.body);

    const newRequest = new AccessRequest({
      employeeName,
      profilePhoto: req.file ? req.file.path : "",
      joiningDate,
      phoneNumber,
      emergencyPhone,
      username,
      password,
      address,
      employeeId,
      position,
      status: "Pending",
    });

    await newRequest.save();
    res.status(201).json({ message: "✅ Access request submitted successfully!", data: newRequest });
  } catch (error) {
    console.error("❌ Error submitting access request:", error);
    res.status(500).json({ error: "Failed to submit access request", details: error.message });
  }
});

// ✅ Get All Access Requests
router.get("/", async (req, res) => {
  try {
    const requests = await AccessRequest.find();
    res.json(requests);
  } catch (error) {
    console.error("❌ Error fetching access requests:", error);
    res.status(500).json({ error: "Failed to fetch access requests", details: error.message });
  }
});

// ✅ Get Pending Access Requests
router.get("/pending", async (req, res) => {
  try {
    const pendingRequests = await AccessRequest.find({ status: "Pending" });
    res.json(pendingRequests);
  } catch (error) {
    console.error("❌ Error fetching pending requests:", error);
    res.status(500).json({ error: "Failed to fetch pending access requests" });
  }
});

// ✅ Approve Request and Move to Worker
router.patch("/:id/approve", async (req, res) => {
  try {
    const request = await AccessRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });

    const newWorker = new Worker({
      employeeName: request.employeeName,
      profilePhoto: request.profilePhoto,
      joiningDate: request.joiningDate,
      phoneNumber: request.phoneNumber,
      emergencyPhone: request.emergencyPhone,
      username: request.username,
      password: request.password,
      address: request.address,
      employeeId: request.employeeId,
      position: request.position,
      status: "Approved",
    });

    await newWorker.save();
    await AccessRequest.findByIdAndDelete(req.params.id);

    res.json({ message: "✅ Request Approved and moved to Worker", worker: newWorker });
  } catch (error) {
    console.error("❌ Error approving request:", error);
    res.status(500).json({ error: "Failed to approve request" });
  }
});

// ✅ Reject Request
router.patch("/:id/reject", async (req, res) => {
  try {
    await AccessRequest.findByIdAndUpdate(req.params.id, { status: "Rejected" });
    res.json({ message: "❌ Request Rejected" });
  } catch (error) {
    console.error("❌ Error rejecting request:", error);
    res.status(500).json({ error: "Failed to reject request" });
  }
});

// ✅ Get Only Approved Access Requests
router.get("/approved", async (req, res) => {
  try {
    const approvedRequests = await AccessRequest.find({ status: "Approved" });
    res.json(approvedRequests);
  } catch (error) {
    console.error("❌ Error fetching approved requests:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get Worker Details by Employee ID
router.get("/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    console.log("🔍 Fetching worker details for Employee ID:", employeeId);

    const worker = await AccessRequest.findOne({ employeeId });

    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    res.json(worker);
  } catch (error) {
    console.error("❌ Error fetching worker details:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// ✅ Login Route (Fix: Ensure password is hashed)
router.post("/login", async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    const worker = await AccessRequest.findOne({ employeeId });

    if (!worker) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, worker.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    res.json({ message: "✅ Login successful", employeeId: worker.employeeId });
  } catch (error) {
    res.status(500).json({ error: "❌ Error logging in", details: error.message });
  }
});

// ✅ Update Worker Details
router.put("/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const updatedData = req.body;

    console.log("🔄 Updating worker details for Employee ID:", employeeId);

    const updatedWorker = await AccessRequest.findOneAndUpdate(
      { employeeId: employeeId },
      { $set: updatedData },
      { new: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    res.json(updatedWorker);
  } catch (error) {
    console.error("❌ Error updating worker details:", error);
    res.status(500).json({ error: "Failed to update worker details" });
  }
});

module.exports = router;

