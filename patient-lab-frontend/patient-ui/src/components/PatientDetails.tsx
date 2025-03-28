import React from 'react';

interface PatientDetailsProps {
  patient: any;
  onBack: () => void;
  onEdit: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onBack, onEdit }) => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={onBack}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to List
        </button>
        <button 
          onClick={onEdit}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Edit Patient
        </button>
      </div>

      <div style={{ 
        maxWidth: '800px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Patient Details</h2>
        
        {patient.photo && (
          <div style={{ marginBottom: '20px' }}>
            <img 
              src={patient.photo} 
              alt="Patient"
              style={{ 
                maxWidth: '200px',
                borderRadius: '4px'
              }}
            />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <InfoItem label="Title" value={patient.title} />
          <InfoItem label="Full Name" value={`${patient.first_name} ${patient.surname} ${patient.other_name || ''}`} />
          <InfoItem label="Gender" value={patient.gender} />
          <InfoItem label="Date of Birth" value={patient.dob} />
          <InfoItem label="Phone Number" value={patient.phone_number} />
          <InfoItem label="Email" value={patient.email} />
          <InfoItem label="Address" value={patient.address} />
          <InfoItem label="Town/Suburb" value={patient.town} />
          <InfoItem label="City" value={patient.city} />
          <InfoItem label="State/Region" value={patient.state} />
          <InfoItem label="Country" value={patient.country} />
          <InfoItem label="Postal Address" value={patient.postal_address} />
          <InfoItem label="Nationality" value={patient.nationality} />
          <InfoItem label="Language" value={patient.language} />
          <InfoItem label="ID Type" value={patient.id_type} />
          <InfoItem label="ID Number" value={patient.id_number} />
        </div>

        {patient.additional_info && (
          <div style={{ marginTop: '20px' }}>
            <h3>Additional Information</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{patient.additional_info}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <strong style={{ color: '#666' }}>{label}:</strong>{' '}
    <span>{value || 'N/A'}</span>
  </div>
);

export default PatientDetails;