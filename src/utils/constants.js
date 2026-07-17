// Application-wide constants

export const APP_NAME = 'Online Eatery';
export const APP_TAGLINE = 'Fresh Meals, Delivered with Love';

// Meal categories
export const CATEGORIES = [
  'All',
  'Appetizers',
  'Main Course',
  'Desserts',
  'Beverages',
  'Salads',
  'Soups',
  'Sides',
];

// Order statuses
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Order status display config
export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: { label: 'Pending', color: 'warning' },
  [ORDER_STATUS.CONFIRMED]: { label: 'Confirmed', color: 'info' },
  [ORDER_STATUS.PREPARING]: { label: 'Preparing', color: 'info' },
  [ORDER_STATUS.READY]: { label: 'Ready', color: 'success' },
  [ORDER_STATUS.DELIVERED]: { label: 'Delivered', color: 'success' },
  [ORDER_STATUS.CANCELLED]: { label: 'Cancelled', color: 'danger' },
};

// Pagination
export const DEFAULT_PAGE_SIZE = 12;

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'eatery_token',
  USER: 'eatery_user',
  CART: 'eatery_cart',
};
