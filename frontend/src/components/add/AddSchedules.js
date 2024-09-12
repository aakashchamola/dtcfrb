import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  buttonStyle, inputStyle, selectStyle, labelStyle, formContainerStyle
} from '../ui/Style'; // Ensure these styles are defined in your styles file

const AddSchedule = () => {
  const [busId, setBusId] = useState('');
  const [crewId, setCrewId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [shiftStartTime, setShiftStartTime] = useState('');
  const [shiftEndTime, setShiftEndTime] = useState('');
  const [scheduleType, setScheduleType] = useState('Linked');
  const [handoverBusId, setHandoverBusId] = useState('');
  const [status, setStatus] = useState('scheduled');

  const validateForm = () => {
    if (!busId) {
      toast.error('Bus ID is required');
      return false;
    }
    if (!crewId) {
      toast.error('Crew ID is required');
      return false;
    }
    if (!routeId) {
      toast.error('Route ID is required');
      return false;
    }
    if (!shiftStartTime) {
      toast.error('Shift Start Time is required');
      return false;
    }
    if (!shiftEndTime) {
      toast.error('Shift End Time is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const newSchedule = {
        busId,
        crewId,
        routeId,
        shiftStartTime: new Date(shiftStartTime),
        shiftEndTime: new Date(shiftEndTime),
        scheduleType,
        handoverBusId: handoverBusId || null, // Optional handoverBusId
        status
      };

      await axios.post('http://localhost:5001/api/schedule', newSchedule);
      toast.success('Schedule added successfully');

      // Reset form after submission
      setBusId('');
      setCrewId('');
      setRouteId('');
      setShiftStartTime('');
      setShiftEndTime('');
      setScheduleType('Linked');
      setHandoverBusId('');
      setStatus('scheduled');
    } catch (error) {
      toast.error('Error adding schedule');
      console.error('Error adding schedule', error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Add Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Bus ID</label>
          <input
            type="text"
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Crew ID</label>
          <input
            type="text"
            value={crewId}
            onChange={(e) => setCrewId(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Route ID</label>
          <input
            type="text"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift Start Time</label>
          <input
            type="datetime-local"
            value={shiftStartTime}
            onChange={(e) => setShiftStartTime(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift End Time</label>
          <input
            type="datetime-local"
            value={shiftEndTime}
            onChange={(e) => setShiftEndTime(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Schedule Type</label>
          <select
            value={scheduleType}
            onChange={(e) => setScheduleType(e.target.value)}
            style={selectStyle}
          >
            <option value="Linked">Linked</option>
            <option value="Unlinked">Unlinked</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Handover Bus ID (Optional)</label>
          <input
            type="text"
            value={handoverBusId}
            onChange={(e) => setHandoverBusId(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit" style={buttonStyle}>
          Add Schedule
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddSchedule;
