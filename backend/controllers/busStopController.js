const BusStop = require('../models/BusStop');

// Get all bus stops
exports.getAllBusStops = async (req, res) => {
    try {
        const busStops = await BusStop.find();
        res.json(busStops);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get bus stop by ID
exports.getBusStopById = async (req, res) => {
    try {
        const busStop = await BusStop.findById(req.params.id);
        if (!busStop) return res.status(404).json({ message: 'Bus Stop not found' });
        res.json(busStop);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new bus stop
exports.addBusStop = async (req, res) => {
    try {
        const newBusStop = new BusStop(req.body);
        await newBusStop.save();
        res.json(newBusStop);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Update a bus stop
exports.updateBusStop = async (req, res) => {
    try {
        const updatedBusStop = await BusStop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBusStop) return res.status(404).json({ message: 'Bus Stop not found' });
        res.json(updatedBusStop);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Delete a bus stop
exports.deleteBusStop = async (req, res) => {
    try {
        const busStop = await BusStop.findByIdAndDelete(req.params.id);
        if (!busStop) return res.status(404).json({ message: 'Bus Stop not found' });
        res.json({ message: 'Bus Stop deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
