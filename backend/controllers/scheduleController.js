const Bus = require('../models/Bus');
const Schedule = require('../models/Schedule');
const Crew = require('../models/Crew');
const Route = require('../models/Route');

// Get all schedules
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get schedule by ID
exports.getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.json(schedule);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new schedule
exports.addSchedule = async (req, res) => {
    try {
        const newSchedule = new Schedule(req.body);
        await newSchedule.save();

        // Update Bus with assignedRouteId and assignedCrewId
        await Bus.findByIdAndUpdate(newSchedule.busId, {
            assignedRouteId: newSchedule.routeId,
            assignedCrewId: newSchedule.crewId,
            lastMaintenanceDate: new Date() // Update lastMaintenanceDate
        });

        // Update Crew with assignedBusId and pastBusAssignments
        await Crew.updateMany({ _id: { $in: newSchedule.crewId } }, {
            assignedBusId: newSchedule.busId,
            $push: {
                pastBusAssignments: {
                    busId: newSchedule.busId,
                    routeId: newSchedule.routeId,
                    assignmentDate: new Date()
                }
            }
        });

        // Update Route with activeBuses
        await Route.findByIdAndUpdate(newSchedule.routeId, {
            $addToSet: { activeBuses: newSchedule.busId }
        });

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

        // Update Bus with assignedRouteId and assignedCrewId
        await Bus.findByIdAndUpdate(updatedSchedule.busId, {
            assignedRouteId: updatedSchedule.routeId,
            assignedCrewId: updatedSchedule.crewId,
            lastMaintenanceDate: new Date() // Update lastMaintenanceDate
        });

        // Update Crew with assignedBusId and pastBusAssignments
        await Crew.updateMany({ _id: { $in: updatedSchedule.crewId } }, {
            assignedBusId: updatedSchedule.busId,
            $push: {
                pastBusAssignments: {
                    busId: updatedSchedule.busId,
                    routeId: updatedSchedule.routeId,
                    assignmentDate: new Date()
                }
            }
        });

        // Update Route with activeBuses
        await Route.findByIdAndUpdate(updatedSchedule.routeId, {
            $addToSet: { activeBuses: updatedSchedule.busId }
        });

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

        // Update Bus, Crew, and Route
        await Bus.findByIdAndUpdate(schedule.busId, {
            $unset: { assignedRouteId: "", assignedCrewId: "" },
            lastMaintenanceDate: null
        });

        await Crew.updateMany({ _id: { $in: schedule.crewId } }, {
            $unset: { assignedBusId: "" },
            $pull: { pastBusAssignments: { busId: schedule.busId } }
        });

        await Route.findByIdAndUpdate(schedule.routeId, {
            $pull: { activeBuses: schedule.busId }
        });

        res.json({ message: 'Schedule deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
