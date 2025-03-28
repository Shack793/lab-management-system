import React, { useState, useEffect } from 'react';
import api from '../api';
import { AxiosError } from 'axios';

interface PatientFormProps {
  patient?: any;
  onBack: () => void;
  onSubmitSuccess: () => void;
}

interface PatientFormData {
  title: string;
  surname: string;
  first_name: string;
  other_name: string;
  gender: string;
  town: string;
  address: string;
  country: string;
  phone_number: string;
  state: string;
  city: string;
  dob: string;
  nationality: string;
  language: string;
  id_type: string;
  id_number: string;
  email: string;
  postal_address: string;
  additional_info: string;
  photo?: string; // Add photo field to interface
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onBack, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<PatientFormData>({
    title: '',
    surname: '',
    first_name: '',
    other_name: '',
    gender: '',
    town: '',
    address: '',
    country: '',
    phone_number: '',
    state: '',
    city: '',
    dob: '',
    nationality: '',
    language: '',
    id_type: '',
    id_number: '',
    email: '',
    postal_address: '',
    additional_info: '',
    photo: '',
  });

  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    if (patient) {
      setFormData({
        ...patient,
        photo: patient.photo || '', // Ensure photo is included when editing
      });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, photo: previewUrl });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.photo || '';

      if (photo) {
        try {
          const imageResponse = await api.laravel.patients.upload(photo);
          imageUrl = imageResponse.data.url;
        } catch (error) {
          const axiosError = error as AxiosError<{ message: string }>;
          console.error('Error uploading image:', axiosError);
          alert('Error uploading image: ' + (axiosError.response?.data?.message || 'Failed to upload image'));
          return;
        }
      }

      const patientData = {
        ...formData,
        photo: imageUrl,
      };

      if (patient?.id) {
        await api.laravel.patients.update(patient.id, patientData);
        alert('Patient updated successfully');
      } else {
        await api.laravel.patients.create(patientData);
        alert('Patient added successfully');
      }

      onSubmitSuccess();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error('Error saving patient:', axiosError);

      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert('Error saving patient: ' + (axiosError.response.data.message || 'Server error'));
      } else if (axiosError.request) {
        // The request was made but no response was received
        alert('Error saving patient: No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('Error saving patient: ' + axiosError.message);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
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
      </div>
      <h2>{patient ? 'Edit Patient' : 'Add Patient'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '600px' }}>
        {/* Display image preview if available */}
        {formData.photo && (
          <div style={{ marginBottom: '10px' }}>
            <img
              src={formData.photo}
              alt={`${formData.first_name} ${formData.surname}`}
              style={{
                maxWidth: '200px',
                maxHeight: '200px',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        />

        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} required />
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input type="text" name="other_name" placeholder="Other Name" value={formData.other_name} onChange={handleChange} />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="text" name="town" placeholder="Town/Suburb" value={formData.town} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State/Region" value={formData.state} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} required />
        <input type="text" name="language" placeholder="Language" value={formData.language} onChange={handleChange} required />
        <input type="text" name="id_type" placeholder="ID Type" value={formData.id_type} onChange={handleChange} />
        <input type="text" name="id_number" placeholder="ID Number" value={formData.id_number} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="postal_address" placeholder="Postal Address" value={formData.postal_address} onChange={handleChange} />
        <textarea
          name="additional_info"
          placeholder="Additional Information"
          value={formData.additional_info}
          onChange={handleChange}
          style={{ minHeight: '100px' }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          {patient ? 'Update Patient' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
};

export default PatientForm;






