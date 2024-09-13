const mongoose = require('mongoose');

const BusStopSchema = new mongoose.Schema({
  stopName: { type: String, required: true,unique: true},
  location: {
    latitude: { type: Number, required: true, },
    longitude: { type: Number, required: true }
  },
  city: { type: String, required: true },
  routes: [{ type: Number, ref: 'Route', default: [] }] // Default to empty array
});

module.exports = mongoose.model('BusStop', BusStopSchema);
