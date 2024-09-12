import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    try {
      const newSchedule = {
        busId,
        crewId,
        routeId,
        shiftStartTime: new Date(shiftStartTime),
        shiftEndTime: new Date(shiftEndTime),
        scheduleType,
        handoverBusId: handoverBusId || null, // optional handoverBusId
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
    <div>
      <h2>Add Schedule</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Bus ID:
          <input type="text" value={busId} onChange={(e) => setBusId(e.target.value)} required />
        </label>
        <br />
        <label>
          Crew ID:
          <input type="text" value={crewId} onChange={(e) => setCrewId(e.target.value)} required />
        </label>
        <br />
        <label>
          Route ID:
          <input type="text" value={routeId} onChange={(e) => setRouteId(e.target.value)} required />
        </label>
        <br />
        <label>
          Shift Start Time:
          <input type="datetime-local" value={shiftStartTime} onChange={(e) => setShiftStartTime(e.target.value)} required />
        </label>
        <br />
        <label>
          Shift End Time:
          <input type="datetime-local" value={shiftEndTime} onChange={(e) => setShiftEndTime(e.target.value)} required />
        </label>
        <br />
        <label>
          Schedule Type:
          <select value={scheduleType} onChange={(e) => setScheduleType(e.target.value)}>
            <option value="Linked">Linked</option>
            <option value="Unlinked">Unlinked</option>
          </select>
        </label>
        <br />
        <label>
          Handover Bus ID (Optional):
          <input type="text" value={handoverBusId} onChange={(e) => setHandoverBusId(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Schedule</button>
      </form>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default AddSchedule;
