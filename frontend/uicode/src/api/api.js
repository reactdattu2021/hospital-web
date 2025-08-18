import axios from 'axios';

const API_URL = 'http://localhost:3000';

// ============================
// 🚑 Doctor Endpoints
// ============================

export const getDoctors = async (query = '') => {
  try {
    const response = await axios.get(`${API_URL}/doctors`, {
      params: { query }, // sends ?query=value
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching doctors" };
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching doctor details" };
  }
};

export const createDoctor = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/doctors`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error creating doctor" };
  }
};


export const updateDoctor = async (id, formData) => {
  try {
    const response = await axios.put(`${API_URL}/doctors/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json', // <<-- change here
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error updating doctor" };
  }
};


export const deleteDoctor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error deleting doctor" };
  }
};

// ============================
// 📅 Appointment Endpoints
// ============================

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_URL}/appointments`, appointmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error booking appointment" };
  }
};

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/appointments`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching appointments" };
  }
};
