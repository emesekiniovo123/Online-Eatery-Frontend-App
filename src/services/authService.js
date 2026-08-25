import api from './api';

const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  logout: () => {
    // Backend logout is not provided by the verified contract.
  },
};

export default authService;
