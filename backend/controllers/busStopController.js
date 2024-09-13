const BusStop = require('../models/BusStop'); // Adjust the path as needed

exports.getAllBusStops = async (req, res) => {
    try {
        const busStops = await BusStop.find();
        res.json(busStops);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.addBusStop = async (req, res) => {
    try {
        const busStop = new BusStop(req.body);
        await busStop.save();
        res.status(201).json(busStop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateBusStop = async (req, res) => {
    try {
        const busStop = await BusStop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!busStop) {
            return res.status(404).json({ error: 'Bus Stop not found' });
        }
        res.json(busStop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBusStopById = async (req, res) => {
    try {
        const busStop = await BusStop.findById(req.params.id);
        if (!busStop) {
            return res.status(404).json({ error: 'Bus Stop not found' });
        }
        res.json(busStop);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBusStop = async (req, res) => {
    try {
        const busStop = await BusStop.findByIdAndDelete(req.params.id);
        if (!busStop) {
            return res.status(404).json({ error: 'Bus Stop not found' });
        }
        res.json({ message: 'Bus Stop deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
