const mongoose = require('mongoose');

const DriverDistanceSchema = new mongoose.Schema({
    driverId: { type: String, required: true },
    distance: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DriverDistance', DriverDistanceSchema);
