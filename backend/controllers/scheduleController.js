const Schedule = require('../models/Schedules');

// Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('bus crew');
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a schedule by ID
exports.getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id).populate('bus crew');
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.json(schedule);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new schedule
exports.addSchedule = async (req, res) => {
    try {
        const newSchedule = new Schedule(req.body);
        await newSchedule.save();
        res.json(newSchedule);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Update a schedule
exports.updateSchedule = async (req, res) => {
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSchedule) return res.status(404).json({ message: 'Schedule not found' });
        res.json(updatedSchedule);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Delete a schedule
exports.deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.json({ message: 'Schedule deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
