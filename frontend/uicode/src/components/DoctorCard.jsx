import React from 'react';
import './DoctorCard.css';
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => (
  <div
  className="doctor-card"
  style={{
    backgroundImage: `url(${doctor.profileImage})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "510px",
   
  }}
>
    <h5>{doctor.name}</h5>
    <p className="specialty">{doctor.specialty}</p>
    <Link to={`/doctors/${doctor.id}`} className="btn btn-outline-info btn-sm">View Profile</Link>
  </div>
);

export default DoctorCard;