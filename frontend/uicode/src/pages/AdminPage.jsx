import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors, deleteDoctor } from "../api/api";
import "./AdminPage.css";

const AdminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      alert("Failed to fetch doctors.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this doctor?")) {
      try {
        await deleteDoctor(id);
        await fetchDoctors();
      } catch (error) {
        alert(error.message || "Failed to delete doctor");
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Doctor Management</h1>
        <button onClick={() => navigate("/admin/add")}>+ Add Doctor</button>
      </div>

      <div className="doctor-grid">
        <div className="doctor-info"><strong>Image</strong></div>
        <div className="doctor-info"><strong>Name</strong></div>
        <div className="doctor-info"><strong>Specialization</strong></div>
        <div className="doctor-actions"><strong>Edit</strong></div>
        <div className="doctor-actions"><strong>Delete</strong></div>

        {doctors.map((doc) => (
          <React.Fragment key={doc.id}>
            <img
              src={doc.profileImage || "https://via.placeholder.com/150"}
              alt={doc.name}
              className="doctor-image"
            />
            <div className="doctor-info">
              <h3>{doc.name}</h3>
            </div>
            <div className="doctor-info">
              <p>{doc.specialization}</p>
            </div>
            <div className="doctor-actions">
              <button onClick={() => navigate(`/admin/edit/${doc.id}`)}>Edit</button>
            </div>
            <div className="doctor-actions">
              <button onClick={() => handleDelete(doc.id)}>Delete</button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
