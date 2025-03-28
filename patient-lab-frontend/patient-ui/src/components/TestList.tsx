import React, { useEffect, useState } from 'react';
import api from '../api';

interface TestListProps {
  onViewDetails: (test: any) => void;
  onEdit: (test: any) => void;
}

const TestList: React.FC<TestListProps> = ({ onViewDetails, onEdit }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const response = await api.laravel.tests.list();
      setTests(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching tests:', error);
      setError('Failed to load tests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      try {
        await api.laravel.tests.delete(id);
        await fetchTests();
      } catch (error) {
        console.error('Error deleting test:', error);
        alert('Failed to delete test. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading tests...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h2>Test List</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        borderRadius: '4px',
        marginTop: '20px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={tableHeaderStyle}>Institution</th>
            <th style={tableHeaderStyle}>Gender</th>
            <th style={tableHeaderStyle}>Age Limit</th>
            <th style={tableHeaderStyle}>Age Upper Limit</th>
            <th style={tableHeaderStyle}>Age Unit</th>
            <th style={tableHeaderStyle}>Normal Lower Limit</th>
            <th style={tableHeaderStyle}>Normal Upper Limit</th>
            <th style={tableHeaderStyle}>Critical Lower Limit</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test: any) => (
            <tr key={test.id} style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={tableCellStyle}>{test.institution}</td>
              <td style={tableCellStyle}>{test.gender}</td>
              <td style={tableCellStyle}>{test.age_lower_limit}</td>
              <td style={tableCellStyle}>{test.age_upper_limit}</td>
              <td style={tableCellStyle}>{test.age_unit}</td>
              <td style={tableCellStyle}>{test.normal_lower_limit}</td>
              <td style={tableCellStyle}>{test.normal_upper_limit}</td>
              <td style={tableCellStyle}>{test.critical_lower_limit}</td>
              <td style={tableCellStyle}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onViewDetails(test)}
                    style={{ ...buttonStyle, backgroundColor: '#007bff' }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(test)}
                    style={{ ...buttonStyle, backgroundColor: '#ffc107', color: 'black' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(test.id)}
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

export default TestList;