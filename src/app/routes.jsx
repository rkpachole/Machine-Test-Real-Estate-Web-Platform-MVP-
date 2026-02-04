import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Home from "../pages/Home";
import PropertyDetails from "../pages/PropertyDetails";
import BuyerDashboard from "../pages/buyer/BuyerDashboard";
import SellerDashboard from "../pages/seller/SellerDashboard";
import AdminPanel from "../pages/admin/AdminPanel";
import Login from "../pages/signIn/SignIn";
import SellerRegister from "../pages/SellerRegister";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
       <Route path="/Login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/seller-register" element={<SellerRegister />} />

      {/* Buyer Routes */}
      <Route
        path="/buyer"
        element={
          <ProtectedRoute roles={["buyer"]}>
            <BuyerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Seller Routes */}
      <Route
        path="/seller"
        element={
          <ProtectedRoute roles={["seller"]}>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
