import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  buttonStyle,
  inputStyle,
  selectStyle,
  detailsContainerStyle,
  detailsStyle,
  navButtonContainerStyle,
  navButtonStyle,
  centeredContainerStyle,
  searchContainerStyle,
} from './ui/style'; // Ensure your styles are defined

const CrewList = () => {
  const [crews, setCrews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('name');
  const navigate = useNavigate(); // Initialize the navigate hook

  const fetchCrews = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/crew');
      setCrews(response.data);
    } catch (error) {
      console.error('Error fetching crews', error);
    }
  };

  const handleShowAll = () => {
    fetchCrews();
    setShowAll(true);
  };

  const handleNext = () => {
    if (currentIndex < crews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const filteredCrews = crews.filter((crew) => {
    const propertyValue = crew[filterProperty]?.toString().toLowerCase();
    return propertyValue?.startsWith(searchTerm.toLowerCase());
  });

  const handleEdit = () => {
    const crewId = filteredCrews[currentIndex]?._id;
    if (crewId) {
      navigate(`/edit-crew/${crewId}`);
    }
  };

  return (
    <div style={centeredContainerStyle}>
      <h2>Crew Management</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleShowAll} style={buttonStyle}>Show All Crews</button>
        <Link to="/add-crew">
          <button style={{ ...buttonStyle, marginLeft: '10px' }}>Add Crew</button>
        </Link>
      </div>

      {showAll && (
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <div style={searchContainerStyle}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={inputStyle}
            />
            <select
              value={filterProperty}
              onChange={(e) => setFilterProperty(e.target.value)}
              style={{ ...selectStyle, marginLeft: '10px' }}
            >
              <option value="name">Name</option>
              <option value="role">Role</option>
              <option value="licenseNumber">License Number</option>
            </select>
          </div>

          {filteredCrews.length > 0 ? (
            <div style={detailsContainerStyle}>
              <div style={detailsStyle}>
                <p><strong>Name:</strong> {filteredCrews[currentIndex]?.name}</p>
                <p><strong>Role:</strong> {filteredCrews[currentIndex]?.role}</p>
                <p><strong>License Number:</strong> {filteredCrews[currentIndex]?.licenseNumber ?? 'NA'}</p>
                <p><strong>Availability Status:</strong> {filteredCrews[currentIndex]?.availabilityStatus}</p>
              </div>

              <div style={navButtonContainerStyle}>
                <button onClick={handlePrevious} disabled={currentIndex === 0} style={navButtonStyle}>
                  Previous
                </button>
                <button onClick={handleEdit} style={navButtonStyle}>Edit</button>
                <button onClick={handleNext} disabled={currentIndex === filteredCrews.length - 1} style={navButtonStyle}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p>No crews available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CrewList;
