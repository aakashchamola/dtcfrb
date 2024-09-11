const mongoose = require('mongoose');

const RealTimeDataSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
  currentRouteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  speed: { type: Number },
  time: { type: Date, default: Date.now },
  status: { type: String }
});

module.exports = mongoose.model('RealTimeData', RealTimeDataSchema);