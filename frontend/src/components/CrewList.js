import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CrewList = () => {
  const [crews, setCrews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('name');

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

  return (
    <div>
      <h2>Crew Management</h2>
      <button onClick={handleShowAll}>Show All Crews</button>
      <Link to="/add-crew">
        <button>Add Crew</button>
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
              <option value="name">Name</option>
              <option value="role">Role</option>
              <option value="licenseNumber">License Number</option>
            </select>
          </div>

          {filteredCrews.length > 0 ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <p><strong>Name:</strong> {filteredCrews[currentIndex].name}</p>
                <p><strong>Role:</strong> {filteredCrews[currentIndex].role}</p>
                <p><strong>License Number:</strong> {filteredCrews[currentIndex].licenseNumber ?? 'NA'}</p>
                <p><strong>Availability Status:</strong> {filteredCrews[currentIndex].availabilityStatus}</p>
              </div>

              {filteredCrews.length > 1 && currentIndex > 0 && (
                <div style={{ textAlign: 'left' }}>
                  <button onClick={handlePrevious}>Previous</button>
                </div>
              )}
              {filteredCrews.length > 1 && currentIndex < filteredCrews.length - 1 && (
                <div style={{ textAlign: 'right' }}>
                  <button onClick={handleNext}>Next</button>
                </div>
              )}
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
