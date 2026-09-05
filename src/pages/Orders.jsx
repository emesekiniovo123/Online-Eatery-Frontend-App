import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import orderService from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await orderService.getMyOrders();
        const apiOrders = Array.isArray(response)
          ? response
          : response?.orders || response?.data?.orders || [];
        setOrders(apiOrders);
      } catch (error) {
        setOrders([]);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full max-w-4xl rounded-[2rem] border border-dark-200 bg-white/80 p-6 text-center shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Orders
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-dark-900">
          Order history
        </h1>
      </div>

      {loading ? (
        <div className="w-full max-w-4xl rounded-[2rem] border border-dark-200 bg-white/80 p-6 text-center text-sm text-dark-600">
          Loading your orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="w-full max-w-4xl rounded-[2rem] border border-dashed border-dark-200 bg-white/70 p-6 text-center text-sm text-dark-600">
          No orders yet. Place an order from the checkout page to see the
          payment, delivery, and order details here.
        </div>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
