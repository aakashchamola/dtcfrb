import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { 
  buttonStyle, 
  inputStyle, 
  selectStyle, 
  detailsContainerStyle, 
  // detailsContainerStyle, 
  navButtonContainerStyle, 
  navButtonStyle, 
  centeredContainerStyle, 
  searchContainerStyle 
} from './ui/Style';

const RoutesList = () => {
  const [routes, setRoutes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('routeNumber');
  const navigate = useNavigate(); // Initialize the navigate hook

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/route');
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes', error);
    }
  };

  const handleShowAll = () => {
    fetchRoutes();
    setShowAll(true);
  };

  const handleNext = () => {
    if (currentIndex < filteredRoutes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const filteredRoutes = routes.filter((route) => {
    const propertyValue = route[filterProperty]?.toString().toLowerCase();
    return propertyValue?.startsWith(searchTerm.toLowerCase());
  });

  const handleEdit = () => {
    const routeId = filteredRoutes[currentIndex]?._id;
    if (routeId) {
      navigate(`/edit-route/${routeId}`);
    }
  };

  return (
    <div style={centeredContainerStyle}>
      <h2>Route Management</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleShowAll} style={buttonStyle}>Show All Routes</button>
        <Link to="/add-route">
          <button style={{ ...buttonStyle, marginLeft: '10px' }}>Add Route</button>
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
              <option value="routeNumber">Route Number</option>
              
              <option value="totalDistance">Total Distance</option>
              <option value="congestionStatus">Congestion Status</option>
            </select>
          </div>

          {filteredRoutes.length > 0 ? (
            <div style={detailsContainerStyle}>
              <div style={detailsContainerStyle}>
                <p><strong>Route Number:</strong> {filteredRoutes[currentIndex].routeNumber}</p>
                                {/* Display Stops */}
                                <h3>Stops</h3>
                {filteredRoutes[currentIndex].stops.length > 0 ? (
                  <div>
                    {filteredRoutes[currentIndex].stops.map((stop, index) => (
                      <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc' }}>
                        <p><strong>Stop Name:</strong> {stop.busStopName}</p>
                        <p><strong>Order:</strong> {stop.order}</p>
                        <p><strong>Arrival Time:</strong> {new Date(stop.arrivalTime).toLocaleString()}</p>
                        <p><strong>Departure Time:</strong> {new Date(stop.departureTime).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No stops available</p>
                )}
                <p><strong>Total Distance:</strong> {filteredRoutes[currentIndex].totalDistance}</p>
                <p><strong>Total Time:</strong> {filteredRoutes[currentIndex].totalTime}</p>
                <p><strong>Congestion Status:</strong> {filteredRoutes[currentIndex].congestionStatus}</p>
                <p><strong>Active Buses:</strong> {filteredRoutes[currentIndex].activeBuses.length > 0 ? filteredRoutes[currentIndex].activeBuses.join(', ') : 'None'}</p>

              </div>

              <div style={navButtonContainerStyle}>
                <button onClick={handlePrevious} disabled={currentIndex === 0} style={navButtonStyle}>
                  Previous
                </button>
                <button onClick={handleEdit} style={navButtonStyle}>Edit</button>
                <button onClick={handleNext} disabled={currentIndex === filteredRoutes.length - 1} style={navButtonStyle}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p>No routes available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RoutesList;
