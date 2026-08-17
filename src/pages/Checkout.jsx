//useState: Used to manage local state
import { useState } from "react";
//This allows the application to programmatically move the user to another page.
import { useNavigate } from "react-router-dom";
//useForm: It makes handling forms easier, including:
// collecting input values
// validating inputs
// detecting errors
// submitting the form
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { notify } from "../components/ToastProvider";
import { formatCurrency } from "../utils/formatCurrency";
import orderService from "../services/orderService";

const ORDER_STORAGE_KEY = "eatery_orders";
const DELIVERY_FEE = 4.5;
const PAYMENT_METHODS = [
  {
    value: "Cash on Delivery",
    title: "Cash on Delivery",
    description: "Pay in cash when your order arrives.",
  },
  {
    value: "Card",
    title: "Card",
    description: "Use your debit or credit card for fast checkout.",
  },
  {
    value: "Bank Transfer",
    title: "Bank Transfer",
    description: "Transfer directly to the restaurant account.",
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  //It keeps track of whether the order has been successfully submitted
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      address: user?.address || "",
      phone: user?.phone || "",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "pending",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      bankName: "",
      accountName: "",
      reference: "",
      note: "",
    },
  });

  //watch(): It allows your component to know which payment method the customer has selected.
  const selectedPaymentMethod = watch("paymentMethod");
//It runs when the customer submits the checkout form
  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      notify("Your cart is empty", "error");
      return;
    }

    const order = {
      _id: `order-${Date.now()}`,
      customerName: user?.name || "Guest Customer",
      email: data.email || user?.email || "",
      address: data.address,
      phone: data.phone,
      paymentMethod: data.paymentMethod || "Cash on Delivery",
      paymentStatus: data.paymentStatus || "pending",
      //This uses a ternary operator.
      status: data.paymentStatus === "paid" ? "confirmed" : "pending",
      note: data.note || "",
      total: cartTotal + DELIVERY_FEE,
      createdAt: new Date().toISOString(),
      items: cartItems.map((item) => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const storedOrders = JSON.parse(
        localStorage.getItem(ORDER_STORAGE_KEY) || "[]",
      );
      localStorage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify([order, ...storedOrders]),
      );
    } catch {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([order]));
    }

    try {
      //This sends the order to your backend through your orderService.
      await orderService.createOrder(order);
    } catch {
      // Keep the frontend order flow working even when the API is unavailable.
    }

    notify("Order placed successfully", "success");
    clearCart();
    //This causes the success message in the UI to appear
    setSubmitted(true);
    //After 1.2 seconds, the customer is taken to their orders page.
    //After successfully placing an order, the customer is taken to the /orders page.
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
            label="Email"
            name="email"
            type="email"
            placeholder="customer@email.com"
            register={register}
            error={errors.email}
            required
            {...register("email", { required: "Email is required" })}
          />
          <Input
            label="Delivery address"
            name="address"
            placeholder="No. 8, Masaka, Nasarawa State."
            register={register}
            error={errors.address}
            required
            {...register("address", { required: "Address is required" })}
          />
          <Input
            label="Phone number"
            name="phone"
            placeholder="+234 70 555 01123"
            register={register}
            error={errors.phone}
            required
            {...register("phone", { required: "Phone is required" })}
          />

          <div className="space-y-2">
            <p className="text-sm font-medium text-dark-700">Payment method</p>
            <div className="grid gap-3 md:grid-cols-3">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedPaymentMethod === method.value;

                return (
                  <label
                    key={method.value}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? "border-primary-400 bg-primary-50 shadow-sm"
                        : "border-dark-200 bg-white/80"
                    }`}
                  >
                    <input
                      type="radio"
                      value={method.value}
                      className="sr-only"
                      {...register("paymentMethod")}
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

          {selectedPaymentMethod === "Card" && (
            <div className="grid gap-4 rounded-2xl border border-dark-200 bg-dark-50 p-4 sm:grid-cols-2">
              <Input
                label="Cardholder name"
                name="cardName"
                placeholder="John Doe"
                register={register}
                error={errors.cardName}
                required
                {...register("cardName", {
                  required: "Cardholder name is required",
                })}
              />
              <Input
                label="Card number"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                register={register}
                error={errors.cardNumber}
                required
                {...register("cardNumber", {
                  required: "Card number is required",
                })}
              />
              <Input
                label="Expiry date"
                name="expiryDate"
                placeholder="MM/YY"
                register={register}
                error={errors.expiryDate}
                required
                {...register("expiryDate", {
                  required: "Expiry date is required",
                })}
              />
              <Input
                label="CVV"
                name="cvv"
                placeholder="123"
                register={register}
                error={errors.cvv}
                required
                {...register("cvv", { required: "CVV is required" })}
              />
            </div>
          )}

          {selectedPaymentMethod === "Bank Transfer" && (
            <div className="grid gap-4 rounded-2xl border border-dark-200 bg-dark-50 p-4 sm:grid-cols-2">
              <Input
                label="Bank name"
                name="bankName"
                placeholder="First Bank"
                register={register}
                error={errors.bankName}
                required
                {...register("bankName", { required: "Bank name is required" })}
              />
              <Input
                label="Account name"
                name="accountName"
                placeholder="Online Eatery"
                register={register}
                error={errors.accountName}
                required
                {...register("accountName", {
                  required: "Account name is required",
                })}
              />
              <div className="sm:col-span-2">
                <Input
                  label="Reference"
                  name="reference"
                  placeholder="Transfer reference or transaction ID"
                  register={register}
                  error={errors.reference}
                  required
                  {...register("reference", {
                    required: "Reference is required",
                  })}
                />
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="paymentStatus"
                className="text-sm font-medium text-dark-700"
              >
                Payment status
              </label>
              <select
                id="paymentStatus"
                className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm"
                {...register("paymentStatus")}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>
          </div>

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
            <span>Delivery</span>
            <span>{formatCurrency(DELIVERY_FEE)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(cartTotal + DELIVERY_FEE)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
