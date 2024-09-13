const mongoose = require('mongoose');

const CrewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Driver', 'Conductor'], required: true },
  licenseNumber: { type: String, required: true, unique: true },
  availabilityStatus: { type: String,enum: ['available','not-available'], default: 'available' },
  assignedBusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', default: null },
  restPeriod: {
    startTime: { type: Date },
    endTime: { type: Date }
  },
  shiftDetails: {
    startTime: { type: Date },
    endTime: { type: Date }
  },
  pastBusAssignments: [{
    busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
    assignmentDate: { type: Date },
  }]
});

module.exports = mongoose.model('Crew', CrewSchema);
