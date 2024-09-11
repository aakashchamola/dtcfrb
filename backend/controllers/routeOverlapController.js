const RouteOverlap = require('../models/RouteOverlap');

// Get all route overlaps
exports.getAllRouteOverlaps = async (req, res) => {
    try {
        const overlaps = await RouteOverlap.find();
        res.json(overlaps);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new route overlap
exports.addRouteOverlap = async (req, res) => {
    try {
        const newOverlap = new RouteOverlap(req.body);
        await newOverlap.save();
        res.json(newOverlap);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};
