//is used to redirect the user to another page.
//<Outlet /> : represents the protected child route.
//gets information about the user's current URL/location.
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

//Its purpose is to decide: Can this user access this page?
const ProtectedRoute = () => {
  //isAuthenticated: This tells us whether a user is currently logged in.
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="py-12 text-center text-sm text-dark-500">Checking your session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace
    //It stores the user's original requested location when they are redirected 
    // to the login page, so after successful authentication
    //  the application can return them to that original page.
     state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
