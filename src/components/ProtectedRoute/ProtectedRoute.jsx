import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user }) {
  console.log("ProtectedRoute User:", user);  // Debugging to check if user is available
  return user ? children : <Navigate to="/" />;
}
export default ProtectedRoute;
