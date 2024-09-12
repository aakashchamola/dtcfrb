import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  buttonStyle,
  inputStyle,
  formContainerStyle,
  labelStyle,} from '../ui/Style'; // Ensure this path is correct

const AddBusStop = () => {
  const [stopName, setStopName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [city, setCity] = useState('');
  const [routes, setRoutes] = useState('');

  const validateForm = () => {
    if (!stopName) {
      toast.error('Stop Name is required');
      return false;
    }
    if (!latitude || isNaN(latitude)) {
      toast.error('Valid Latitude is required');
      return false;
    }
    if (!longitude || isNaN(longitude)) {
      toast.error('Valid Longitude is required');
      return false;
    }
    if (!city) {
      toast.error('City is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    try {
      const newBusStop = {
        stopName,
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        },
        city,
        routes: routes ? routes.split(',').map(route => route.trim()) : [] // Handle optional routes
      };

      await axios.post('http://localhost:5001/api/busstop', newBusStop);
      toast.success('Bus Stop added successfully');

      // Reset form after submission
      setStopName('');
      setLatitude('');
      setLongitude('');
      setCity('');
      setRoutes('');
    } catch (error) {
      toast.error('Error adding bus stop');
      console.error('Error adding bus stop', error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Add Bus Stop</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Stop Name</label>
          <input
            type="text"
            value={stopName}
            onChange={(e) => setStopName(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Latitude</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Longitude</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Routes (Optional, comma-separated Route IDs)</label>
          <input
            type="text"
            value={routes}
            onChange={(e) => setRoutes(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Add Bus Stop
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddBusStop;
