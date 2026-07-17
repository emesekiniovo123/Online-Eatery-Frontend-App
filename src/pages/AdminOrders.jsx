import { mockOrders } from "../utils/mockData";
import { formatCurrency } from "../utils/formatCurrency";

const AdminOrders = () => {
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
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div
            key={order._id}
            className="rounded-[1.5rem] border border-dark-200 bg-white p-5 shadow-card"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-dark-900">
                  {order.customerName}
                </p>
                <p className="text-sm text-dark-500">{order.address}</p>
              </div>
              <div className="rounded-full bg-info-50 px-3 py-1 text-sm font-semibold text-info-500">
                {order.status}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-dark-600">
              <span>{formatCurrency(order.total)}</span>
              <button
                type="button"
                className="rounded-full border border-dark-200 px-4 py-2 font-semibold text-dark-700"
              >
                Update status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
