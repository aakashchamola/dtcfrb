import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  buttonStyle,
  inputStyle,
  formContainerStyle,
  labelStyle,
  selectStyle,
} from '../ui/Style';

const EditCrew = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crewData, setCrewData] = useState({
    name: '',
    role: 'Driver',
    licenseNumber: '',
    availabilityStatus: 'available',
    assignedBusId: '',
    restPeriod: { startTime: '', endTime: '' },
    shiftDetails: { startTime: '', endTime: '' },
  });

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/crew/${id}`);
        setCrewData(response.data);
      } catch (error) {
        console.error('Error fetching crew data', error);
      }
    };

    fetchCrewData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCrewData({
      ...crewData,
      [name]: value,
    });
  };

  const handleNestedChange = (e, field, subField) => {
    const { value } = e.target;
    setCrewData({
      ...crewData,
      [field]: {
        ...crewData[field],
        [subField]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/crew/${id}`, crewData);
      navigate('/crews'); // Navigate back to crew list after update
    } catch (error) {
      console.error('Error updating crew data', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this crew member?')) {
      try {
        await axios.delete(`http://localhost:5001/api/crew/${id}`);
        navigate('/crews'); // Navigate back to crew list after deletion
      } catch (error) {
        console.error('Error deleting crew member', error);
      }
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Edit Crew</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="name"
            value={crewData.name}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Role</label>
          <select
            name="role"
            value={crewData.role}
            onChange={handleInputChange}
            style={selectStyle}
            required
          >
            <option value="Driver">Driver</option>
            <option value="Conductor">Conductor</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={crewData.licenseNumber}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Availability Status</label>
          <select
            name="availabilityStatus"
            value={crewData.availabilityStatus}
            onChange={handleInputChange}
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
            name="assignedBusId"
            value={crewData.assignedBusId}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <h3>Rest Period</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Rest Start Time</label>
          <input
            type="datetime-local"
            name="restStartTime"
            value={crewData.restPeriod.startTime}
            onChange={(e) => handleNestedChange(e, 'restPeriod', 'startTime')}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Rest End Time</label>
          <input
            type="datetime-local"
            name="restEndTime"
            value={crewData.restPeriod.endTime}
            onChange={(e) => handleNestedChange(e, 'restPeriod', 'endTime')}
            style={inputStyle}
          />
        </div>

        <h3>Shift Details</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift Start Time</label>
          <input
            type="datetime-local"
            name="shiftStartTime"
            value={crewData.shiftDetails.startTime}
            onChange={(e) => handleNestedChange(e, 'shiftDetails', 'startTime')}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift End Time</label>
          <input
            type="datetime-local"
            name="shiftEndTime"
            value={crewData.shiftDetails.endTime}
            onChange={(e) => handleNestedChange(e, 'shiftDetails', 'endTime')}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Update Crew
        </button>
        <button type="button" onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: 'red', marginLeft: '10px' }}>
          Delete Crew
        </button>
      </form>
    </div>
  );
};

export default EditCrew;
