const Crew = require('../models/Crew');

// Get all crew members
exports.getAllCrew = async (req, res) => {
    try {
        const crew = await Crew.find();
        res.json(crew);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new crew member
exports.addCrew = async (req, res) => {
    try {
        const newCrew = new Crew(req.body);
        await newCrew.save();
        res.json(newCrew);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Get crew by ID
exports.getCrewById = async (req, res) => {
    try {
        const crew = await Crew.findById(req.params.id);
        if (!crew) return res.status(404).json({ message: 'Crew member not found' });
        res.json(crew);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a crew member
exports.updateCrew = async (req, res) => {
    try {
        const updatedCrew = await Crew.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCrew) return res.status(404).json({ message: 'Crew member not found' });
        res.json(updatedCrew);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Delete a crew member
exports.deleteCrew = async (req, res) => {
    try {
        const crew = await Crew.findByIdAndDelete(req.params.id);
        if (!crew) return res.status(404).json({ message: 'Crew member not found' });
        res.json({ message: 'Crew member deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
