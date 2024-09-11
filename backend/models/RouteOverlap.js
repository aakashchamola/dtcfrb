const mongoose = require('mongoose');

const RouteOverlapSchema = new mongoose.Schema({
  routeId1: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  routeId2: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  overlapStops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusStop' }],
  overlapDistance: { type: Number }
});

module.exports = mongoose.model('RouteOverlap', RouteOverlapSchema);
