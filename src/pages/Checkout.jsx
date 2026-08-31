import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { notify } from "../components/ToastProvider";
import { formatCurrency } from "../utils/formatCurrency";
import orderService from "../services/orderService";

const DELIVERY_FEE = 5;
const PAYMENT_METHODS = [
  {
    value: "cash_on_delivery",
    title: "Cash on Delivery",
    description: "Pay in cash when your order arrives.",
  },
  {
    value: "stripe",
    title: "Stripe",
    description: "Pay securely online with Stripe.",
  },
  {
    value: "paypal",
    title: "PayPal",
    description: "Use your PayPal account to complete checkout.",
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: user?.phone || "",
      address: user?.address || "",
      paymentMethod: "cash_on_delivery",
    },
  });

  const selectedPaymentMethod = watch("paymentMethod");
  const deliveryFee = selectedPaymentMethod === "cash_on_delivery" ? DELIVERY_FEE : 0;

  const userName = user?.fullName || user?.name || "Guest";

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      notify("Your cart is empty", "error");
      return;
    }

    setLoading(true);
    setSubmitted(false);

    try {
      await orderService.createOrder({
        deliveryAddress: data.address,
        phone: data.phone,
        paymentMethod: data.paymentMethod,
      });

      notify("Order placed successfully", "success");
      await clearCart();
      setSubmitted(true);
      setTimeout(() => navigate("/orders"), 1200);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to place your order.";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] items-start">
      <div className="flex h-full flex-col rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Checkout
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-dark-900">
          Delivery details
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-1 flex-col gap-5">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-dark-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white">
                <FaUser className="h-4 w-4" />
              </span>
              <span className="text-lg font-semibold">{userName}</span>
            </div>

            <Input
              label="Phone number"
              name="phone"
              placeholder="+234 814 327 6154"
              register={register}
              error={errors.phone}
              required
              {...register("phone", {
                required: "Phone number is required",
              })}
            />

            <Input
              label="Delivery address"
              name="address"
              placeholder="Lagos, Nigeria"
              register={register}
              error={errors.address}
              required
              {...register("address", {
                required: "Delivery address is required",
              })}
            />
          </div>

          <div className="space-y-2 pt-1">
            <p className="text-sm font-medium text-dark-700">Payment method</p>
            <div className="grid gap-3 md:grid-cols-3">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedPaymentMethod === method.value;

                return (
                  <label
                    key={method.value}
                    className={`block cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? "border-primary-400 bg-primary-50 shadow-sm"
                        : "border-dark-200 bg-white/80"
                    }`}
                  >
                    <input
                      type="radio"
                      value={method.value}
                      className="sr-only"
                      {...register("paymentMethod", {
                        required: "A payment method is required",
                      })}
                    />
                    <p className="font-semibold text-dark-900">
                      {method.title}
                    </p>
                    <p className="mt-1 text-xs text-dark-500">
                      {method.description}
                    </p>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-2">
            <Button type="submit" loading={loading} fullWidth>
              Place order
            </Button>
          </div>
        </form>

        {submitted && (
          <p className="mt-4 text-sm text-sage-600">
            Order placed successfully. Redirecting to your orders...
          </p>
        )}
      </div>

      <div className="rounded-[2rem] border border-dark-200 bg-dark-900 p-6 text-white shadow-card">
        <h2 className="text-xl font-semibold">Order summary</h2>
        <div className="mt-6 space-y-4 text-sm">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold">
            <span>Delivery</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(cartTotal + deliveryFee)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
