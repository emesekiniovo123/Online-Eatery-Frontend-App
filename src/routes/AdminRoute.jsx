//Navigate is used to redirect the user to another route.
//Outlet: Render the protected page here if the user passes the security check.
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="py-12 text-center text-sm text-dark-500">Checking your access...</div>;
  }

  if (!isAdmin) {
    //"replace prevents the unauthorized route from 
    // remaining as a separate entry in the browser history."
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
