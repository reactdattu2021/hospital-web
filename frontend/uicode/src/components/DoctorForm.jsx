import React, { useState } from 'react';
import './DoctorForm.css';

const DoctorForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    specialization: initialData.specialization || '',
    bio: initialData.bio || '',
    date: '',
    slots: '',
  });

  const [imageFile, setImageFile] = useState(null);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
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

    if (initialData && initialData.name) {
      // Editing existing doctor - send JSON (no image here)
      onSubmit({
        name: formData.name,
        specialization: formData.specialization,
        bio: formData.bio,
        availability,
      });
    } else {
      // Adding new doctor - send FormData with image
      if (!imageFile) {
        alert("Please upload a profile image");
        return;
      }
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('specialization', formData.specialization);
      payload.append('bio', formData.bio);
      payload.append('availability', JSON.stringify(availability));
      payload.append('profileImage', imageFile);

      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="doctor-form">
      <h3>{initialData.name ? 'Edit Doctor' : 'Add Doctor'}</h3>

      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Specialization</label>
        <input
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
      </div>

      {/* Show file input only when adding */}
      {!initialData.name && (
        <div className="form-group">
          <label>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required={!initialData.name}
          />
        </div>
      )}

      <div className="form-group">
        <label>Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
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
        />
      </div>

      <div className="form-group">
        <label>Time Slots (comma separated)</label>
        <input
          name="slots"
          value={formData.slots}
          onChange={handleChange}
          placeholder="e.g., 10:00, 11:00, 14:00"
        />
      </div>

      <button type="submit">{initialData.name ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default DoctorForm;

