//useState: Used to store the orders
//useEffect: Used to perform an operation when the component loads
import { useEffect, useState } from "react";
//OrderCard is a reusable component responsible for displaying one individual order.
import OrderCard from "../components/OrderCard";
//This imports the service responsible for communicating with the backend order API.
import orderService from "../services/orderService";

const ORDER_STORAGE_KEY = "eatery_orders";

//This defines the main React component for the order history page.

//Its responsibilities are:

//Load orders.
//Store orders in state.
//Display an empty state if there are no orders.
//Display each order using OrderCard.
const Orders = () => {

//  orders: Contains the current list of orders.
//setOrders: Used to update the order list
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await orderService.getMyOrders();
        const apiOrders = Array.isArray(response)
          ? response
          : response?.orders || [];
        if (apiOrders.length > 0) {
          setOrders(apiOrders);
          return;
        }
      } catch {
        // Fall back to browser storage when the backend is unavailable.
      }

      try {
        const storedOrders = JSON.parse(
          localStorage.getItem(ORDER_STORAGE_KEY) || "[]",
        );
        setOrders(storedOrders);
      } catch {
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Orders
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-dark-900">
          Order history
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-dark-200 bg-white/70 p-6 text-sm text-dark-600">
          No orders yet. Place an order from the checkout page to see the
          payment, delivery, and order details here.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
