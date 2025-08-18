import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import DoctorProfile from './pages/DoctorProfile';
import AddDoctorPage from './pages/AddDoctorPage'; // ✅ new
import EditDoctorPage from './pages/EditDoctorPage'; // ✅ new
import { DoctorProvider } from './context/DoctorContext';
import AllAppointmentsPage from './pages/AllAppointmentsPage';

function App() {
  return (
    <Router>
      <DoctorProvider>
        <Navbar />
        <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add" element={<AddDoctorPage />} /> {/* ✅ Add */}
            <Route path="/admin/edit/:id" element={<EditDoctorPage />} /> {/* ✅ Edit */}
            <Route path="/appointments" element={<AllAppointmentsPage />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
          </Routes>
        </div>
        <Footer />
      </DoctorProvider>
    </Router>
  );
}

export default App;



