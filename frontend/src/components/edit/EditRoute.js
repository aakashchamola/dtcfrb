import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  buttonStyle,
  inputStyle,
  formContainerStyle,
  labelStyle,
} from '../ui/style';

const EditRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [routeData, setRouteData] = useState({
    routeNumber: '',
    stops: [],
    totalDistance: 0,
    totalTime: 0,
    congestionStatus: '',
    activeBuses: [],
  });

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/routes/${id}`);
        setRouteData(response.data);
      } catch (error) {
        console.error('Error fetching route data', error);
      }
    };

    fetchRouteData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRouteData({
      ...routeData,
      [name]: value,
    });
  };

  const handleStopChange = (index, field, value) => {
    const updatedStops = [...routeData.stops];
    updatedStops[index] = { ...updatedStops[index], [field]: value };
    setRouteData({
      ...routeData,
      stops: updatedStops,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/routes/${id}`, routeData);
      navigate('/routes'); // Redirect to the routes list
    } catch (error) {
      console.error('Error updating route', error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Edit Route</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Route Number</label>
        <input
          type="text"
          name="routeNumber"
          value={routeData.routeNumber}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />

        <h3>Stops</h3>
        {routeData.stops.map((stop, index) => (
          <div key={index}>
            <label style={labelStyle}>Bus Stop ID</label>
            <input
              type="text"
              value={stop.busStopId}
              onChange={(e) => handleStopChange(index, 'busStopId', e.target.value)}
              style={inputStyle}
              required
            />
            <label style={labelStyle}>Order</label>
            <input
              type="number"
              value={stop.order}
              onChange={(e) => handleStopChange(index, 'order', e.target.value)}
              style={inputStyle}
              required
            />
            <label style={labelStyle}>Arrival Time</label>
            <input
              type="datetime-local"
              value={stop.arrivalTime}
              onChange={(e) => handleStopChange(index, 'arrivalTime', e.target.value)}
              style={inputStyle}
            />
            <label style={labelStyle}>Departure Time</label>
            <input
              type="datetime-local"
              value={stop.departureTime}
              onChange={(e) => handleStopChange(index, 'departureTime', e.target.value)}
              style={inputStyle}
            />
          </div>
        ))}

        <label style={labelStyle}>Total Distance</label>
        <input
          type="number"
          name="totalDistance"
          value={routeData.totalDistance}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Total Time (Minutes)</label>
        <input
          type="number"
          name="totalTime"
          value={routeData.totalTime}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Congestion Status</label>
        <input
          type="text"
          name="congestionStatus"
          value={routeData.congestionStatus}
          onChange={handleInputChange}
          style={inputStyle}
        />

        <h3>Active Buses</h3>
        <input
          type="text"
          name="activeBuses"
          value={routeData.activeBuses.join(', ')}
          onChange={handleInputChange}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Update Route
        </button>
      </form>
    </div>
  );
};

export default EditRoute;
