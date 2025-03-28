import React from 'react';

interface TestDetailsProps {
  test: any;
  onBack: () => void;
  onEdit: () => void;
}

const TestDetails: React.FC<TestDetailsProps> = ({ test, onBack, onEdit }) => {
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
          Edit Test
        </button>
      </div>

      <h2>Test Details</h2>
      <div style={{ 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      }}>
        <DetailRow label="Institution" value={test.institution} />
        <DetailRow label="Gender" value={test.gender} />
        <DetailRow label="Age Lower Limit" value={test.age_lower_limit} />
        <DetailRow label="Age Upper Limit" value={test.age_upper_limit} />
        <DetailRow label="Age Unit" value={test.age_unit} />
        <DetailRow label="Normal Lower Limit" value={test.normal_lower_limit} />
        <DetailRow label="Normal Upper Limit" value={test.normal_upper_limit} />
        <DetailRow label="Critical Lower Limit" value={test.critical_lower_limit} />
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div style={{ marginBottom: '10px' }}>
    <strong style={{ marginRight: '10px' }}>{label}:</strong>
    <span>{value}</span>
  </div>
);

export default TestDetails;