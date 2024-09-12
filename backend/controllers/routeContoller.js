const BusStop = require('../models/BusStop');
const Route = require('../models/Route');

// Get all routes
exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a route by ID
exports.getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.json(route);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new route
exports.addRoute = async (req, res) => {
    try {
        const newRoute = new Route(req.body);
        (await newRoute.save())

        res.json(newRoute);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Update a route
exports.updateRoute = async (req, res) => {
    try {
        const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRoute) return res.status(404).json({ message: 'Route not found' });
        res.json(updatedRoute);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

// Delete a route
exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.json({ message: 'Route deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
