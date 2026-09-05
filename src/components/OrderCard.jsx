import { formatCurrency } from "../utils/formatCurrency";

const OrderCard = ({ order }) => {
  const items = Array.isArray(order.items) ? order.items : [];
  const orderStatus = order.orderStatus || order.status || "Pending";

  return (
    <article className="rounded-[1.5rem] border border-dark-200 bg-white p-6 text-center shadow-card">
      <div className="flex flex-col items-center gap-4">
        <div>
          <p className="font-semibold text-dark-900">Order #{order._id}</p>
          <p className="text-sm text-dark-500">
            {order.deliveryAddress ||
              order.address ||
              "No delivery address provided"}
          </p>
        </div>
        <div className="rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-600">
          {orderStatus}
        </div>
      </div>

      <div className="mt-4 grid justify-items-center gap-3 text-sm text-dark-700 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
            Email
          </p>
          <p className="mt-1 font-medium">{order.email || "Not provided"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
            Phone
          </p>
          <p className="mt-1 font-medium">{order.phone || "Not provided"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
            Payment method
          </p>
          <p className="mt-1 font-medium">
            {order.paymentMethod || "Cash on Delivery"}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
            Payment status
          </p>
          <p className="mt-1 font-medium">{order.paymentStatus || "pending"}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {items.map((item) => (
          <span
            key={`${order._id}-${item._id}`}
            className="rounded-full border border-dark-200 px-3 py-1 text-sm text-dark-600"
          >
            {item.name} × {item.quantity}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-dark-600">
        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        <span className="font-semibold text-dark-900">
          {formatCurrency(order.total ?? order.totalAmount ?? 0)}
        </span>
      </div>

      {Array.isArray(order.statusHistory) && order.statusHistory.length > 0 && (
        <div className="mt-5 border-t border-dark-100 pt-4">
          <p className="text-xs uppercase tracking-[0.2em] text-dark-400">
            Tracking history
          </p>
          <div className="mt-3 space-y-2">
            {order.statusHistory.map((entry, index) => (
              <div
                key={`${entry.status}-${entry.changedAt}-${index}`}
                className="flex justify-center gap-3 text-sm text-dark-600"
              >
                <span>{entry.status}</span>
                <time dateTime={entry.changedAt}>
                  {new Date(entry.changedAt).toLocaleString()}
                </time>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default OrderCard;
