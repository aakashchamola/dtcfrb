import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div>
      <h2>Add Crew</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Crew Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="NA">Select</option>
            <option value="Driver">Driver</option>
            <option value="Conductor">Conductor</option>
          </select>
        </label>
        <br />
        <label>
          License Number:
          <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
        </label>
        <br />
        <label>
          Availability Status:
          <select value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </label>
        <br />
        <label>
          Assigned Bus ID (Optional):
          <input type="text" value={assignedBusId} onChange={(e) => setAssignedBusId(e.target.value)} />
        </label>
        <br />
        <label>
          Rest Period Start Time (Optional):
          <input type="datetime-local" value={restStartTime} onChange={(e) => setRestStartTime(e.target.value)} />
        </label>
        <br />
        <label>
          Rest Period End Time (Optional):
          <input type="datetime-local" value={restEndTime} onChange={(e) => setRestEndTime(e.target.value)} />
        </label>
        <br />
        <label>
          Shift Start Time (Optional):
          <input type="datetime-local" value={shiftStartTime} onChange={(e) => setShiftStartTime(e.target.value)} />
        </label>
        <br />
        <label>
          Shift End Time (Optional):
          <input type="datetime-local" value={shiftEndTime} onChange={(e) => setShiftEndTime(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Crew</button>
      </form>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default AddCrew;
