import { useEffect, useState } from "react";
import adminService from "../services/adminService";
import { notify } from "../components/ToastProvider";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [userData, activityData] = await Promise.all([
        adminService.getUsers(),
        adminService.getActivities({ limit: 25 }),
      ]);
      setUsers(Array.isArray(userData.users) ? userData.users : []);
      setActivities(
        Array.isArray(activityData.activities) ? activityData.activities : [],
      );
    } catch (error) {
      notify(
        error.response?.data?.message || "Unable to load admin records.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const changeRole = async (user, role) => {
    try {
      await adminService.updateUserRole(user._id, role);
      notify("User role updated.", "success");
      await loadData();
    } catch (error) {
      notify(
        error.response?.data?.message || "Unable to update role.",
        "error",
      );
    }
  };

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-dark-200 bg-white/80 p-6 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-dark-900">
          Users and activity
        </h1>
      </header>

      {loading ? (
        <div className="rounded-[1.5rem] border border-dark-200 bg-white p-5 text-sm text-dark-600">
          Loading records...
        </div>
      ) : (
        <>
          <section className="rounded-[1.5rem] border border-dark-200 bg-white p-5 shadow-card">
            <h2 className="text-lg font-semibold text-dark-900">User roles</h2>
            <div className="mt-4 divide-y divide-dark-100">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-dark-900">
                      {user.fullName}
                    </p>
                    <p className="text-sm text-dark-500">{user.email}</p>
                  </div>
                  <select
                    value={user.role}
                    onChange={(event) => changeRole(user, event.target.value)}
                    className="rounded-xl border border-dark-200 px-3 py-2 text-sm text-dark-700"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-dark-200 bg-white p-5 shadow-card">
            <h2 className="text-lg font-semibold text-dark-900">
              Recent activity
            </h2>
            <div className="mt-4 space-y-3">
              {activities.length === 0 ? (
                <p className="text-sm text-dark-500">No activity recorded.</p>
              ) : (
                activities.map((activity) => (
                  <div
                    key={activity._id}
                    className="flex flex-col gap-1 border-b border-dark-100 pb-3 text-sm sm:flex-row sm:justify-between"
                  >
                    <span className="text-dark-700">
                      {activity.userName || activity.user?.fullName || "Admin"}{" "}
                      {activity.action}
                    </span>
                    <time
                      className="text-dark-500"
                      dateTime={activity.createdAt}
                    >
                      {new Date(activity.createdAt).toLocaleString()}
                    </time>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminUsers;
