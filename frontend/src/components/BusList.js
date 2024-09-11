import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BusList() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/buses')
      .then(response => {
        setBuses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the buses!", error);
      });
  }, []);

  return (
    <div>
      <h2>All Buses</h2>
      <ul>
        {buses.map(bus => (
          <li key={bus._id}>
            Bus Number: {bus.busNumber}, Capacity: {bus.capacity}, Status: {bus.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusList;
