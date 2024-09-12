import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  buttonStyle,
  inputStyle,
  formContainerStyle,
  labelStyle,
  selectStyle
} from '../ui/Style'; // Ensure this path is correct

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    busNumber: '',
    busType: 'NA',
    capacity: '',
    status: 'NA',
    assignedRouteId: '',
    currentCrewId: '',
    lastMaintenanceDate: ''
  });

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/bus/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching bus data', error);
      }
    };

    fetchBusData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/bus/${id}`, formData);
      navigate('/buses');
    } catch (error) {
      console.error('Error updating bus data', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/bus/${id}`);
      navigate('/buses');
    } catch (error) {
      console.error('Error deleting bus data', error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Edit Bus</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Bus Number</label>
          <input
            type="text"
            name="busNumber"
            value={formData.busNumber}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Bus Type</label>
          <select
            name="busType"
            value={formData.busType}
            onChange={handleInputChange}
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
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            style={selectStyle}
          >
            <option value="NA">Select</option>
            <option value="available">Available</option>
            <option value="in-service">In Service</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Assigned Route ID</label>
          <input
            type="text"
            name="assignedRouteId"
            value={formData.assignedRouteId}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Current Crew ID</label>
          <input
            type="text"
            name="currentCrewId"
            value={formData.currentCrewId}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Last Maintenance Date</label>
          <input
            type="date"
            name="lastMaintenanceDate"
            value={formData.lastMaintenanceDate}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button type="submit" style={buttonStyle}>
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={{ ...buttonStyle, backgroundColor: 'red' }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBus;
