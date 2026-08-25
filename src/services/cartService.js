import api from './api';

const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (foodId, quantity = 1) => {
    const response = await api.post('/cart/add', { foodId, quantity });
    return response.data;
  },

  updateCart: async (foodId, quantity) => {
    const response = await api.put('/cart/update', { foodId, quantity });
    return response.data;
  },

  removeFromCart: async (foodId) => {
    const response = await api.delete(`/cart/remove/${foodId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  },
};

export default cartService;
