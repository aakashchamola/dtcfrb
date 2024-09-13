import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the updated CSS

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/buses" className="nav-link">Buses</Link>
          </li>
          <li className="nav-item">
            <Link to="/routes" className="nav-link">Routes</Link>
          </li>
          <li className="nav-item">
            <Link to="/crews" className="nav-link">Crews</Link>
          </li>
          <li className="nav-item">
            <Link to="/schedules" className="nav-link">Schedules</Link>
          </li>
          <li className="nav-item">
            <Link to="/bus-stops" className="nav-link">Bus Stops</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
