import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Use `useNavigate` hook
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
} from './ui/style';

const BusStopList = () => {
  const [busStops, setBusStops] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('stopName');
  const navigate = useNavigate(); // Initialize the navigate hook

  const fetchBusStops = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/busstop');
      setBusStops(response.data);
    } catch (error) {
      console.error('Error fetching bus stops', error);
    }
  };

  const handleShowAll = () => {
    fetchBusStops();
    setShowAll(true);
  };

  const handleNext = () => {
    if (currentIndex < busStops.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const filteredBusStops = busStops.filter((stop) => {
    const propertyValue = stop[filterProperty]?.toString().toLowerCase();
    return propertyValue?.startsWith(searchTerm.toLowerCase());
  });

  const handleEdit = () => {
    const busStopId = filteredBusStops[currentIndex]._id;
    navigate(`/edit-busstop/${busStopId}`); // Use navigate for redirection
  };

  return (
    <div style={centeredContainerStyle}>
      <h2>Bus Stop Management</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleShowAll} style={buttonStyle}>Show All Bus Stops</button>
        <Link to="/add-stop">
          <button style={{ ...buttonStyle, marginLeft: '10px' }}>Add Bus Stop</button>
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
              <option value="stopName">Stop Name</option>
              <option value="city">City</option>
            </select>
          </div>

          {filteredBusStops.length > 0 ? (
            <div style={detailsContainerStyle}>
              <div style={detailsStyle}>
                <p><strong>Stop Name:</strong> {filteredBusStops[currentIndex].stopName}</p>
                <p><strong>City:</strong> {filteredBusStops[currentIndex].city}</p>
                <p><strong>Latitude:</strong> {filteredBusStops[currentIndex].location.latitude}</p>
                <p><strong>Longitude:</strong> {filteredBusStops[currentIndex].location.longitude}</p>
              </div>

              <div style={navButtonContainerStyle}>
                <button onClick={handlePrevious} disabled={currentIndex === 0} style={navButtonStyle}>
                  Previous
                </button>
                <button onClick={handleEdit} style={navButtonStyle}>Edit</button>
                <button onClick={handleNext} disabled={currentIndex === filteredBusStops.length - 1} style={navButtonStyle}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p>No bus stops available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BusStopList;
