import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScheduleList() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/schedules')
      .then(response => {
        setSchedules(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the schedules!", error);
      });
  }, []);

  return (
    <div>
      <h2>All Schedules</h2>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule._id}>
            Bus: {schedule.bus.busNumber}, Crew: {schedule.crew.name}, Start: {new Date(schedule.startTime).toLocaleString()}, End: {new Date(schedule.endTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduleList;
