import api from './api';

const adminService = {
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data?.data ?? response.data ?? {};
  },

  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data?.data ?? response.data ?? {};
  },

  updateUserRole: async (id, role) => {
    const response = await api.patch(`/admin/users/${id}/role`, { role });
    return response.data;
  },

  getActivities: async (params = {}) => {
    const response = await api.get('/admin/activities', { params });
    return response.data?.data ?? response.data ?? {};
  },
};

export default adminService;
