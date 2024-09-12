import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BusStopList = () => {
  const [busStops, setBusStops] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('stopName');

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

  return (
    <div>
      <h2>Bus Stop Management</h2>
      <button onClick={handleShowAll}>Show All Bus Stops</button>
      <Link to="/add-stop">
        <button>Add Bus Stop</button>
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
              <option value="stopName">Stop Name</option>
              <option value="city">City</option>
            </select>
          </div>

          {filteredBusStops.length > 0 ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <p><strong>Stop Name:</strong> {filteredBusStops[currentIndex].stopName}</p>
                <p><strong>City:</strong> {filteredBusStops[currentIndex].city}</p>
                <p><strong>Latitude:</strong> {filteredBusStops[currentIndex].location.latitude}</p>
                <p><strong>Longitude:</strong> {filteredBusStops[currentIndex].location.longitude}</p>
              </div>

              {filteredBusStops.length > 1 && currentIndex > 0 && (
                <div style={{ textAlign: 'left' }}>
                  <button onClick={handlePrevious}>Previous</button>
                </div>
              )}
              {filteredBusStops.length > 1 && currentIndex < filteredBusStops.length - 1 && (
                <div style={{ textAlign: 'right' }}>
                  <button onClick={handleNext}>Next</button>
                </div>
              )}
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
