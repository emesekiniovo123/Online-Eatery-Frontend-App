//Link — used to navigate between pages without refreshing the entire website.
//Outlet — acts as a placeholder where the child route's component will be displayed.
//React Router is a library used to handle navigation
//and routing in a React application without requiring full page reloads.
import { Link, Outlet } from "react-router-dom";

//This imports a custom React hook called
//  useAuth which access to authentication-related information
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

//AdminLayout provide common structure of the administrator section
const AdminLayout = () => {
  //The useAuth() hook returns authentication-related data.
  const { user, logout } = useAuth();

  //This tells React what should be displayed on the screen.
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="space-y-4">
        <Sidebar />
        <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-4 text-center shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
            Signed in
          </p>

          <p className="mt-2 font-semibold text-dark-900">
            {user?.name || "Administrator"}
          </p>
          <Link
            to="/"
            className="mt-3 inline-flex text-sm font-semibold text-primary-500"
          >
            Back to storefront
          </Link>

          <button
            type="button"
            onClick={logout}
            className="mt-4 rounded-full border border-dark-200 px-4 py-2 text-sm font-semibold text-dark-700"
          >
            Logout
          </button>
        </div>
      </div>
      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
