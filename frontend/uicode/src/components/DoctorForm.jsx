import React, { useState } from 'react';
import './DoctorForm.css';

const DoctorForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    id: initialData.id || '',
    name: initialData.name || '',
    specialization: initialData.specialization || '',
    profileImage: initialData.profileImage || '',
    bio: initialData.bio || '',
    date: '',
    slots: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const availability = formData.date && formData.slots
      ? [
          {
            date: formData.date,
            slots: formData.slots.split(',').map((s) => s.trim()),
          },
        ]
      : [];

    const doctorPayload = {
      id: formData.id,
      name: formData.name,
      specialization: formData.specialization,
      profileImage: formData.profileImage,
      bio: formData.bio,
      availability,
    };

    onSubmit(doctorPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="doctor-form">
      <h3>{initialData.id ? 'Edit Doctor' : 'Add Doctor'}</h3>

      <div className="form-group">
        <label>ID</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter unique doctor ID"
          required
        />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter full name"
          required
        />
      </div>

      <div className="form-group">
        <label>Specialization</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="form-control"
          placeholder="e.g., Cardiologist, Dentist"
          required
        />
      </div>

      <div className="form-group">
        <label>Profile Image URL</label>
        <input
          type="text"
          name="profileImage"
          value={formData.profileImage}
          onChange={handleChange}
          className="form-control"
          placeholder="Paste image URL here"
          required
        />
      </div>

      <div className="form-group">
        <label>Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="form-control"
          rows={3}
          placeholder="Short bio about the doctor"
          required
        />
      </div>

      <div className="form-group">
        <label>Availability Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-control"
          placeholder="Select availability date"
        />
      </div>

      <div className="form-group">
        <label>Time Slots (comma separated)</label>
        <input
          type="text"
          name="slots"
          value={formData.slots}
          onChange={handleChange}
          className="form-control"
          placeholder="e.g., 10:00, 11:00, 14:00"
        />
      </div>

      <button type="submit" className="btn btn-success mt-3">
        {initialData.id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default DoctorForm;
