import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  buttonStyle,
  inputStyle,
  formContainerStyle,
  labelStyle,
  selectStyle,
} from '../ui/Style';

const AddCrew = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('NA'); // Initialize with default 'NA'
  const [licenseNumber, setLicenseNumber] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('available');
  const [assignedBusId, setAssignedBusId] = useState(''); // Default as empty since it's optional
  const [restStartTime, setRestStartTime] = useState('');
  const [restEndTime, setRestEndTime] = useState('');
  const [shiftStartTime, setShiftStartTime] = useState('');
  const [shiftEndTime, setShiftEndTime] = useState('');

  const validateForm = () => {
    if (!name) {
      toast.error('Crew Name is required');
      return false;
    }
    if (role === 'NA') {
      toast.error('Please select a Crew Role');
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
      const newCrew = {
        name,
        role,
        licenseNumber,
        availabilityStatus,
        assignedBusId: assignedBusId || null, // Assigned Bus ID is optional, set to null if empty
        restPeriod: {
          startTime: restStartTime || null,
          endTime: restEndTime || null,
        },
        shiftDetails: {
          startTime: shiftStartTime || null,
          endTime: shiftEndTime || null,
        }
      };

      await axios.post('http://localhost:5001/api/crew', newCrew);
      toast.success('Crew added successfully');
      
      // Reset form after submission
      setName('');
      setRole('NA');
      setLicenseNumber('');
      setAvailabilityStatus('available');
      setAssignedBusId('');
      setRestStartTime('');
      setRestEndTime('');
      setShiftStartTime('');
      setShiftEndTime('');
    } catch (error) {
      toast.error('Error adding crew');
      console.error('Error adding crew', error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Add Crew</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Crew Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={selectStyle}
            required
          >
            <option value="NA">Select</option>
            <option value="Driver">Driver</option>
            <option value="Conductor">Conductor</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>License Number</label>
          <input
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Availability Status</label>
          <select
            value={availabilityStatus}
            onChange={(e) => setAvailabilityStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Assigned Bus ID</label>
          <input
            type="text"
            value={assignedBusId}
            onChange={(e) => setAssignedBusId(e.target.value)}
            style={inputStyle}
          />
        </div>

        <h3>Rest Period</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Rest Start Time</label>
          <input
            type="datetime-local"
            value={restStartTime}
            onChange={(e) => setRestStartTime(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Rest End Time</label>
          <input
            type="datetime-local"
            value={restEndTime}
            onChange={(e) => setRestEndTime(e.target.value)}
            style={inputStyle}
          />
        </div>

        <h3>Shift Details</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift Start Time</label>
          <input
            type="datetime-local"
            value={shiftStartTime}
            onChange={(e) => setShiftStartTime(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift End Time</label>
          <input
            type="datetime-local"
            value={shiftEndTime}
            onChange={(e) => setShiftEndTime(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Add Crew
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCrew;
