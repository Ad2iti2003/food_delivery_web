import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./Components/Profile";
import MenuPage from "./pages/Menu";

import RestaurantDashboard from "./pages/RestaurantDashboard";
import RestaurantMenu from "./pages/RestaurantMenu";
import RestaurantOrders from "./pages/RestaurantOrders";
import RestaurantProfile from "./pages/RestaurantProfile";

import ProtectedRoute from "./Components/ProtectedRoute";
import Cart from "./pages/Cart"; 
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard"; // already imported







export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />   
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={
        <ProtectedRoute>
        <MyOrders />
        </ProtectedRoute>
        } />

        <Route path="/menu" element={<MenuPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
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