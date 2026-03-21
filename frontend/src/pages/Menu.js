import React, { useEffect, useState } from "react";
import axios from "axios";

function MenuPage() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
      .then(res => setMenu(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Menu Items</h2>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuPage;