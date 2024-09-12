import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SchedulesList = () => {
  const [schedules, setSchedules] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('status');

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/schedule');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules', error);
    }
  };

  const handleShowAll = () => {
    fetchSchedules();
    setShowAll(true);
  };

  const handleNext = () => {
    if (currentIndex < schedules.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const filteredSchedules = schedules.filter((schedule) => {
    const propertyValue = schedule[filterProperty]?.toString().toLowerCase();
    return propertyValue?.startsWith(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h2>Schedule Management</h2>
      <button onClick={handleShowAll}>Show All Schedules</button>
      <Link to="/add-schedule">
        <button>Add Schedule</button>
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
              <option value="status">Status</option>
              <option value="scheduleType">Schedule Type</option>
              <option value="shiftStartTime">Shift Start Time</option>
            </select>
          </div>

          {filteredSchedules.length > 0 ? (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <p><strong>Bus ID:</strong> {filteredSchedules[currentIndex].busId}</p>
                <p><strong>Crew ID:</strong> {filteredSchedules[currentIndex].crewId}</p>
                <p><strong>Route ID:</strong> {filteredSchedules[currentIndex].routeId}</p>
                <p><strong>Shift Start Time:</strong> {new Date(filteredSchedules[currentIndex].shiftStartTime).toLocaleString()}</p>
                <p><strong>Shift End Time:</strong> {new Date(filteredSchedules[currentIndex].shiftEndTime).toLocaleString()}</p>
                <p><strong>Status:</strong> {filteredSchedules[currentIndex].status}</p>
              </div>

              {filteredSchedules.length > 1 && currentIndex > 0 && (
                <div style={{ textAlign: 'left' }}>
                  <button onClick={handlePrevious}>Previous</button>
                </div>
              )}
              {filteredSchedules.length > 1 && currentIndex < filteredSchedules.length - 1 && (
                <div style={{ textAlign: 'right' }}>
                  <button onClick={handleNext}>Next</button>
                </div>
              )}
            </div>
          ) : (
            <p>No schedules available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SchedulesList
