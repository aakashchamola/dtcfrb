import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('busNumber');
  const [filteredBuses, setFilteredBuses] = useState([]);

  // Fetch buses when component mounts
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/bus');
        setBuses(response.data);
      } catch (error) {
        console.error('Error fetching buses', error);
      }
    };
    fetchBuses();
  }, []);

  // Update filtered buses based on search and filter criteria
  useEffect(() => {
    const filtered = buses.filter((bus) => {
      const propertyValue = bus[filterProperty]?.toString().toLowerCase(); // Get the selected property value
      return propertyValue?.includes(searchTerm.toLowerCase()); // Check if the property contains the search term
    });
    setFilteredBuses(filtered);
    setCurrentIndex(0); // Reset index when filtering changes
  }, [buses, searchTerm, filterProperty]);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleNext = () => {
    if (currentIndex < filteredBuses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <h2>Bus Management</h2>
      <button onClick={handleShowAll}>Show All Buses</button>
      <Link to="/add-bus">
        <button>Add Bus</button>
      </Link>

      {showAll && (
        <div>
          <div style={{ margin: '20px 0' }}>
            {/* Search field */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />

            {/* Filter dropdown */}
            <select value={filterProperty} onChange={(e) => setFilterProperty(e.target.value)} style={{ padding: '5px' }}>
              <option value="busNumber">Bus Number</option>
              <option value="busType">Bus Type</option>
              <option value="capacity">Capacity</option>
              <option value="status">Status</option>
            </select>
          </div>

          {filteredBuses.length > 0 ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <p><strong>Bus Number:</strong> {filteredBuses[currentIndex].busNumber}</p>
                <p><strong>Bus Type:</strong> {filteredBuses[currentIndex].busType}</p>
                <p><strong>Capacity:</strong> {filteredBuses[currentIndex].capacity}</p>
                <p><strong>Status:</strong> {filteredBuses[currentIndex].status}</p>
                <p><strong>AssignedRouteId:</strong> {filteredBuses[currentIndex].assignedRouteId ?? 'NA'}</p>
                <p><strong>AssignedCrewId:</strong> {filteredBuses[currentIndex].currentCrewId ?? 'NA'}</p>
                <p><strong>Last Maintenance Date:</strong> {filteredBuses[currentIndex].lastMaintenanceDate ?? 'NA'}</p>
              </div>

              {/* Previous and Next buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {filteredBuses.length > 1 && currentIndex > 0 && (
                  <button onClick={handlePrevious}>Previous</button>
                )}
                {filteredBuses.length > 1 && currentIndex < filteredBuses.length - 1 && (
                  <button onClick={handleNext}>Next</button>
                )}
              </div>
            </div>
          ) : (
            <p>No buses available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BusList;
