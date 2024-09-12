import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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



const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('busNumber');
  const [filteredBuses, setFilteredBuses] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const filtered = buses.filter((bus) => {
      const propertyValue = bus[filterProperty]?.toString().toLowerCase();
      return propertyValue?.includes(searchTerm.toLowerCase());
    });
    setFilteredBuses(filtered);
    setCurrentIndex(0);
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

  const handleEdit = () => {
    const busId = filteredBuses[currentIndex]._id;
    navigate(`/edit-bus/${busId}`);
  };

  return (
    <div style={centeredContainerStyle}>
      <h2>Bus Management</h2>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleShowAll} style={buttonStyle}>Show All Buses</button>
        <Link to="/add-bus">
          <button style={{ ...buttonStyle, marginLeft: '10px' }}>Add Bus</button>
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
              <option value="busNumber">Bus Number</option>
              <option value="busType">Bus Type</option>
              <option value="capacity">Capacity</option>
              <option value="status">Status</option>
            </select>
          </div>

          {filteredBuses.length > 0 ? (
            <div style={detailsContainerStyle}>
              <div style={detailsStyle}>
                <p><strong>Bus Number:</strong> {filteredBuses[currentIndex].busNumber}</p>
                <p><strong>Bus Type:</strong> {filteredBuses[currentIndex].busType}</p>
                <p><strong>Capacity:</strong> {filteredBuses[currentIndex].capacity}</p>
                <p><strong>Status:</strong> {filteredBuses[currentIndex].status}</p>
                <p><strong>AssignedRouteId:</strong> {filteredBuses[currentIndex].assignedRouteId ?? 'NA'}</p>
                <p><strong>AssignedCrewId:</strong> {filteredBuses[currentIndex].currentCrewId ?? 'NA'}</p>
                <p><strong>Last Maintenance Date:</strong> {filteredBuses[currentIndex].lastMaintenanceDate ?? 'NA'}</p>
              </div>

              <div style={navButtonContainerStyle}>
                <button onClick={handlePrevious} disabled={currentIndex === 0} style={navButtonStyle}>
                  Previous
                </button>
                <button onClick={handleEdit} style={navButtonStyle}>Edit</button>
                {/* <button onClick={handleDelete} style={navButtonStyle}>Delete</button> */}
                <button onClick={handleNext} disabled={currentIndex === filteredBuses.length - 1} style={navButtonStyle}>
                  Next
                </button>
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
