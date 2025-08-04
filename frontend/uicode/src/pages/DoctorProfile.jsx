import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";
import { getDoctorById } from "../api/api";
import "./DoctorProfile.css";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const data = await getDoctorById(id);
      setDoctor(data);
    };
    fetchDoctor();
  }, [id]);

  if (!doctor) return <p className="text-center">Loading...</p>;

  return (
    <div className="doctor-profile-container">
      <div className="doctor-profile-box">
        <h1 className="doctor-name">{doctor.name}</h1>
        <img
          src={doctor.profileImage}
          className="doctor-image"
          alt={doctor.name}
        />
        <p className="doctor-bio">{doctor.bio}</p>
        <div className="appointment-section">
          {/* Pass doctorId prop correctly */}
          <AppointmentForm doctorId={doctor.id} />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
