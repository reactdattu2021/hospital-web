import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import { getDoctorById, updateDoctor } from "../api/api";
import './EditDoctorPage.css';

const EditDoctorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getDoctorById(id);
        setInitialData(data);
      } catch (error) {
        alert(error.message || "Failed to load doctor data");
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id, navigate]);

  const handleUpdateDoctor = async (formData) => {
    try {
      await updateDoctor(id, formData);
      alert("Doctor updated successfully!");
      navigate("/admin");
    } catch (error) {
      alert(error.message || "Failed to update doctor");
    }
  };

  if (loading) return <p>Loading doctor data...</p>;

  if (!initialData) return null;

  return (
    <div className="edit-doctor-page">
      <h1>Edit Doctor</h1>
      <DoctorForm initialData={initialData} onSubmit={handleUpdateDoctor} />
    </div>
  );
};

export default EditDoctorPage;
