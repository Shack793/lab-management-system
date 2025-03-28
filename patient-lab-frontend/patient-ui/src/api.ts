import axios from 'axios';

// Backend URLs
const LARAVEL_API_URL = 'http://localhost:8000/api';
const NESTJS_API_URL = 'http://localhost:3000';

// Type definitions
interface PatientData {
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
  nationality: string;
  language: string;
  id_type: string;
  id_number: string;
  email: string;
  postal_address?: string;
  additional_info?: string;
  photo?: string;
}

interface TestData {
  id?: number;
  name: string;
  abbreviation?: string;
  test_category: string;
  price: number;
  turnaround_time: number;
  result_options?: string[];
  result_unit?: string;
  lower_limit?: number;
  upper_limit?: number;
  consultants?: string[];
  show_comment_in_report: boolean;
  comment?: string;
  additional_information?: string;
  additional_report_information?: string;
  has_template: boolean;
  is_deprecated: boolean;
  institution: 'leg' | 'hand';
  gender: string;
  age_lower_limit: number;
  age_upper_limit: number;
  age_unit: string;
  normal_lower_limit: number;
  normal_upper_limit: number;
  critical_lower_limit: number;
}

// API instances
const laravelApi = axios.create({
  baseURL: LARAVEL_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const nestApi = axios.create({
  baseURL: NESTJS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Laravel API endpoints
const laravelEndpoints = {
  patients: {
    list: () => laravelApi.get('/patients'),
    search: (query: string, page: number) => laravelApi.get(`/patients/search`, {
      params: { query, page }
    }),
    create: (data: PatientData) => laravelApi.post('/patients', data),
    update: (id: number, data: PatientData) => laravelApi.put(`/patients/${id}`, data),
    delete: (id: number) => laravelApi.delete(`/patients/${id}`),
    show: (id: number) => laravelApi.get(`/patients/${id}`),
    upload: (file: File) => {
      const formData = new FormData();
      formData.append('photo', file);
      return laravelApi.post('/patients/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  },
  tests: {
    list: () => laravelApi.get('/tests'),
    create: (data: TestData) => laravelApi.post('/tests', data),
    update: (id: number, data: TestData) => laravelApi.put(`/tests/${id}`, data),
    delete: (id: number) => laravelApi.delete(`/tests/${id}`),
    show: (id: number) => laravelApi.get(`/tests/${id}`),
  },
  languages: {
    list: () => laravelApi.get('/languages'),
    create: (data: any) => laravelApi.post('/languages', data),
    update: (id: number, data: any) => laravelApi.put(`/languages/${id}`, data),
    delete: (id: number) => laravelApi.delete(`/languages/${id}`),
  },
  nationalities: {
    list: () => laravelApi.get('/nationalities'),
    create: (data: any) => laravelApi.post('/nationalities', data),
    update: (id: number, data: any) => laravelApi.put(`/nationalities/${id}`, data),
    delete: (id: number) => laravelApi.delete(`/nationalities/${id}`),
  },
};

// NestJS API endpoints
const nestEndpoints = {
  hello: () => nestApi.get('/'),
};

// Combined API object
const api = {
  laravel: laravelEndpoints,
  nest: nestEndpoints,
};

export default api;

// Named exports for individual use
export {
  laravelApi,
  nestApi,
  laravelEndpoints,
  nestEndpoints,
};







