import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RoutesList = () => {
  const [routes, setRoutes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('routeNumber');

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
    if (currentIndex < routes.length - 1) {
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

  return (
    <div>
      <h2>Route Management</h2>
      <button onClick={handleShowAll}>Show All Routes</button>
      <Link to="/add-route">
        <button>Add Route</button>
      </Link>

      {showAll && (
        <div>
          <div style={{ margin: '20px 0' }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />

            <select value={filterProperty} onChange={(e) => setFilterProperty(e.target.value)} style={{ padding: '5px' }}>
              <option value="routeNumber">Route Number</option>
              <option value="totalDistance">Total Distance</option>
              <option value="congestionStatus">Congestion Status</option>
            </select>
          </div>

          {filteredRoutes.length > 0 ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <p><strong>Route Number:</strong> {filteredRoutes[currentIndex].routeNumber}</p>
                <p><strong>Total Distance:</strong> {filteredRoutes[currentIndex].totalDistance}</p>
                <p><strong>Total Time:</strong> {filteredRoutes[currentIndex].totalTime}</p>
                <p><strong>Congestion Status:</strong> {filteredRoutes[currentIndex].congestionStatus}</p>
              </div>

              {filteredRoutes.length > 1 && currentIndex > 0 && (
                <div style={{ textAlign: 'left' }}>
                  <button onClick={handlePrevious}>Previous</button>
                </div>
              )}
              {filteredRoutes.length > 1 && currentIndex < filteredRoutes.length - 1 && (
                <div style={{ textAlign: 'right' }}>
                  <button onClick={handleNext}>Next</button>
                </div>
              )}
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
