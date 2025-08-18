import React from 'react';
import './DoctorCard.css';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => (
  <div className="doctor-card">
    {/* Name at the top */}
    <h5>{doctor.name}</h5>
    
    {/* Image in the middle - now using img tag instead of background */}
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      margin: '10px 0'
    }}>
      <img 
        src={doctor.profileImage} 
        alt={doctor.name}
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '5%',
          objectFit: 'cover',
          border: '4px solid #ffffff',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
        }}
      />
    </div>
    
    {/* View Profile button at the bottom */}
    <Link to={`/doctors/${doctor.id}`} className="btn btn-outline-info btn-sm">
      View Profile
    </Link>
  </div>
);

export default DoctorCard;