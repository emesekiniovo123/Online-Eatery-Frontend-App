export const mockMeals = [
  {
    _id: 'meal-1',
    name: 'Signature Burger',
    description: 'Juicy grilled beef patty with cheddar, lettuce, tomato, and house sauce.',
    price: 14.5,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    _id: 'meal-2',
    name: 'Crispy Chicken Wrap',
    description: 'Golden chicken, crunchy slaw, and spicy mayo wrapped in a warm tortilla.',
    price: 11.75,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    _id: 'meal-3',
    name: 'Garden Salad',
    description: 'Fresh greens, roasted vegetables, feta, and citrus vinaigrette.',
    price: 9.25,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    _id: 'meal-4',
    name: 'Loaded Nachos',
    description: 'Crispy tortilla chips topped with cheese, salsa, jalapeños, and guac.',
    price: 10.5,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1513456854501-9c8d1d45c2a4?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'meal-5',
    name: 'Berry Parfait',
    description: 'Creamy yogurt layered with berries, granola, and honey.',
    price: 7.5,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'meal-6',
    name: 'Iced Citrus Tea',
    description: 'Refreshing citrus blend served over ice with mint.',
    price: 4.25,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=900&q=80',
  },
];

export const mockCategories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Salads'];

export const mockUsers = [
  {
    _id: 'user-customer',
    name: 'Demo Customer',
    email: 'customer@eatery.com',
    role: 'customer',
    password: 'password123',
  },
  {
    _id: 'user-admin',
    name: 'Demo Admin',
    email: 'admin@eatery.com',
    role: 'admin',
    password: 'admin123',
  },
];

export const mockOrders = [
  {
    _id: 'order-1',
    customerName: 'Demo Customer',
    address: '12 Oak Street',
    phone: '+1 555 0101',
    total: 29.5,
    status: 'preparing',
    createdAt: '2026-07-16T10:00:00.000Z',
    items: [
      { _id: 'meal-1', name: 'Signature Burger', quantity: 1, price: 14.5 },
      { _id: 'meal-6', name: 'Iced Citrus Tea', quantity: 1, price: 4.25 },
    ],
  },
];
