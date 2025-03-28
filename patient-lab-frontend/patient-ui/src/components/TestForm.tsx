import React, { useState, useEffect } from 'react';
import api from '../api';

interface TestFormProps {
  test?: any;
  onBack: () => void;
  onSubmitSuccess: () => void;
}

const TestForm: React.FC<TestFormProps> = ({ test, onBack, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    test_category: '',
    price: '',
    turnaround_time: '',
    result_options: [] as string[],
    result_unit: '',
    lower_limit: '',
    upper_limit: '',
    consultants: [] as string[],
    show_comment_in_report: false,
    comment: '',
    additional_information: '',
    additional_report_information: '',
    has_template: false,
    is_deprecated: false,
    institution: 'leg' as 'leg' | 'hand',
    gender: '',
    age_lower_limit: '',
    age_upper_limit: '',
    age_unit: '',
    normal_lower_limit: '',
    normal_upper_limit: '',
    critical_lower_limit: '',
  });

  useEffect(() => {
    if (test) {
      setFormData(test);
    }
  }, [test]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleArrayChange = (field: 'result_options' | 'consultants', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const convertedData = {
        ...formData,
        name: formData.name,
        test_category: formData.test_category,
        price: Number(formData.price),
        turnaround_time: Number(formData.turnaround_time),
        lower_limit: formData.lower_limit ? Number(formData.lower_limit) : undefined,
        upper_limit: formData.upper_limit ? Number(formData.upper_limit) : undefined,
        show_comment_in_report: Boolean(formData.show_comment_in_report),
        has_template: Boolean(formData.has_template),
        is_deprecated: Boolean(formData.is_deprecated),
        institution: formData.institution as 'leg' | 'hand',
        gender: formData.gender,
        age_lower_limit: Number(formData.age_lower_limit),
        age_upper_limit: Number(formData.age_upper_limit),
        age_unit: formData.age_unit,
        normal_lower_limit: Number(formData.normal_lower_limit),
        normal_upper_limit: Number(formData.normal_upper_limit),
        critical_lower_limit: Number(formData.critical_lower_limit),
        // Optional fields
        abbreviation: formData.abbreviation || undefined,
        result_options: formData.result_options,
        result_unit: formData.result_unit || undefined,
        consultants: formData.consultants,
        comment: formData.comment || undefined,
        additional_information: formData.additional_information || undefined,
        additional_report_information: formData.additional_report_information || undefined,
      };

      if (test?.id) {
        await api.laravel.tests.update(test.id, convertedData);
        alert('Test updated successfully');
      } else {
        await api.laravel.tests.create(convertedData);
        alert('Test added successfully');
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error saving test:', error);
      alert('Error saving test. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={onBack} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Back to List
        </button>
      </div>
      <h2>{test ? 'Edit Test' : 'Add Test'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '600px' }}>
        <input
          type="text"
          name="name"
          placeholder="Test Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="abbreviation"
          placeholder="Abbreviation"
          value={formData.abbreviation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="test_category"
          placeholder="Test Category"
          value={formData.test_category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="turnaround_time"
          placeholder="Turnaround Time (hours)"
          value={formData.turnaround_time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="result_options"
          placeholder="Result Options (comma-separated)"
          value={formData.result_options.join(', ')}
          onChange={(e) => handleArrayChange('result_options', e.target.value)}
        />
        <input
          type="text"
          name="result_unit"
          placeholder="Result Unit"
          value={formData.result_unit}
          onChange={handleChange}
        />
        <input
          type="number"
          name="lower_limit"
          placeholder="Lower Limit"
          value={formData.lower_limit}
          onChange={handleChange}
        />
        <input
          type="number"
          name="upper_limit"
          placeholder="Upper Limit"
          value={formData.upper_limit}
          onChange={handleChange}
        />
        <input
          type="text"
          name="consultants"
          placeholder="Consultants (comma-separated)"
          value={formData.consultants.join(', ')}
          onChange={(e) => handleArrayChange('consultants', e.target.value)}
        />
        <div>
          <label>
            <input
              type="checkbox"
              name="show_comment_in_report"
              checked={formData.show_comment_in_report}
              onChange={handleChange}
            />
            Show Comment in Report
          </label>
        </div>
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <textarea
          name="additional_information"
          placeholder="Additional Information"
          value={formData.additional_information}
          onChange={handleChange}
        />
        <textarea
          name="additional_report_information"
          placeholder="Additional Report Information"
          value={formData.additional_report_information}
          onChange={handleChange}
        />
        <div>
          <label>
            <input
              type="checkbox"
              name="has_template"
              checked={formData.has_template}
              onChange={handleChange}
            />
            Has Template
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="is_deprecated"
              checked={formData.is_deprecated}
              onChange={handleChange}
            />
            Is Deprecated
          </label>
        </div>
        <select
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          required
        >
          <option value="">Select Institution</option>
          <option value="leg">Leg</option>
          <option value="hand">Hand</option>
        </select>
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age_lower_limit"
          placeholder="Age Lower Limit"
          value={formData.age_lower_limit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age_upper_limit"
          placeholder="Age Upper Limit"
          value={formData.age_upper_limit}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="age_unit"
          placeholder="Age Unit"
          value={formData.age_unit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="normal_lower_limit"
          placeholder="Normal Lower Limit"
          value={formData.normal_lower_limit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="normal_upper_limit"
          placeholder="Normal Upper Limit"
          value={formData.normal_upper_limit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="critical_lower_limit"
          placeholder="Critical Lower Limit"
          value={formData.critical_lower_limit}
          onChange={handleChange}
          required
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
          {test ? 'Update Test' : 'Add Test'}
        </button>
      </form>
    </div>
  );
};

export default TestForm;


