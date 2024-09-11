const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.URI).then(() => {
  console.log("MongoDB Connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

const app = express();
app.use(express.json()); // For parsing JSON

// Import models
const Bus = require('./models/Bus');
const Crew = require('./models/Crew');
const BusStop = require('./models/BusStop');
const Route = require('./models/Route');
const Schedule = require('./models/Schedules');
// const RouteOverlap = require('./models/RouteOverlap');
// const RealTimeData = require('./models/RealTimeData');

// Example route
app.get('/', (req, res) => {
  res.send('Automated Bus Scheduling and Route Management System API');
});

// // Example: Get all buses
app.get('/buses', async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

// // Example: Add a new bus
app.post('/buses', async (req, res) => {
  const bus = new Bus(req.body);
  await bus.save();
  res.json(bus);
});

// // Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
