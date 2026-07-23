import { formatCurrency } from "../utils/formatCurrency";

const OrderCard = ({ order }) => {
  return (
    <article className="rounded-[1.5rem] border border-dark-200 bg-white p-6 shadow-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-dark-900">Order #{order._id}</p>
          <p className="text-sm text-dark-500">{order.address}</p>
        </div>
        <div className="rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-600">
          {order.status}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {order.items.map((item) => (
          <span
            key={`${order._id}-${item._id}`}
            className="rounded-full border border-dark-200 px-3 py-1 text-sm text-dark-600"
          >
            {item.name} × {item.quantity}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-dark-600">
        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        <span className="font-semibold text-dark-900">
          {formatCurrency(order.total)}
        </span>
      </div>
    </article>
  );
};

export default OrderCard;
