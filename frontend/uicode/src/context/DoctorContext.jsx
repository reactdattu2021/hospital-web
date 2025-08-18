import React, { createContext, useEffect, useState } from 'react';
import { getDoctors } from '../api/api';

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async (query = '') => {
  const data = await getDoctors(query);
  setDoctors(data);
};

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors, fetchDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};

