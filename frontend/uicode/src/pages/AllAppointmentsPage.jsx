// src/pages/AllAppointmentsPage.jsx
import React, { useEffect, useState } from "react";
import { getAppointments } from "../api/api";
import "./AllAppointmentsPage.css";

const AllAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        alert(error.message || "Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p className="loading">Loading appointments...</p>;

  return (
    <div className="appointments-container">
      <h2>All Appointments</h2>
      {appointments.length === 0 ? (
        <p className="no-appointments">No appointments found.</p>
      ) : (
        <div className="grid-table">
          <div className="grid-header">
            <div>Patient</div>
            <div>Email</div>
            <div>Doctor</div>
            <div>Date</div>
            <div>Slot</div>
          </div>
          {appointments.map((a, i) => (
            <div className="grid-row" key={i}>
              <div>{a.patientName}</div>
              <div>{a.email}</div>
              <div>{a.doctor?.name || "N/A"}</div>
              <div>{a.date}</div>
              <div>{a.time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAppointmentsPage;

