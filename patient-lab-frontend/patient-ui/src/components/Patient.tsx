import React, { useEffect, useState } from 'react';
import api from '../api';
import { AxiosError, AxiosResponse } from 'axios';

interface Patient {
  id: number;
  first_name: string;
  surname: string;
  gender: string;
  phone_number: string;
  address: string;
  email: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    api.laravel.patients.list()
      .then((response: AxiosResponse<Patient[]>) => setPatients(response.data))
      .catch((error: AxiosError) => console.error('Error:', error));
  }, []);

  const handleSearch = () => {
    api.laravel.patients.search('john', 1)
      .then((response: AxiosResponse<Patient[]>) => setPatients(response.data))
      .catch((error: AxiosError) => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Patient Management</h2>
      <button onClick={handleSearch}>
        Search for John (Page 1)
      </button>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            {patient.first_name} {patient.surname} - {patient.phone_number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;


