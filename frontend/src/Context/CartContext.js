import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Add item or increase quantity if already exists
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ Remove item completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  // ✅ Increase quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) => i._id === id ? { ...i, quantity: i.quantity + 1 } : i)
    );
  };

  // ✅ Decrease quantity — remove if reaches 0
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) => i._id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter((i) => i.quantity > 0)
    );
  };

  // ✅ Clear entire cart
  const clearCart = () => setCart([]);

  // ✅ Total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  // ✅ Total items count (for badge)
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart,
      increaseQty, decreaseQty,
      clearCart, totalPrice, totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useCart = () => useContext(CartContext);