const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  busType: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, default: 'available' },
  assignedRouteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', default: null },
  currentCrewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crew', default: null },
  lastMaintenanceDate: { type: Date,default: null  }
});

module.exports = mongoose.model('Bus', BusSchema);
