import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRoute = () => {
  const [routeNumber, setRouteNumber] = useState('');
  const [stops, setStops] = useState([{ busStopId: '', order: '', arrivalTime: '', departureTime: '' }]);
  const [totalDistance, setTotalDistance] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [congestionStatus, setCongestionStatus] = useState('');
  const [activeBuses, setActiveBuses] = useState(['']);

  const validateForm = () => {
    if (!routeNumber) {
      toast.error('Route Number is required');
      return false;
    }
    if (stops.some(stop => !stop.busStopId || !stop.order)) {
      toast.error('All stops must have a Bus Stop ID and Order');
      return false;
    }
    if (!totalDistance) {
      toast.error('Total Distance is required');
      return false;
    }
    if (!totalTime) {
      toast.error('Total Time is required');
      return false;
    }
    return true;
  };

  const handleStopChange = (index, field, value) => {
    const updatedStops = [...stops];
    updatedStops[index][field] = value;
    setStops(updatedStops);
  };

  const addStop = () => {
    setStops([...stops, { busStopId: '', order: '', arrivalTime: '', departureTime: '' }]);
  };

  const removeStop = (index) => {
    const updatedStops = stops.filter((_, stopIndex) => stopIndex !== index);
    setStops(updatedStops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    try {
      const newRoute = {
        routeNumber,
        stops,
        totalDistance: Number(totalDistance),
        totalTime: Number(totalTime),
        congestionStatus,
        activeBuses: activeBuses.filter(bus => bus), // remove empty entries
      };

      await axios.post('http://localhost:5001/api/route', newRoute);
      toast.success('Route added successfully');

      // Reset form after submission
      setRouteNumber('');
      setStops([{ busStopId: '', order: '', arrivalTime: '', departureTime: '' }]);
      setTotalDistance('');
      setTotalTime('');
      setCongestionStatus('');
      setActiveBuses(['']);
    } catch (error) {
      toast.error('Error adding route');
      console.error('Error adding route', error);
    }
  };

  return (
    <div>
      <h2>Add Route</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Route Number:
          <input type="text" value={routeNumber} onChange={(e) => setRouteNumber(e.target.value)} required />
        </label>
        <br />
        <label>
          Stops:
          {stops.map((stop, index) => (
            <div key={index}>
              <label>
                Bus Stop ID:
                <input
                  type="text"
                  value={stop.busStopId}
                  onChange={(e) => handleStopChange(index, 'busStopId', e.target.value)}
                  required
                />
              </label>
              <label>
                Order:
                <input
                  type="number"
                  value={stop.order}
                  onChange={(e) => handleStopChange(index, 'order', e.target.value)}
                  required
                />
              </label>
              <label>
                Arrival Time:
                <input
                  type="datetime-local"
                  value={stop.arrivalTime}
                  onChange={(e) => handleStopChange(index, 'arrivalTime', e.target.value)}
                />
              </label>
              <label>
                Departure Time:
                <input
                  type="datetime-local"
                  value={stop.departureTime}
                  onChange={(e) => handleStopChange(index, 'departureTime', e.target.value)}
                />
              </label>
              <button type="button" onClick={() => removeStop(index)}>
                Remove Stop
              </button>
              <br />
            </div>
          ))}
          <button type="button" onClick={addStop}>
            Add Stop
          </button>
        </label>
        <br />
        <label>
          Total Distance (km):
          <input type="number" value={totalDistance} onChange={(e) => setTotalDistance(e.target.value)} required />
        </label>
        <br />
        <label>
          Total Time (minutes):
          <input type="number" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} required />
        </label>
        <br />
        <label>
          Congestion Status:
          <input
            type="text"
            value={congestionStatus}
            onChange={(e) => setCongestionStatus(e.target.value)}
          />
        </label>
        <br />
        <label>
          Active Buses (comma-separated Bus IDs):
          <input
            type="text"
            value={activeBuses.join(',')}
            onChange={(e) => setActiveBuses(e.target.value.split(','))}
          />
        </label>
        <br />
        <button type="submit">Add Route</button>
      </form>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default AddRoute;
