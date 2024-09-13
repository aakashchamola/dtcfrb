import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  buttonStyle,
  inputStyle,
  formContainerStyle,
  selectStyle,
  labelStyle,
} from '../ui/Style';

const EditRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [routeData, setRouteData] = useState({
    routeNumber: '',
    stops: [{ busStopId: '', order: '', arrivalTime: '', departureTime: '' }],
    totalDistance: 0,
    totalTime: 0,
    congestionStatus: '',
    activeBuses: [],
  });

  const [allStops, setAllStops] = useState([]);

  useEffect(() => {
    // Fetch route data
    const fetchRouteData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/route/${id}`);
        // Ensure date-time fields are in the correct format
        const formattedData = {
          ...response.data,
          stops: response.data.stops.map(stop => ({
            ...stop,
            arrivalTime: stop.arrivalTime ? new Date(stop.arrivalTime).toISOString().slice(0, 16) : '',
            departureTime: stop.departureTime ? new Date(stop.departureTime).toISOString().slice(0, 16) : '',
          })),
        };
        setRouteData(formattedData);
      } catch (error) {
        console.error('Error fetching route data', error);
      }
    };

    // Fetch all stops for dropdown
    const fetchStops = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/busstop');
        setAllStops(response.data);
      } catch (error) {
        console.error('Error fetching stops', error);
      }
    };

    fetchRouteData();
    fetchStops();
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

  const handleAddStop = () => {
    setRouteData({
      ...routeData,
      stops: [...routeData.stops, { busStopId: '', order: '', arrivalTime: '', departureTime: '' }],
    });
  };

  const handleRemoveStop = (index) => {
    const updatedStops = routeData.stops.filter((_, i) => i !== index);
    setRouteData({
      ...routeData,
      stops: updatedStops,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert date-time fields to ISO string format before sending
      const formattedData = {
        ...routeData,
        stops: routeData.stops.map(stop => ({
          ...stop,
          arrivalTime: stop.arrivalTime ? new Date(stop.arrivalTime).toISOString() : '',
          departureTime: stop.departureTime ? new Date(stop.departureTime).toISOString() : '',
        })),
      };
      await axios.put(`http://localhost:5001/api/route/${id}`, formattedData);
      navigate('/routes'); // Redirect to the routes list
    } catch (error) {
      console.error('Error updating route', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        await axios.delete(`http://localhost:5001/api/route/${id}`);
        navigate('/routes'); // Redirect to the routes list after deletion
      } catch (error) {
        console.error('Error deleting route', error);
      }
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Edit Route</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Route Number</label>
          <input
            type="text"
            name="routeNumber"
            value={routeData.routeNumber}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <h3>Stops</h3>
        {routeData.stops.map((stop, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <div style={{ marginBottom: '10px' }}>
              <label style={labelStyle}>Bus Stop</label>
              <select
                value={stop.busStopId}
                onChange={(e) => handleStopChange(index, 'busStopId', e.target.value)}
                style={selectStyle}
                required
              >
                <option value="">Select a Stop</option>
                {allStops.map(stopOption => (
                  <option key={stopOption._id} value={stopOption._id}>
                    {stopOption.stopName}
                  </option>
                ))}
              </select>
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
            <button type="button" onClick={() => handleRemoveStop(index)} style={{ ...buttonStyle, backgroundColor: 'red' }}>
              Remove Stop
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddStop} style={buttonStyle}>
          Add Stop
        </button>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Total Distance (km)</label>
          <input
            type="number"
            name="totalDistance"
            value={routeData.totalDistance}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Total Time (Minutes)</label>
          <input
            type="number"
            name="totalTime"
            value={routeData.totalTime}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Congestion Status</label>
          <select
            name="congestionStatus"
            value={routeData.congestionStatus}
            onChange={handleInputChange}
            style={selectStyle}
          >
            <option value="NA">Select</option>
            <option value="clear">Clear</option>
            <option value="moderate">Moderate</option>
            <option value="congested">Congested</option>
          </select>
        </div>

        {/* <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Active Buses (comma-separated Bus IDs)</label>
          <input
            type="text"
            name="activeBuses"
            value={routeData.activeBuses.join(', ')}
            onChange={(e) => handleInputChange({ target: { name: 'activeBuses', value: e.target.value.split(',').map(bus => bus.trim()) } })}
            style={inputStyle}
          />
        </div> */}

        <button type="submit" style={buttonStyle}>
          Update Route
        </button>
        <button type="button" onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: 'red', marginLeft: '10px' }}>
          Delete Route
        </button>
      </form>
    </div>
  );
};

export default EditRoute;
