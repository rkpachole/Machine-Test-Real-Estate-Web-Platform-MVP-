import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // Seller registration required
  if (
    user.role === "seller" &&
    !user.isRegisteredSeller
  ) {
    return <Navigate to="/seller-register" replace />;
  }

  // Role-based protection
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
