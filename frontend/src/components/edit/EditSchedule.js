import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  buttonStyle, inputStyle, selectStyle, labelStyle, formContainerStyle, detailsContainerStyle
} from '../ui/Style';

const EditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [buses, setBuses] = useState([]);
  const [crews, setCrews] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);

  const [scheduleData, setScheduleData] = useState({
    busId: '',
    crewId: '',
    routeId: '',
    shiftStartTime: '',
    shiftEndTime: '',
    scheduleType: 'Linked',
    handoverBusId: '',
    status: 'scheduled',
  });

  // Fetch buses, crews, and routes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [busResponse, crewResponse, routeResponse, scheduleResponse] = await Promise.all([
          axios.get('http://localhost:5001/api/bus'),
          axios.get('http://localhost:5001/api/crew'),
          axios.get('http://localhost:5001/api/route'),
          axios.get(`http://localhost:5001/api/schedule/${id}`)
        ]);

        setBuses(busResponse.data);
        setCrews(crewResponse.data);
        setRoutes(routeResponse.data);
        setScheduleData(scheduleResponse.data);
      } catch (error) {
        toast.error('Error fetching data');
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const selectedRoute = routes.find(route => route._id === scheduleData.routeId);
    if (selectedRoute) {
      setStops(selectedRoute.stops);
    } else {
      setStops([]);
    }
  }, [scheduleData.routeId, routes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!scheduleData.busId) {
      toast.error('Bus ID is required');
      return false;
    }
    if (!scheduleData.crewId) {
      toast.error('Crew ID is required');
      return false;
    }
    if (!scheduleData.routeId) {
      toast.error('Route ID is required');
      return false;
    }
    if (!scheduleData.shiftStartTime) {
      toast.error('Shift Start Time is required');
      return false;
    }
    if (!scheduleData.shiftEndTime) {
      toast.error('Shift End Time is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:5001/api/schedule/${id}`, {
        ...scheduleData,
        shiftStartTime: new Date(scheduleData.shiftStartTime),
        shiftEndTime: new Date(scheduleData.shiftEndTime),
        handoverBusId: scheduleData.handoverBusId || null,
      });
      toast.success('Schedule updated successfully');
      navigate('/schedules');
    } catch (error) {
      toast.error('Error updating schedule');
      console.error('Error updating schedule', error);
    }
  };

  // Get selected bus and crew details
  const selectedBus = buses.find(bus => bus._id === scheduleData.busId);
  const selectedCrew = crews.find(crew => crew._id === scheduleData.crewId);

  return (
    <div style={formContainerStyle}>
      <h2>Edit Schedule</h2>
      <form onSubmit={handleSubmit}>
        {/* Bus Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Bus</label>
          <select
            name="busId"
            value={scheduleData.busId}
            onChange={handleInputChange}
            style={selectStyle}
            required
          >
            <option value="" disabled>Select a bus</option>
            {buses.map(bus => (
              <option key={bus._id} value={bus._id}>{bus.busNumber}</option>
            ))}
          </select>

          {selectedBus && (
            <div style={{ marginLeft: '20px', marginTop: '10px', ...detailsContainerStyle }}>
              <p>Bus Type: {selectedBus.busType}</p>
              <p>Capacity: {selectedBus.capacity}</p>
              <p>Status: {selectedBus.status}</p>
            </div>
          )}
        </div>

        {/* Crew Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Crew</label>
          <select
            name="crewId"
            value={scheduleData.crewId}
            onChange={handleInputChange}
            style={selectStyle}
            required
          >
            <option value="" disabled>Select a crew</option>
            {crews.map(crew => (
              <option key={crew._id} value={crew._id}>{crew.name}</option>
            ))}
          </select>

          {selectedCrew && (
            <div style={{ marginLeft: '20px', marginTop: '10px', ...detailsContainerStyle }}>
              <p>Role: {selectedCrew.role}</p>
              <p>Availability Status: {selectedCrew.availabilityStatus}</p>
              {selectedCrew.shiftDetails && (
                <p>Shift: {new Date(selectedCrew.shiftDetails.startTime).toLocaleTimeString()} - {new Date(selectedCrew.shiftDetails.endTime).toLocaleTimeString()}</p>
              )}
            </div>
          )}
        </div>

        {/* Route Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Route</label>
          <select
            name="routeId"
            value={scheduleData.routeId}
            onChange={handleInputChange}
            style={selectStyle}
            required
          >
            <option value="" disabled>Select a route</option>
            {routes.map(route => (
              <option key={route._id} value={route._id}>{route.routeNumber}</option>
            ))}
          </select>
        </div>

        {/* Stops List */}
        {stops.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>Stops</label>
            <ul style={{ marginLeft: '20px' }}>
              {stops.map((stop, index) => (
                <li key={index}>{stop.busStopName}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Shift Start Time */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift Start Time</label>
          <input
            type="datetime-local"
            name="shiftStartTime"
            value={scheduleData.shiftStartTime}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        {/* Shift End Time */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Shift End Time</label>
          <input
            type="datetime-local"
            name="shiftEndTime"
            value={scheduleData.shiftEndTime}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>

        {/* Schedule Type */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Schedule Type</label>
          <select
            name="scheduleType"
            value={scheduleData.scheduleType}
            onChange={handleInputChange}
            style={selectStyle}
            required
          >
            <option value="Linked">Linked</option>
            <option value="Unlinked">Unlinked</option>
          </select>
        </div>

        {/* Handover Bus ID */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Handover Bus ID</label>
          <input
            type="text"
            name="handoverBusId"
            value={scheduleData.handoverBusId}
            onChange={handleInputChange}
            placeholder="Optional"
            style={inputStyle}
          />
        </div>

        {/* Status */}
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Status</label>
          <select
            name="status"
            value={scheduleData.status}
            onChange={handleInputChange}
            style={selectStyle}
            required
          >
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" style={buttonStyle}>Update Schedule</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditSchedule;
