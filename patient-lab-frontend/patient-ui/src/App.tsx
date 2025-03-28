import React, { useState } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import TestList from './components/TestList';
import TestForm from './components/TestForm';
import TestDetails from './components/TestDetails';

// Define a proper TypeScript type for a Patient
interface Patient {
  id?: number;
  title: string;
  surname: string;
  first_name: string;
  other_name?: string;
  gender: string;
  town: string;
  address: string;
  country: string;
  phone_number: string;
  state: string;
  city: string;
  dob: string;
  additional_info?: string;
  photo?: string;
}

interface Test {
  id?: number;
  institution: string;
  gender: string;
  age_lower_limit: number;
  age_upper_limit: number;
  age_unit: string;
  normal_lower_limit: number;
  normal_upper_limit: number;
  critical_lower_limit: number;
}

const App: React.FC = () => {
  const [view, setView] = useState<'list' | 'patientForm' | 'patientDetails' | 'testForm' | 'testDetails'>('list');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  const handleAddNewPatient = () => {
    setSelectedPatient(null);
    setView('patientForm');
  };

  const handleAddNewTest = () => {
    setSelectedTest(null);
    setView('testForm');
  };

  const handleViewTestDetails = (test: Test) => {
    setSelectedTest(test);
    setView('testDetails');
  };

  const handleEditTest = (test: Test) => {
    setSelectedTest(test);
    setView('testForm');
  };

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setView('patientDetails');
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setView('patientForm');
  };

  const handleBack = () => {
    setView('list');
    setSelectedPatient(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Patient/Laboratory Test Management System</h1>

      {view === 'list' && (
        <>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={handleAddNewPatient}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add New Patient
            </button>
            <button
              onClick={handleAddNewTest}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add New Test
            </button>
          </div>
          <PatientList onViewDetails={handleViewDetails} onEdit={handleEdit} />
          <TestList onViewDetails={handleViewTestDetails} onEdit={handleEditTest} />
        </>
      )}

      {view === 'patientForm' && (
        <PatientForm
          patient={selectedPatient}
          onBack={() => setView('list')}
          onSubmitSuccess={() => setView('list')}
        />
      )}

      {view === 'patientDetails' && selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          onBack={() => setView('list')}
          onEdit={() => handleEdit(selectedPatient)}
        />
      )}

      {view === 'testForm' && (
        <TestForm
          test={selectedTest}
          onBack={() => setView('list')}
          onSubmitSuccess={() => setView('list')}
        />
      )}

      {view === 'testDetails' && selectedTest && (
        <TestDetails
          test={selectedTest}
          onBack={() => setView('list')}
          onEdit={() => handleEditTest(selectedTest)}
        />
      )}
    </div>
  );
};

export default App;

