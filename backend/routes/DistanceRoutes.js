const express = require('express');
const DriverDistance = require('../models/WorkerDistance');

const router = express.Router();

// Save driver distance
router.post('/save', async (req, res) => {
    try {
        const { driverId, distance, startTime, endTime } = req.body;
        if (!driverId || !distance || !startTime || !endTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const distanceRecord = new DriverDistance({ driverId, distance, startTime, endTime });
        await distanceRecord.save();

        res.status(201).json({ message: 'Distance saved successfully', distanceRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error saving distance', error: error.message });
    }
});

// Get distance data for a driver
router.get('/:driverId', async (req, res) => {
    try {
        const distanceRecords = await DriverDistance.find({ driverId: req.params.driverId }).sort({ startTime: -1 });
        res.json(distanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching distance records', error: error.message });
    }
});

module.exports = router;
