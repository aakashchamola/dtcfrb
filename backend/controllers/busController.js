const Bus = require('../models/Bus');

// Get all buses
exports.getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a bus by ID
exports.getBusById = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) return res.status(404).json({ message: 'Bus not found' });
        res.json(bus);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new bus
exports.addBus = async (req, res) => {
    try {
        const newBus = new Bus(req.body);
        await newBus.save();
        res.json(newBus);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Update a bus
exports.updateBus = async (req, res) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBus) return res.status(404).json({ message: 'Bus not found' });
        res.json(updatedBus);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Delete a bus
exports.deleteBus = async (req, res) => {
    try {
        const bus = await Bus.findByIdAndDelete(req.params.id);
        if (!bus) return res.status(404).json({ message: 'Bus not found' });
        res.json({ message: 'Bus deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
