import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RouteList() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/routes')
      .then(response => {
        setRoutes(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the routes!", error);
      });
  }, []);

  return (
    <div>
      <h2>All Routes</h2>
      <ul>
        {routes.map(route => (
          <li key={route._id}>
            Route Name: {route.name}, Stops: {route.stops.length}, Active: {route.isActive ? "Yes" : "No"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RouteList;
