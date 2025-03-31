const mongoose = require('mongoose');

const driverReportSchema = new mongoose.Schema({
    driverId: String,
    regarding: String,
    subject: String,
    customerType: String,
    state: String,
    companyName: String,
    communicatorName: String,
    photo: String,
    latitude: Number,
    longitude: Number,
    detail: String,
    createdAt: { type: Date, default: Date.now },
  });


module.exports = mongoose.model('DriverReport', driverReportSchema);