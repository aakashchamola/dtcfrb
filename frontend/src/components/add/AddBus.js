import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  buttonStyle,
  inputStyle,
  formContainerStyle,
  labelStyle,
  selectStyle
} from '../ui/Style'; // Ensure this path is correct

const AddBus = () => {
  const [busNumber, setBusNumber] = useState('');
  const [busType, setBusType] = useState('NA');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState('NA');

  const validateForm = () => {
    if (!busNumber) {
      toast.error('Bus Number is required');
      return false;
    }
    if (busType === 'NA') {
      toast.error('Please select a Bus Type');
      return false;
    }
    if (!capacity || isNaN(capacity) || capacity <= 0) {
      toast.error('Please enter a valid Capacity');
      return false;
    }
    if (status === 'NA') {
      toast.error('Please select a Status');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const newBus = {
        busNumber,
        busType,
        capacity,
        status,
      };
      await axios.post('http://localhost:5001/api/bus', newBus);
      toast.success('Bus added successfully');
      setBusNumber('');
      setBusType('NA');
      setCapacity('');
      setStatus('NA');
    } catch (error) {
      toast.error('Error adding bus');
      console.error('Error adding bus', error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Add Bus</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Bus Number</label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Bus Type</label>
          <select
            value={busType}
            onChange={(e) => setBusType(e.target.value)}
            style={selectStyle}
            required
          >
            <option value="NA">Select</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="NA">Select</option>
            <option value="available">Available</option>
            <option value="in-service">In Service</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <button type="submit" style={buttonStyle}>
          Add Bus
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddBus;
