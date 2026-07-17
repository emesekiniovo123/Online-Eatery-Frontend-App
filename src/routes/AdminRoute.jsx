import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="py-12 text-center text-sm text-dark-500">Checking your access...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
