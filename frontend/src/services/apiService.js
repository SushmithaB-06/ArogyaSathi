import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Unauthorized - token expired
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTHENTICATION API CALLS ============

export const authAPI = {
  signup: (email, password, name) =>
    api.post('/auth/signup', { email, password, name }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  logout: () =>
    api.post('/auth/logout'),
};

// ============ SYMPTOM ANALYSIS API CALLS ============

export const symptomAPI = {
  analyze: (symptoms, language = 'en') => {
    console.log('Analyzing symptoms:', { symptoms, language });
    return api.post('/symptoms/analyze', { symptoms, language });
  },

  getHistory: (userId) =>
    api.get(`/symptoms/history/${userId}`),
};

// ============ HOSPITAL FINDER API CALLS ============

export const hospitalAPI = {
  findNearby: (lat, lng, radius = 5000) => {
    console.log('Finding hospitals:', { lat, lng, radius });
    return api.get('/hospitals/nearby', { 
      params: { 
        lat: parseFloat(lat), 
        lng: parseFloat(lng), 
        radius: parseInt(radius) 
      } 
    });
  },

  search: (query) =>
    api.get('/hospitals/search', { params: { query } }),

  getAll: () =>
    api.get('/hospitals/all'),
};

// ============ MEDICINE REMINDER API CALLS ============

export const medicineAPI = {
  addReminder: (data) =>
    api.post('/medicine/reminder', data),

  getReminders: (userId) =>
    api.get(`/medicine/reminders/${userId}`),

  updateReminder: (reminderId, data) =>
    api.put(`/medicine/reminder/${reminderId}`, data),

  deleteReminder: (reminderId) =>
    api.delete(`/medicine/reminder/${reminderId}`),
};

// ============ EMERGENCY API CALLS ============

export const emergencyAPI = {
  sendSOS: (userId, lat, lng, description) =>
    api.post('/emergency/sos', { userId, lat, lng, description }),

  getContacts: (country = 'india') =>
    api.get(`/emergency/contacts/${country}`),
};

export default api;