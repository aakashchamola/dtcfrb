import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { buttonStyle, inputStyle, formContainerStyle, labelStyle,selectStyle} from '../ui/Style';

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
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:5001/api/route', {
        routeNumber,
        stops,
        totalDistance,
        totalTime,
        congestionStatus,
        activeBuses
      });
      toast.success('Route added successfully');
      setRouteNumber('');
      setStops([{ busStopId: '', order: '', arrivalTime: '', departureTime: '' }]);
      setTotalDistance('');
      setTotalTime('');
      setCongestionStatus('');
      setActiveBuses(['']);
    } catch (error) {
      console.error('Error adding route', error);
      toast.error('Error adding route');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Add New Route</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Route Number</label>
          <input
            type="text"
            value={routeNumber}
            onChange={(e) => setRouteNumber(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <h3>Stops</h3>
        {stops.map((stop, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={labelStyle}>Bus Stop ID</label>
              <input
                type="text"
                value={stop.busStopId}
                onChange={(e) => handleStopChange(index, 'busStopId', e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={labelStyle}>Order</label>
              <input
                type="number"
                value={stop.order}
                onChange={(e) => handleStopChange(index, 'order', e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={labelStyle}>Arrival Time</label>
              <input
                type="datetime-local"
                value={stop.arrivalTime}
                onChange={(e) => handleStopChange(index, 'arrivalTime', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={labelStyle}>Departure Time</label>
              <input
                type="datetime-local"
                value={stop.departureTime}
                onChange={(e) => handleStopChange(index, 'departureTime', e.target.value)}
                style={inputStyle}
              />
            </div>
            <button type="button" onClick={() => removeStop(index)} style={{ ...buttonStyle, backgroundColor: 'red' }}>
              Remove Stop
            </button>
          </div>
        ))}
        <button type="button" onClick={addStop} style={buttonStyle}>
          Add Stop
        </button>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Total Distance (km)</label>
          <input
            type="number"
            value={totalDistance}
            onChange={(e) => setTotalDistance(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Total Time (Minutes)</label>
          <input
            type="number"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Congestion Status</label>
          <select
            value={congestionStatus}
            onChange={(e) => setCongestionStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="NA">Select</option>
            <option value="Clear">Clear</option>
            <option value="Moderate">Moderate</option>
            <option value="Congested">Congested</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Active Buses (comma-separated Bus IDs)</label>
          <input
            type="text"
            value={activeBuses.join(', ')}
            onChange={(e) => setActiveBuses(e.target.value.split(',').map(bus => bus.trim()))}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Add Route
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddRoute;
