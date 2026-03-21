import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Grid, Paper, Typography, Tab, Tabs,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton,
  CircularProgress, Alert, Select, MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const statusColors = {
  "Pending":          "warning",
  "Preparing":        "info",
  "Out for Delivery": "secondary",
  "Delivered":        "success",
  "Cancelled":        "error"
};

// ✅ Stat Card component
function StatCard({ icon, label, value, color }) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{
        width: 56, height: 56, borderRadius: "50%",
        backgroundColor: color + "22",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {React.cloneElement(icon, { sx: { color, fontSize: 28 } })}
      </Box>
      <Box>
        <Typography variant="h5" fontWeight="bold">{value}</Typography>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
      </Box>
    </Paper>
  );
}

export default function AdminDashboard() {
  const [tab, setTab]       = useState(0);
  const [stats, setStats]   = useState(null);
  const [users, setUsers]   = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, ordersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/stats",  { headers }),
        axios.get("http://localhost:5000/api/admin/users",  { headers }),
        axios.get("http://localhost:5000/api/admin/orders", { headers })
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      setError("Failed to load dashboard data. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, { headers });
      setUsers(users.filter((u) => u._id !== id));
    } catch {
      setError("Failed to delete user.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/orders/${id}`,
        { status },
        { headers }
      );
      setOrders(orders.map((o) => o._id === id ? { ...o, status } : o));
    } catch {
      setError("Failed to update order status.");
    }
  };

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <CircularProgress color="warning" />
    </Box>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        🛠️ Admin Dashboard
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* ✅ Stats Cards */}
      {stats && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<PeopleIcon />}      label="Total Users"       value={stats.totalUsers}       color="#2196f3" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<RestaurantIcon />}  label="Restaurants"       value={stats.totalRestaurants} color="#ff9800" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<ShoppingBagIcon />} label="Total Orders"      value={stats.totalOrders}      color="#9c27b0" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={<AttachMoneyIcon />} label="Revenue (Delivered)" value={`₹${stats.totalRevenue}`} color="#4caf50" />
          </Grid>
        </Grid>
      )}

      {/* ✅ Tabs */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{ borderBottom: "1px solid #eee", px: 2 }}
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#ff9800" } }}
        >
          <Tab label="Recent Orders" />
          <Tab label="All Users" />
          <Tab label="All Orders" />
        </Tabs>

        <Box sx={{ p: 3 }}>

          {/* Tab 0 — Recent Orders */}
          {tab === 0 && (
            <>
              <Typography variant="h6" mb={2}>Recent Orders</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#fff8f0" }}>
                      <TableCell><strong>Order ID</strong></TableCell>
                      <TableCell><strong>Customer</strong></TableCell>
                      <TableCell><strong>Items</strong></TableCell>
                      <TableCell><strong>Total</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats?.recentOrders?.map((order) => (
                      <TableRow key={order._id} hover>
                        <TableCell>#{order._id.slice(-6).toUpperCase()}</TableCell>
                        <TableCell>
                          {order.user?.name || "N/A"}<br />
                          <Typography variant="caption" color="text.secondary">
                            {order.user?.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                        </TableCell>
                        <TableCell>₹{order.totalPrice}</TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            color={statusColors[order.status] || "default"}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {/* Tab 1 — All Users */}
          {tab === 1 && (
            <>
              <Typography variant="h6" mb={2}>
                All Users ({users.length})
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#fff8f0" }}>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Role</strong></TableCell>
                      <TableCell><strong>Joined</strong></TableCell>
                      <TableCell><strong>Action</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id} hover>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.role}
                            color={
                              user.role === "admin"      ? "error"   :
                              user.role === "restaurant" ? "warning" : "default"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {/* Tab 2 — All Orders */}
          {tab === 2 && (
            <>
              <Typography variant="h6" mb={2}>
                All Orders ({orders.length})
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#fff8f0" }}>
                      <TableCell><strong>Order ID</strong></TableCell>
                      <TableCell><strong>Customer</strong></TableCell>
                      <TableCell><strong>Items</strong></TableCell>
                      <TableCell><strong>Total</strong></TableCell>
                      <TableCell><strong>Payment</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id} hover>
                        <TableCell>#{order._id.slice(-6).toUpperCase()}</TableCell>
                        <TableCell>
                          {order.user?.name || "N/A"}<br />
                          <Typography variant="caption" color="text.secondary">
                            {order.user?.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
                        </TableCell>
                        <TableCell>₹{order.totalPrice}</TableCell>
                        <TableCell>{order.paymentMethod}</TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                          >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Preparing">Preparing</MenuItem>
                            <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

        </Box>
      </Paper>
    </Box>
  );
}