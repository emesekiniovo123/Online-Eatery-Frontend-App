import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { formatCurrency } from "../utils/formatCurrency";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: user?.address || "",
      phone: user?.phone || "",
      note: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Order submitted", {
      ...data,
      items: cartItems,
      total: cartTotal + 4.5,
    });
    clearCart();
    setSubmitted(true);
    setTimeout(() => navigate("/orders"), 1200);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Checkout
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-dark-900">
          Delivery details
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <Input
            label="Delivery address"
            name="address"
            placeholder="123 Market Street"
            register={register}
            error={errors.address}
            required
            {...register("address", { required: "Address is required" })}
          />
          <Input
            label="Phone number"
            name="phone"
            placeholder="+1 555 0123"
            register={register}
            error={errors.phone}
            required
            {...register("phone", { required: "Phone is required" })}
          />
          <Input
            label="Note"
            name="note"
            placeholder="Leave at the front desk"
            register={register}
            error={errors.note}
          />
          <Button type="submit">Place order</Button>
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
            <span>Total</span>
            <span>{formatCurrency(cartTotal + 4.5)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
