const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  crewId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crew', required: true }], // Changed to array
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  shiftStartTime: { type: Date, required: true },
  shiftEndTime: { type: Date, required: true },
  scheduleType: { type: String, enum: ['Linked', 'Unlinked'], required: true },
  handoverBusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', default: null },
  status: { type: String,enum: ['scheduled', 'completed','cancelled'], default: 'scheduled' }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
 