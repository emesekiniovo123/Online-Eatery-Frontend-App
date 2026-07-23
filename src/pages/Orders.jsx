import { mockOrders } from "../utils/mockData";
import OrderCard from "../components/OrderCard";

const Orders = () => {
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
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
