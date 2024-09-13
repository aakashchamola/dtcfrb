import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  buttonStyle, inputStyle, selectStyle, labelStyle, formContainerStyle, detailsContainerStyle
} from '../ui/Style'; // Ensure 'detailsContainerStyle' is defined in your styles file

const AddSchedule = () => {
  const [buses, setBuses] = useState([]);
  const [crews, setCrews] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);

  const [busId, setBusId] = useState('');
  const [crewId, setCrewId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [shiftStartTime, setShiftStartTime] = useState('');
  const [shiftEndTime, setShiftEndTime] = useState('');
  const [scheduleType, setScheduleType] = useState('Linked');
  const [handoverBusId, setHandoverBusId] = useState('');
  const [status, setStatus] = useState('scheduled');

  // Fetch data for buses, crews, and routes at the start
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [busResponse, crewResponse, routeResponse] = await Promise.all([
          axios.get('http://localhost:5001/api/bus'),
          axios.get('http://localhost:5001/api/crew'),
          axios.get('http://localhost:5001/api/route')
        ]);

        setBuses(busResponse.data);
        setCrews(crewResponse.data);
        setRoutes(routeResponse.data);
      } catch (error) {
        toast.error('Error fetching data');
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  // When a route is selected, fetch its stops
  useEffect(() => {
    const selectedRoute = routes.find(route => route._id === routeId);
    if (selectedRoute) {
      setStops(selectedRoute.stops);
    } else {
      setStops([]);
    }
  }, [routeId, routes]);

  const validateForm = () => {
    if (!busId) {
      toast.error('Bus ID is required');
      return false;
    }
    if (!crewId) {
      toast.error('Crew ID is required');
      return false;
    }
    if (!routeId) {
      toast.error('Route ID is required');
      return false;
    }
    if (!shiftStartTime) {
      toast.error('Shift Start Time is required');
      return false;
    }
    if (!shiftEndTime) {
      toast.error('Shift End Time is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newSchedule = {
        busId,
        crewId,
        routeId,
        shiftStartTime: new Date(shiftStartTime),
        shiftEndTime: new Date(shiftEndTime),
        scheduleType,
        handoverBusId: handoverBusId || null,
        status
      };

      await axios.post('http://localhost:5001/api/schedule', newSchedule);
      toast.success('Schedule added successfully');

      // Reset form after submission
      setBusId('');
      setCrewId('');
      setRouteId('');
      setShiftStartTime('');
      setShiftEndTime('');
      setScheduleType('Linked');
      setHandoverBusId('');
      setStatus('scheduled');
    } catch (error) {
      toast.error('Error adding schedule');
      console.error('Error adding schedule', error);
    }
  };

  // Get selected bus details
  const selectedBus = buses.find(bus => bus._id === busId);

  // Get selected crew details
  const selectedCrew = crews.find(crew => crew._id === crewId);

  return (
    <div style={formContainerStyle}>
      <h2>Add Schedule</h2>
      <form onSubmit={handleSubmit}>

        {/* Bus Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Bus</label>
          <select
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
            style={selectStyle}
            required
          >
            <option value="" disabled>Select a bus</option>
            {buses.map(bus => (
              <option key={bus._id} value={bus._id}>{bus.busNumber}</option>
            ))}
          </select>

          {/* Bus details */}
          {selectedBus && (
            <div style={{ marginLeft: '20px', marginTop: '10px', ...detailsContainerStyle }}>
              <p>Bus Type: {selectedBus.busType}</p>
              <p>Capacity: {selectedBus.capacity}</p>
              <p>Status: {selectedBus.status}</p>
            </div>
          )}
        </div>

        {/* Crew Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Crew</label>
          <select
            value={crewId}
            onChange={(e) => setCrewId(e.target.value)}
            style={selectStyle}
            required
          >
            <option value="" disabled>Select a crew</option>
            {crews.map(crew => (
              <option key={crew._id} value={crew._id}>{crew.name}</option>
            ))}
          </select>

          {/* Crew details */}
          {selectedCrew && (
            <div style={{ marginLeft: '20px', marginTop: '10px', ...detailsContainerStyle }}>
              <p>Role: {selectedCrew.role}</p>
              <p>Availability Status: {selectedCrew.availabilityStatus}</p>
              {selectedCrew.shiftDetails && (
                <p>Shift: {new Date(selectedCrew.shiftDetails.startTime).toLocaleTimeString()} - {new Date(selectedCrew.shiftDetails.endTime).toLocaleTimeString()}</p>
              )}
            </div>
          )}
        </div>

        {/* Route Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Route</label>
          <select
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            style={selectStyle}
            required
          >
            <option value="" disabled>Select a route</option>
            {routes.map(route => (
              <option key={route._id} value={route._id}>{route.routeNumber}</option>
            ))}
          </select>
        </div>

        {/* Stops List (displayed based on selected route) */}
        {stops.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Stops</label>
            <ul style={{ marginLeft: '20px' }}>
              {stops.map((stop, index) => (
                <li key={index}>{stop.busStopName}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Shift Start Time */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift Start Time</label>
          <input
            type="datetime-local"
            value={shiftStartTime}
            onChange={(e) => setShiftStartTime(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {/* Shift End Time */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift End Time</label>
          <input
            type="datetime-local"
            value={shiftEndTime}
            onChange={(e) => setShiftEndTime(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        {/* Schedule Type */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Schedule Type</label>
          <select
            value={scheduleType}
            onChange={(e) => setScheduleType(e.target.value)}
            style={selectStyle}
          >
            <option value="Linked">Linked</option>
            <option value="Unlinked">Unlinked</option>
          </select>
        </div>

        {/* Handover Bus ID */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Handover Bus ID (Optional)</label>
          <input
            type="text"
            value={handoverBusId}
            onChange={(e) => setHandoverBusId(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Status */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit" style={buttonStyle}>Add Schedule</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddSchedule;
