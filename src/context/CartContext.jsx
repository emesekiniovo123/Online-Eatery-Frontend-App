// | Function        | Purpose                              |
// | --------------- | ------------------------------------ |
// | `createContext` | Creates a global cart context        |
// | `useContext`    | Allows components to access the cart |
// | `useState`      | Stores the cart items                |
// | `useEffect`     | Saves cart changes to localStorage   |
// | `useCallback`   | Memorizes cart functions             |

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import cartService from "../services/cartService";
import { STORAGE_KEYS } from "../utils/constants";

const CartContext = createContext(null);

const normalizeCartItem = (entry) => {
  const food = entry?.food || entry?.meal || entry;
  const foodId = food?._id || food?.id || entry?.foodId || entry?._id;
  const quantity = Number(entry?.quantity ?? food?.quantity ?? 1);

  if (!foodId) return null;

  return {
    _id: foodId,
    name: food?.name || entry?.name || "Food item",
    description: food?.description || entry?.description || "",
    price: Number(food?.price ?? entry?.price ?? 0),
    category: food?.category || entry?.category || "General",
    image: food?.image || entry?.image || "",
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
  };
};

const extractCartItems = (payload) => {
  const listSource = Array.isArray(payload)
    ? payload
    : payload?.items ||
      payload?.cartItems ||
      payload?.data?.cart?.items ||
      payload?.data ||
      [];

  if (!Array.isArray(listSource)) {
    return [];
  }

  return listSource.map(normalizeCartItem).filter(Boolean);
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const syncCart = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await cartService.getCart();
        const backendItems = extractCartItems(response);
        setCartItems(backendItems);
      } catch {
        // Keep the local UI state if the backend is unavailable.
      }
    };

    syncCart();
  }, [isAuthenticated]);

  const addToCart = useCallback(
    async (meal, quantity = 1) => {
      const nextQty = Number(quantity) > 0 ? Number(quantity) : 1;

      if (isAuthenticated) {
        try {
          const response = await cartService.addToCart(
            meal._id || meal.id,
            nextQty,
          );
          const backendItems = extractCartItems(response);
          setCartItems(backendItems);
          return response;
        } catch (error) {
          throw error;
        }
      }

      setCartItems((prev) => {
        const existing = prev.find(
          (item) => item._id === (meal._id || meal.id),
        );
        if (existing) {
          return prev.map((item) =>
            item._id === (meal._id || meal.id)
              ? { ...item, quantity: item.quantity + nextQty }
              : item,
          );
        }

        return [
          ...prev,
          { ...meal, _id: meal._id || meal.id, quantity: nextQty },
        ];
      });
    },
    [isAuthenticated],
  );

  const removeFromCart = useCallback(
    async (mealId) => {
      if (isAuthenticated) {
        try {
          const response = await cartService.removeFromCart(mealId);
          const backendItems = extractCartItems(response);
          setCartItems(backendItems);
          return response;
        } catch (error) {
          throw error;
        }
      }

      setCartItems((prev) => prev.filter((item) => item._id !== mealId));
    },
    [isAuthenticated],
  );

  const updateQuantity = useCallback(
    async (mealId, quantity) => {
      if (quantity <= 0) {
        await removeFromCart(mealId);
        return;
      }

      if (isAuthenticated) {
        try {
          const response = await cartService.updateCart(mealId, quantity);
          const backendItems = extractCartItems(response);
          setCartItems(backendItems);
          return response;
        } catch (error) {
          throw error;
        }
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item._id === mealId ? { ...item, quantity } : item,
        ),
      );
    },
    [isAuthenticated, removeFromCart],
  );

  const clearCart = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await cartService.clearCart();
      } catch (error) {
        throw error;
      }
    }

    setCartItems([]);
  }, [isAuthenticated]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
