import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  buttonStyle,  inputStyle,  selectStyle, labelStyle, formContainerStyle
} from '../ui/Style';

const EditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scheduleData, setScheduleData] = useState({
    busId: '',
    crewId: '',
    routeId: '',
    shiftStartTime: '',
    shiftEndTime: '',
    scheduleType: 'Linked',
    handoverBusId: '',
    status: 'scheduled',
  });

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/schedule/${id}`);
        setScheduleData(response.data);
      } catch (error) {
        console.error('Error fetching schedule data', error);
      }
    };

    fetchScheduleData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/schedule/${id}`, scheduleData);
      navigate('/schedules'); // Redirect to the schedules list
    } catch (error) {
      console.error('Error updating schedule', error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Edit Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Bus ID</label>
          <input
            type="text"
            name="busId"
            value={scheduleData.busId}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
  
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Crew ID</label>
          <input
            type="text"
            name="crewId"
            value={scheduleData.crewId}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
  
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Route ID</label>
          <input
            type="text"
            name="routeId"
            value={scheduleData.routeId}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
  
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift Start Time</label>
          <input
            type="datetime-local"
            name="shiftStartTime"
            value={scheduleData.shiftStartTime}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
  
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift End Time</label>
          <input
            type="datetime-local"
            name="shiftEndTime"
            value={scheduleData.shiftEndTime}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
  
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Schedule Type</label>
          <select
            name="scheduleType"
            value={scheduleData.scheduleType}
            onChange={handleInputChange}
            style={selectStyle}
            required
          >
            <option value="Linked">Linked</option>
            <option value="Unlinked">Unlinked</option>
          </select>
        </div>
  
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Handover Bus ID</label>
          <input
            type="text"
            name="handoverBusId"
            value={scheduleData.handoverBusId}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>
  
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Status</label>
          <select
            name="status"
            value={scheduleData.status}
            onChange={handleInputChange}
            style={selectStyle}
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
  
        <button type="submit" style={buttonStyle}>
          Update Schedule
        </button>
      </form>
    </div>
  );
  
};

export default EditSchedule;
