import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./Components/Profile";

import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantMenu from "./pages/RestaurantMenu";
import RestaurantOrders from "./pages/RestaurantOrders";
import RestaurantProfile from "./pages/RestaurantProfile";

import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Restaurant Protected Routes */}
        <Route
          path="/restaurant"
          element={
            <ProtectedRoute allowedRoles={["restaurant"]}>
              <RestaurantDashboard />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<h2>📊 Welcome to Restaurant Dashboard</h2>}
          />
          <Route path="menu" element={<RestaurantMenu />} />
          <Route path="orders" element={<RestaurantOrders />} />
          <Route path="profile" element={<RestaurantProfile />} />
        </Route>
      </Routes>
    </>
  );
}