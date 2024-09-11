import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CrewList() {
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/crew')
      .then(response => {
        setCrew(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the crew members!", error);
      });
  }, []);

  return (
    <div>
      <h2>Crew Members</h2>
      <ul>
        {crew.map(member => (
          <li key={member._id}>
            Name: {member.name}, Role: {member.role}, Status: {member.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrewList;
