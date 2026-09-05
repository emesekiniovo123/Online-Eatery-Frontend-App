import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminService from "../services/adminService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentOrders, setRecentOrders] = useState([]);
  const [mostOrderedFoods, setMostOrderedFoods] = useState([]);
  const [salesByMonth, setSalesByMonth] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const dashboard = await adminService.getDashboard();
        setStats({
          totalUsers: Number(dashboard.totalUsers ?? 0),
          totalOrders: Number(dashboard.totalOrders ?? 0),
          pendingOrders: Number(dashboard.pendingOrders ?? 0),
          deliveredOrders: Number(dashboard.deliveredOrders ?? 0),
          cancelledOrders: Number(dashboard.cancelledOrders ?? 0),
          totalRevenue: Number(
            dashboard.totalRevenue ?? dashboard.revenue ?? 0,
          ),
          revenue: Number(dashboard.revenue ?? dashboard.totalRevenue ?? 0),
        });
        setRecentOrders(
          Array.isArray(dashboard.recentOrders) ? dashboard.recentOrders : [],
        );
        setMostOrderedFoods(
          Array.isArray(dashboard.mostOrderedFoods)
            ? dashboard.mostOrderedFoods
            : [],
        );
        setSalesByMonth(
          Array.isArray(dashboard.salesByMonth) ? dashboard.salesByMonth : [],
        );
        setReviews(Array.isArray(dashboard.reviews) ? dashboard.reviews : []);
      } catch (error) {
        console.error(error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load admin dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="mx-auto w-[70%] space-y-6 text-center">
      <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-dark-900">Dashboard</h1>
      </div>

      {loading ? (
        <div className="rounded-[1.5rem] border border-dark-200 bg-white p-5 text-sm text-dark-600">
          Loading admin dashboard...
        </div>
      ) : error ? (
        <div className="rounded-[1.5rem] border border-danger-200 bg-danger-50 p-5 text-sm text-danger-700">
          {error}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Users", stats.totalUsers],
              ["Orders", stats.totalOrders],
              [
                "Revenue",
                `$${Number(stats.totalRevenue || stats.revenue || 0).toFixed(2)}`,
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-dark-200 bg-green-600 p-5 text-white shadow-card"
              >
                <p className="text-sm text-white">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {["Pending orders", "Delivered orders", "Cancelled orders"].map(
              (label, index) => {
                const values = [
                  stats.pendingOrders,
                  stats.deliveredOrders,
                  stats.cancelledOrders,
                ];
                return (
                  <div
                    key={label}
                    className="rounded-[1.5rem] border border-dark-200 bg-green-600 p-5 text-white shadow-card"
                  >
                    <p className="text-sm text-white">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {values[index]}
                    </p>
                  </div>
                );
              },
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[1.5rem] border border-dark-200 bg-green-600 p-5 text-white shadow-card">
              <h2 className="text-lg font-semibold text-white">
                Recent orders
              </h2>
              {recentOrders.length === 0 ? (
                <p className="mt-4 text-sm text-white">No recent orders.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-center gap-3 text-sm"
                    >
                      <span className="text-white">
                        {order.customer?.fullName || "Customer"}
                      </span>
                      <span className="text-white">
                        {order.orderStatus || "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-[1.5rem] border border-dark-200 bg-green-600 p-5 text-white shadow-card">
              <h2 className="text-lg font-semibold text-white">
                Most ordered meals
              </h2>
              {mostOrderedFoods.length === 0 ? (
                <p className="mt-4 text-sm text-white">No meal data.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {mostOrderedFoods.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-center gap-3 text-sm"
                    >
                      <span className="text-white">
                        {item.food?.[0]?.name || "Meal"}
                      </span>
                      <span className="text-white">{item.count || 0}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[1.5rem] border border-dark-200 bg-green-600 p-5 text-white shadow-card">
              <h2 className="text-lg font-semibold text-white">
                Monthly sales
              </h2>
              {salesByMonth.length === 0 ? (
                <p className="mt-4 text-sm text-white">No sales data.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {salesByMonth.map((item) => (
                    <div
                      key={item.month || item.label}
                      className="flex items-center justify-center gap-3 text-sm"
                    >
                      <span className="text-white">
                        {item.label || item.month}
                      </span>
                      <span className="text-white">
                        ${Number(item.revenue || 0).toFixed(2)} (
                        {item.orders || 0} orders)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-[1.5rem] border border-dark-200 bg-green-600 p-5 text-white shadow-card">
              <h2 className="text-lg font-semibold text-white">Reviews</h2>
              <p className="mt-4 text-sm text-white">
                {Array.isArray(reviews)
                  ? `${reviews.length} reviews available.`
                  : `${Number(reviews || 0)} reviews available.`}
              </p>
            </section>
          </div>
        </>
      )}

      <div className="flex justify-center gap-3">
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
