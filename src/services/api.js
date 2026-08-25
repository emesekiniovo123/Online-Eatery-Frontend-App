//Purpose of api.js are :
//Send HTTP requests from the frontend to the backend.
//Automatically attach the user's JWT token and handle unauthorized responses.

//Axios is a JavaScript library used to make HTTP requests.
import axios from 'axios';
import { STORAGE_KEYS } from '../utils/constants';

const baseURL = import.meta.env.DEV ? '/api' : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api`;

// Create a shared Axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// An Axios request interceptor runs before an HTTP request is sent.
// Frontend wants to make API request
//              ↓
//       Request interceptor
//              ↓
//        Add JWT token
//              ↓
//         Send request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      //It creates an HTTP header like:Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//A response interceptor runs after the backend responds:
// Backend
//    ↓
// Response
//    ↓
// Response interceptor
//    ↓
// Frontend
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      //The purpose is to prevent unnecessary redirection 
      // if the user is already on the login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
