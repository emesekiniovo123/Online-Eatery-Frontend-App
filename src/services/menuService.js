import api from './api';

const menuService = {
  // Get all meals (with optional query params: search, category, page)
  getMeals: async (params = {}) => {
    const response = await api.get('/meals', { params });
    return response.data;
  },

  // Get a single meal by ID
  getMealById: async (id) => {
    const response = await api.get(`/meals/${id}`);
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    const response = await api.get('/meals/categories');
    return response.data;
  },

  // Admin: Create a new meal
  createMeal: async (mealData) => {
    const response = await api.post('/meals', mealData);
    return response.data;
  },

  // Admin: Update a meal
  updateMeal: async (id, mealData) => {
    const response = await api.put(`/meals/${id}`, mealData);
    return response.data;
  },

  // Admin: Delete a meal
  deleteMeal: async (id) => {
    const response = await api.delete(`/meals/${id}`);
    return response.data;
  },
};

export default menuService;
