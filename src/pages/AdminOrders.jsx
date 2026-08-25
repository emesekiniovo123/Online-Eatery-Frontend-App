import { useEffect, useState } from "react";
import orderService from "../services/orderService";
import { formatCurrency } from "../utils/formatCurrency";
import { notify } from "../components/ToastProvider";

const ORDER_STATUS_OPTIONS = [
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const response = await orderService.getAllOrders();
      const apiOrders = Array.isArray(response)
        ? response
        : response?.orders || response?.data?.orders || [];
      setOrders(apiOrders);
    } catch (error) {
      notify(
        error.response?.data?.message || "Unable to load admin orders.",
        "error",
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await orderService.updateOrderStatus(orderId, status);
      const updatedOrder = response?.order || response?.data?.order || response;
      setOrders((current) =>
        current.map((order) =>
          order._id === orderId ? { ...order, ...updatedOrder } : order,
        ),
      );
      notify("Order status updated successfully.", "success");
    } catch (error) {
      notify(
        error.response?.data?.message || "Unable to update order status.",
        "error",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-dark-900">
          Manage orders
        </h1>
      </div>

      {loading ? (
        <div className="rounded-[1.5rem] border border-dark-200 bg-white p-5 text-sm text-dark-600">
          Loading orders...
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-[1.5rem] border border-dark-200 bg-white p-5 shadow-card"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-dark-900">
                    {order.customerName || order.user?.name || "Customer"}
                  </p>
                  <p className="text-sm text-dark-500">
                    {order.deliveryAddress ||
                      order.address ||
                      "No address provided"}
                  </p>
                </div>
                <div className="rounded-full bg-info-50 px-3 py-1 text-sm font-semibold text-info-500">
                  {order.orderStatus || order.status || "Pending"}
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3 text-sm text-dark-600 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  {formatCurrency(
                    Number(order.totalAmount ?? order.total ?? 0),
                  )}
                </span>
                <select
                  value={order.orderStatus || order.status || "Pending"}
                  onChange={(event) =>
                    handleStatusChange(order._id, event.target.value)
                  }
                  className="rounded-xl border border-dark-200 bg-white px-3 py-2 text-sm"
                >
                  {ORDER_STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
