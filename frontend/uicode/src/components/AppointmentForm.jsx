import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: formData.name,
          email: formData.email,
          doctor: doctorId,
          date: formData.date,
          time: formData.time,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Appointment booked successfully!');
        setFormData({ name: '', email: '', date: '', time: '' });
      } else {
        alert(data.message || 'Failed to book appointment');
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('Something went wrong while booking.');
    }
  };
 

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Book Appointment</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          name="date"
          className="form-control"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Time</label>
        <input
          type="time"
          name="time"
          className="form-control"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">Book</button>
    </form>
  );
};

export default AppointmentForm;
