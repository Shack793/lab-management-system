import React, { useEffect, useState } from 'react';
import api from '../api';

interface PatientListProps {
  onViewDetails: (patient: any) => void;
  onEdit: (patient: any) => void;
}

const PatientList: React.FC<PatientListProps> = ({ onViewDetails, onEdit }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await api.laravel.patients.list();
      setPatients(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Failed to load patients. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await api.laravel.patients.delete(id);
        await fetchPatients(); // Refresh the list
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Failed to delete patient. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading patients...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        borderRadius: '4px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={tableHeaderStyle}>Patient Code</th>
            <th style={tableHeaderStyle}>Patient Name</th>
            <th style={tableHeaderStyle}>Gender</th>
            <th style={tableHeaderStyle}>Phone</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient: any) => (
            <tr key={patient.id} style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={tableCellStyle}>{patient.id}</td>
              <td style={tableCellStyle}>{`${patient.first_name} ${patient.surname}`}</td>
              <td style={tableCellStyle}>{patient.gender}</td>
              <td style={tableCellStyle}>{patient.phone_number}</td>
              <td style={tableCellStyle}>{patient.email}</td>
              <td style={tableCellStyle}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onViewDetails(patient)}
                    style={{ ...buttonStyle, backgroundColor: '#007bff' }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(patient)}
                    style={{ ...buttonStyle, backgroundColor: '#ffc107', color: 'black' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left' as const,
  borderBottom: '2px solid #dee2e6',
  fontWeight: 'bold'
};

const tableCellStyle = {
  padding: '12px',
  textAlign: 'left' as const
};

const buttonStyle = {
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px'
};

export default PatientList;
