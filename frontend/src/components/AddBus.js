import React, { useState } from 'react';
import axios from 'axios';

function AddBus() {
  const [busNumber, setBusNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState('Active');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBus = {
      busNumber,
      capacity,
      assignedCrew: [], // Assign crew manually later, or extend form
      routeId: '', // Update route manually or extend form for selecting route
      status,
    };

    axios.post('http://localhost:5001/api/buses/add', newBus)
      .then(response => {
        alert("Bus added successfully!");
      })
      .catch(error => {
        console.error("There was an error adding the bus!", error);
      });
  };

  return (
    <div>
      <h2>Add New Bus</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bus Number:</label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Add Bus</button>
      </form>
    </div>
  );
}

export default AddBus;
