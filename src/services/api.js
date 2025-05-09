import axios from 'axios';
import tokenService from './tokenService.js';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Avoid .env in frontend
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Automatically add token to requests
api.interceptors.request.use((config) => {
  const token = tokenService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;