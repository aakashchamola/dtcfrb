const RealTimeData = require('../models/RealTimeData');

// Get all real-time data entries
exports.getAllRealTimeData = async (req, res) => {
    try {
        const realTimeData = await RealTimeData.find().populate('bus crew');
        res.json(realTimeData);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new real-time data entry
exports.addRealTimeData = async (req, res) => {
    try {
        const newRealTimeData = new RealTimeData(req.body);
        await newRealTimeData.save();
        res.json(newRealTimeData);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};
