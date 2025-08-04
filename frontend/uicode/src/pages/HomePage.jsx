import React, { useContext, useState } from "react";
import { DoctorContext } from "../context/DoctorContext";
import DoctorCard from "../components/DoctorCard";
import SearchBar from "../components/SearchBar";
import "./HomePage.css";

const HomePage = () => {
  const { doctors, fetchDoctors } = useContext(DoctorContext);
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    fetchDoctors(value); // ✅ Use query param
  };

  return (
    <div className="homepage-container" style={{ paddingTop: "80px" }}>
      <SearchBar value={search} onSearch={handleSearch} />
      <div className="doctor-grid">
        {doctors.map((doc) => (
          <div key={doc.id}>
            <DoctorCard doctor={doc} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
