// | Function        | Purpose                              |
// | --------------- | ------------------------------------ |
// | `createContext` | Creates a global cart context        |
// | `useContext`    | Allows components to access the cart |
// | `useState`      | Stores the cart items                |
// | `useEffect`     | Saves cart changes to localStorage   |
// | `useCallback`   | Memorizes cart functions             |

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Import the predefined localStorage key used to save the shopping cart.
import { STORAGE_KEYS } from '../utils/constants';

// Create a global context that will hold all shopping cart data and functions.
const CartContext = createContext(null);

//This custom hook allows components to access the cart easily
export const useCart = () => {
  const context = useContext(CartContext);

  // Prevent the hook from being used outside CartProvider.
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  // Return the cart data and functions to the component using the hook.
  return context;
};

//This provider wraps the application.
//Usually in main.jsx
//children represents everything placed inside the provider .
export const CartProvider = ({ children }) => {

  // Store all meals currently selected by the customer.
  const [cartItems, setCartItems] = useState(() => {
    try {

      // Retrieve the previously saved cart from the browser's localStorage.
      const stored = localStorage.getItem(STORAGE_KEYS.CART);

      //convert saved data from JSON into an array; otherwise use an empty cart.
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  //Runs whenever the cart changes.
//Purpose:
//Automatically save the updated cart into localStorage.
  useEffect(() => {

    // Convert the cart to JSON and save it in localStorage.
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a meal to the cart, using a default quantity of 1.
  const addToCart = useCallback((meal, quantity = 1) => {

    //Accessing the previous cart state
    setCartItems((prev) => {

      // Check whether the selected meal already exists in the cart.
      const existing = prev.find((item) => item._id === meal._id);
      if (existing) {

        //Updating the existing meal`s quantity by adding the new quantity to it.
        return prev.map((item) =>
          item._id === meal._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // If the meal is not already in the cart, add it as a new cart item.
      return [...prev, { ...meal, quantity }];
    });
  }, []);

  // Remove a specific meal from the cart using its unique ID.
  const removeFromCart = useCallback((mealId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== mealId));
  }, []);

  // Change the quantity of a specific meal in the cart.
  const updateQuantity = useCallback((mealId, quantity) => {

    //Remove when quantity is <= 0 
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item._id !== mealId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === mealId ? { ...item, quantity } : item
      )
    );
  }, []);

// Create a function that completely empties the shopping cart.
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Calculate the total cost by multiplying each meal's price by its quantity.
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate the total number of individual meals in the cart.
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Provide cart data and cart functions 
  // to all components inside the provider.
  return (
    <CartContext.Provider

    // Expose the cart state,
    //  cart operations, total price,
    //  and item count to the application.
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}

      // Render the application components inside the CartProvider.
    >
      {children}
    </CartContext.Provider>
  );
};

// Export the CartContext so it can also be imported directly when needed.
export default CartContext;
