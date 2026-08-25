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

// Order statuses follow the verified backend contract.
export const ORDER_STATUS = {
  PENDING: 'Pending',
  PREPARING: 'Preparing',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

// Order status display config for UI mapping.
export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: { label: 'Pending', color: 'warning' },
  [ORDER_STATUS.PREPARING]: { label: 'Preparing', color: 'info' },
  [ORDER_STATUS.OUT_FOR_DELIVERY]: { label: 'Out for Delivery', color: 'info' },
  [ORDER_STATUS.DELIVERED]: { label: 'Delivered', color: 'success' },
  [ORDER_STATUS.CANCELLED]: { label: 'Cancelled', color: 'danger' },
};

// Pagination :This defines the default number of items to display per page.
export const DEFAULT_PAGE_SIZE = 12;

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'eatery_token',
  USER: 'eatery_user',
  CART: 'eatery_cart',
};
