import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

const AddBus = () => {
  const [busNumber, setBusNumber] = useState('');
  const [busType, setBusType] = useState('NA'); // Initialize with default 'NA'
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
      return; // Prevent submission if validation fails
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
      setBusNumber(''); // Reset form after submission
      setBusType('NA');
      setCapacity('');
      setStatus('NA');
    } catch (error) {
      toast.error('Error adding bus');
      console.error('Error adding bus', error);
    }
  };

  return (
    <div>
      <h2>Add Bus</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Bus Number:
          <input type="text" value={busNumber} onChange={(e) => setBusNumber(e.target.value)} required />
        </label>
        <br />
        <label>
          Bus Type:
          <select value={busType} onChange={(e) => setBusType(e.target.value)}>
            <option value="NA">Select</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </label>
        <br />
        <label>
          Capacity:
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="NA">Select</option>
            <option value="available">Available</option>
            <option value="in-service">In Service</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Bus</button>
      </form>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default AddBus;
