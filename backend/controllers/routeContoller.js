const mongoose = require('mongoose');  // Ensure mongoose is imported
const Route = require('../models/Route');

// Get all routes
exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Get a route by ID
exports.getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.json(route);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Add a new route
exports.addRoute = async (req, res) => {
    try {
        const { activeBuses, ...routeData } = req.body;

        // Validate each item in activeBuses array
        if (activeBuses && Array.isArray(activeBuses)) {
            // Check if each item is a valid ObjectId
            const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

            if (!activeBuses.every(id => id === '' || isValidObjectId(id))) {
                return res.status(400).json({ message: 'Invalid ObjectId in activeBuses', error: 'Invalid data' });
            }
        }

        // Remove empty strings from activeBuses
        const cleanedActiveBuses = activeBuses.filter(id => id.trim() !== '');

        const newRoute = new Route({ ...routeData, activeBuses: cleanedActiveBuses });
        const savedRoute = await newRoute.save();
        res.status(201).json(savedRoute);
    } catch (err) {
        console.error('Error adding new route:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: 'Validation Error', error: err.message });
        } else {
            res.status(400).json({ message: 'Invalid data', error: err.message });
        }
    }
};

// Update a route
exports.updateRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }

        // Prevent manual updates to activeBuses
        if (req.body.activeBuses && req.body.activeBuses.length > 0) {
            return res.status(400).json({ error: 'activeBuses cannot be updated manually' });
        }

        const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoute);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a route
exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.json({ message: 'Route deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
