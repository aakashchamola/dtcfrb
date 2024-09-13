const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true, unique: true },
  stops: [{
    busStopId: { type: mongoose.Schema.Types.ObjectId, ref: 'BusStop', required: true },
    busStopName: { type: String, required: true, },
    order: { type: Number, required: true },
    arrivalTime: { type: Date },
    departureTime: { type: Date }
  }],
  totalDistance: { type: Number, required: true },
  totalTime: { type: Number, required: true },
  congestionStatus: { type: String, enum: ['NA','clear', 'moderate', 'congested'], default: 'NA' },
  activeBuses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }]
});

module.exports = mongoose.model('Route', RouteSchema);
