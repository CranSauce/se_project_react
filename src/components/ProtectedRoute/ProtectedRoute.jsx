import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user, loading }) {
  if (loading) {
    return null; 
  }
  return user ? children : <Navigate to="/" />;
}

export default ProtectedRoute;