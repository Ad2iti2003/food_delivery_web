import React, { useEffect, useState } from "react";
import axios from "axios";

function MenuPage() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenu(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Menu Items</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Food</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Payment</th>
            <th>Order Time</th>
          </tr>
        </thead>

        <tbody>
          {menu.map((item) => (
            <tr key={item._id}>
              <td>{item.orderId}</td>
              <td>{item.customerName}</td>
              <td>{item.foodItem}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>{item.paymentMethod}</td>
              <td>{item.orderTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuPage;