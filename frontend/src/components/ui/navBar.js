import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
        <li style={{ marginRight: 20 }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ marginRight: 20 }}>
          <Link to="/buses">Bus</Link>
        </li>
        <li style={{ marginRight: 20 }}>
          <Link to="/routes">Routes</Link>
        </li>
        <li style={{ marginRight: 20 }}>
          <Link to="/Crews">Crews</Link>
        </li>
        <li style={{ marginRight: 20 }}>
          <Link to="/schedules">Schedules</Link>
        </li>
        <li>
          <Link to="/bus-stops">Bus Stops</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
