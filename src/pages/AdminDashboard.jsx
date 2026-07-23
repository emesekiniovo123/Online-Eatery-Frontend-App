import { Link } from "react-router-dom";
import { mockOrders, mockMeals } from "../utils/mockData";

const AdminDashboard = () => {
  const revenue = mockMeals.reduce((sum, meal) => sum + meal.price, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-dark-900">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Orders", mockOrders.length],
          ["Menu items", mockMeals.length],
          ["Revenue", `$${revenue.toFixed(2)}`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[1.5rem] border border-dark-200 bg-white p-5 shadow-card"
          >
            <p className="text-sm text-dark-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-dark-900">{value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Link
          to="/admin/menu"
          className="rounded-full bg-primary-400 px-5 py-3 text-sm font-semibold text-dark-900"
        >
          Manage menu
        </Link>
        <Link
          to="/admin/orders"
          className="rounded-full border border-dark-200 bg-white px-5 py-3 text-sm font-semibold text-dark-700"
        >
          Manage orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
