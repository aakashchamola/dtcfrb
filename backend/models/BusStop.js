const mongoose = require('mongoose');

const BusStopSchema = new mongoose.Schema({
  stopName: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  city: { type: String, required: true },
  routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route', default: null }]
});

module.exports = mongoose.model('BusStop', BusStopSchema);
