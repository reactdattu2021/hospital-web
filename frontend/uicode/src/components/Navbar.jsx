import React from 'react';
import { Link } from 'react-router-dom';
import { FaHospitalSymbol } from 'react-icons/fa';
import './Navbar.css'; // CSS for navbar only

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaHospitalSymbol className="navbar-logo" />
        <span className="navbar-title">OralVisHealthcare</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/appointments">Appointments</Link>
        
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;


