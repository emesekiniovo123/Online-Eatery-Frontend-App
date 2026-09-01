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
                    Order #{order._id?.toString().slice(-8) || "Unknown"}
                  </p>
                  <p className="text-sm text-dark-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "No date"}
                  </p>
                </div>
                <div className="rounded-full bg-info-50 px-3 py-1 text-sm font-semibold text-info-500">
                  {order.orderStatus || order.status || "Pending"}
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-dark-600 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
                    Customer Email
                  </p>
                  <p className="mt-1 font-medium">
                    {order.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
                    Phone
                  </p>
                  <p className="mt-1 font-medium">
                    {order.phone || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
                    Delivery Address
                  </p>
                  <p className="mt-1 font-medium">
                    {order.deliveryAddress ||
                      order.address ||
                      "No address provided"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
                    Payment Method
                  </p>
                  <p className="mt-1 font-medium">
                    {order.paymentMethod
                      ? order.paymentMethod
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())
                      : "Cash on Delivery"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {Array.isArray(order.items) &&
                  order.items.map((item) => (
                    <span
                      key={`${order._id}-${item._id || item.food?._id}`}
                      className="rounded-full border border-dark-200 px-3 py-1 text-sm text-dark-600"
                    >
                      {item.name || item.food?.name || "Item"} × {item.quantity}
                    </span>
                  ))}
              </div>

              <div className="mt-4 border-t border-dark-100 pt-4">
                <div className="grid gap-2 text-sm text-dark-600 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
                      Subtotal
                    </p>
                    <p className="mt-1 font-semibold text-dark-900">
                      {formatCurrency(order.subtotal || 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
                      Delivery Fee
                    </p>
                    <p className="mt-1 font-semibold text-dark-900">
                      {formatCurrency(order.deliveryFee || 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
                      Total
                    </p>
                    <p className="mt-1 font-semibold text-dark-900">
                      {formatCurrency(
                        Number(order.totalAmount ?? order.total ?? 0),
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
                    Payment Status
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {order.paymentStatus || "Pending"}
                  </p>
                </div>
                <select
                  value={order.orderStatus || order.status || "Pending"}
                  onChange={(event) =>
                    handleStatusChange(order._id, event.target.value)
                  }
                  className="rounded-xl border border-dark-200 bg-white px-3 py-2 text-sm font-medium"
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
