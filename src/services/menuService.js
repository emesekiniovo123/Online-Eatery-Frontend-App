import api from './api';

const menuService = {
  // Get all foods from the backend menu endpoint
  getMeals: async (params = {}) => {
    const response = await api.get('/menu', { params });
    return response.data;
  },

  // Get a single food by ID
  getMealById: async (id) => {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  },

  // Get all categories from the menu API
  getCategories: async () => {
    const response = await api.get('/menu/categories');
    return response.data;
  },

  // Admin: Create a new meal
  createMeal: async (mealData) => {
    const config = mealData instanceof FormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : undefined;
    const response = await api.post('/menu', mealData, config);
    return response.data;
  },

  // Admin: Update a meal
  updateMeal: async (id, mealData) => {
    const config = mealData instanceof FormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : undefined;
    const response = await api.put(`/menu/${id}`, mealData, config);
    return response.data;
  },

  // Admin: Delete a meal
  deleteMeal: async (id) => {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
  },
};

export default menuService;
