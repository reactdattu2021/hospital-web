import React from "react";
import { useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import { createDoctor } from "../api/api";
import './AddDoctorPage.css';

const AddDoctorPage = () => {
  const navigate = useNavigate();

  const handleAddDoctor = async (formData) => {
    try {
      await createDoctor(formData);
      alert("Doctor added successfully!");
      navigate("/admin");
    } catch (error) {
      alert(error.message || "Failed to add doctor");
    }
  };

  return (
    <div className="add-doctor-page">
    <DoctorForm onSubmit={handleAddDoctor} />
  </div>
  );
};

export default AddDoctorPage;
