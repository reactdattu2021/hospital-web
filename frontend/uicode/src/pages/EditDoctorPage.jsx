import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DoctorForm from "../components/DoctorForm";
import { getDoctorById, updateDoctor } from "../api/api";
import axios from "axios";
import './EditDoctorPage.css';

const EditDoctorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  // Submit text updates (no image)
  const handleUpdateDoctor = async (doctorData) => {
  try {
    const updatedDoctor = await updateDoctor(id, doctorData); // Get updated data
    setInitialData(updatedDoctor); // Update local state so UI updates instantly
    alert("Doctor updated successfully!");
    navigate("/admin");
  } catch (error) {
    alert(error.message || "Failed to update doctor");
  }
};


  // Upload image separately
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Please select an image to upload");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profileImage", imageFile);

      // PUT request to /doctors/:id/image
      await axios.put(`http://localhost:3000/doctors/${id}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
      // Refresh doctor data to get new image URL
      const updatedDoctor = await getDoctorById(id);
      setInitialData(updatedDoctor);
      setImageFile(null);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p>Loading doctor data...</p>;
  if (!initialData) return null;

  return (
    <div className="edit-doctor-page">
      {/* <h1>Edit Doctor</h1> */}
      <DoctorForm initialData={initialData} onSubmit={handleUpdateDoctor} />

   <div className="image-upload-section">
  <h3>Update Profile Image</h3>
  <div className="image-upload-wrapper">
    <img
      src={initialData.profileImage || "https://via.placeholder.com/150"}
      alt={initialData.name}
      className="profile-image"
    />
    <label htmlFor="fileInput" className="file-input-label">
      Choose New Image
    </label>
    <input
      id="fileInput"
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      style={{ display: 'none' }}
    />
  </div>
  <button className="upload-image" onClick={handleImageUpload} disabled={uploading}>
    {uploading ? "Uploading..." : "Upload Image"}
  </button>
</div>


    </div>
  );
};

export default EditDoctorPage;

