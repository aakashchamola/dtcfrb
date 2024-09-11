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

// // Import models
// const Bus = require('./models/Bus');
// const Crew = require('./models/Crew');
// const BusStop = require('./models/BusStop');
// const Route = require('./models/Route');
// const Schedule = require('./models/Schedules');
// // const RouteOverlap = require('./models/RouteOverlap');
// // const RealTimeData = require('./models/RealTimeData');

// Import routes
const busRoutes = require('./routes/busRoutes');
const crewRoutes = require('./routes/crewRoutes');
const busStopRoutes = require('./routes/busStopRoutes');
const routeRoutes = require('./routes/routeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
// const routeOverlapRoutes = require('./routes/routeOverlapRoutes');
// const realTimeDataRoutes = require('./routes/realTimeDataRoutes');

// Register routes
app.use('/api/buses', busRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/busstops', busStopRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/schedules', scheduleRoutes);
// app.use('/api/routeoverlaps', routeOverlapRoutes);
// app.use('/api/realtimedata', realTimeDataRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

// // Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
