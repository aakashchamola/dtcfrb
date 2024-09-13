const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  busType: { type: String,enum: ['AC','Non-AC'], required: true },
  capacity: { type: Number, required: true },
  status: { type: String,enum: ['available','in-service','maintenance'], default: 'available' },
  assignedRouteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', default: null },
  assignedCrewId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crew' }], // Changed to array
  lastMaintenanceDate: { type: Date, default: null }
});

module.exports = mongoose.model('Bus', BusSchema);
