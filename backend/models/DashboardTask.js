const mongoose = require('mongoose');

const dashboardTaskSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  state: { type: String, enum: ['New Task', 'On Progress', 'Completed', 'Failed', 'Outdated'], default: 'New Task' },
  daysRemaining: { type: Number, required: true },
  date: { type: String, required: true },
  deadline: { type: String, required: true }
});

module.exports = mongoose.model('DashboardTask', dashboardTaskSchema);
