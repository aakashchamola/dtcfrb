import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  buttonStyle,
  inputStyle,
  formContainerStyle,
  labelStyle,
} from '../ui/Style'; // Ensure this path is correct

const EditBusStop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [busStop, setBusStop] = useState(null);
  const [formData, setFormData] = useState({
    stopName: '',
    location: {
      latitude: '',
      longitude: ''
    },
    city: '',
    routes: [] // Assuming it's an array of route IDs
  });

  useEffect(() => {
    const fetchBusStop = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/busstop/${id}`);
        setBusStop(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching bus stop details', error);
      }
    };
    fetchBusStop();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('location')) {
      const key = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [key]: value
        }
      }));
    } else if (name === 'routes') {
      setFormData({ ...formData, routes: value.split(',').map(route => route.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/api/busstop/${id}`, formData);
      navigate('/busstops');
    } catch (error) {
      console.error('Error updating bus stop', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/busstop/${id}`);
      navigate('/busstops');
    } catch (error) {
      console.error('Error deleting bus stop', error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Edit Bus Stop</h2>
      {busStop ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Stop Name</label>
            <input
              type="text"
              name="stopName"
              value={formData.stopName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Latitude</label>
            <input
              type="text"
              name="location.latitude"
              value={formData.location.latitude}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Longitude</label>
            <input
              type="text"
              name="location.longitude"
              value={formData.location.longitude}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Routes (comma separated)</label>
            <input
              type="text"
              name="routes"
              value={formData.routes.join(', ')}
              onChange={handleChange}
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditBusStop;
