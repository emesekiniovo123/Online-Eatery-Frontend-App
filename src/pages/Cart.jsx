import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-8 text-center shadow-card">
        <h1 className="text-2xl font-semibold text-dark-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-dark-600">
          Add some meals to begin your order.
        </p>
        <Link
          to="/menu"
          className="mt-6 inline-flex rounded-full bg-primary-400 px-6 py-3 text-sm font-semibold text-dark-900"
        >
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4 rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
              Cart
            </p>
            <h1 className="text-2xl font-semibold text-dark-900">
              Your order summary
            </h1>
          </div>
        </div>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col gap-4 rounded-[1.25rem] border border-dark-200 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-dark-900">{item.name}</p>
              <p className="text-sm text-dark-500">
                {formatCurrency(item.price)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="rounded-full border border-dark-200 px-3 py-1 text-sm"
              >
                −
              </button>
              <span className="min-w-8 text-center font-semibold">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="rounded-full border border-dark-200 px-3 py-1 text-sm"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => removeFromCart(item._id)}
                className="ml-2 text-sm font-semibold text-danger-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] border border-dark-200 bg-dark-900 p-6 text-white shadow-card">
        <h2 className="text-xl font-semibold">Checkout</h2>
        <div className="mt-6 space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-dark-300">Subtotal</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-dark-300">Delivery</span>
            <span>{formatCurrency(4.5)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(cartTotal + 4.5)}</span>
          </div>
        </div>
        <Link
          to="/checkout"
          className="mt-8 inline-flex w-full justify-center rounded-full bg-primary-400 px-6 py-3 text-center text-sm font-semibold text-dark-900"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
