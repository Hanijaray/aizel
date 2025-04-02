const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const Worker = require("../models/Worker");

const router = express.Router();

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

// ✅ Register Worker (Fix: Hash password)
router.post("/add", upload.single("profilePhoto"), async (req, res) => {
  try {
    const {
      employeeName, joiningDate, phoneNumber, emergencyPhone,
      username, password, address, employeeId, position
    } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newWorker = new Worker({
      employeeName,
      profilePhoto: req.file ? req.file.path : "",
      joiningDate,
      phoneNumber,
      emergencyPhone,
      username,
      password: hashedPassword,  // ✅ Store hashed password
      address,
      employeeId,
      position,
      status: "Pending",
    });

    await newWorker.save();
    res.status(201).json({ message: "✅ Access request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to submit access request", details: error.message });
  }
});

// ✅ Fetch all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Worker.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch access requests", details: error.message });
  }
});

// ✅ Fetch pending requests
router.get("/pending", async (req, res) => {
  try {
    const pendingRequests = await Worker.find({ status: "Pending" });
    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch pending requests", details: error.message });
  }
});

// ✅ Approve request (Fix: Merge duplicate routes)
router.patch("/:id/approve", async (req, res) => {
  try {
    const request = await Worker.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "❌ Request not found" });

    request.status = "Approved"; // ✅ Update status
    await request.save();

    res.json({ message: "✅ Request approved", request });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to approve request", details: error.message });
  }
});

// ✅ Reject Request
router.patch("/:id/reject", async (req, res) => {
  try {
    const request = await Worker.findByIdAndUpdate(req.params.id, { status: "Rejected" }, { new: true });
    if (!request) return res.status(404).json({ error: "❌ Request not found" });

    res.json({ message: "❌ Request rejected", request });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to reject request", details: error.message });
  }
});

// ✅ Fetch Approved Requests (Fix: Correct status value)
router.get("/approved-ipos", async (req, res) => {
  try {
    const approvedIPOs = await Worker.find({ status: "Approved" }); // ✅ Capitalized status
    res.json(approvedIPOs);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch approved requests", details: error.message });
  }
});

// ✅ Login Route (Fix: Ensure password is hashed)
router.post("/login", async (req, res) => {
  try {
    const { employeeId, password } = req.body;
    const worker = await Worker.findOne({ employeeId });

    if (!worker) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    // Directly compare plain text passwords
    if (password !== worker.password) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    res.json({ message: "✅ Login successful", employeeId: worker.employeeId });
  } catch (error) {
    res.status(500).json({ error: "❌ Error logging in", details: error.message });
  }
});

// ✅ Fetch Employee Names
router.get("/employee-names", async (req, res) => {
  try {
    const employeeNames = await Worker.find({}, "employeeName"); // Fetch only employeeName
    res.json(employeeNames);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee names", details: error.message });
  }
});

module.exports = router;