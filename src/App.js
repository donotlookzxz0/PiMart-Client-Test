// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Scanner from "./components/Scanner";
import Item from "./components/Item";
import Checkout from "./components/Checkout";

function App() {
  const [cart, setCart] = useState([]);

 // Add item to cart
const handleAddToCart = (product) => {
  console.log("Adding to cart:", product); // ✅ Debug log

  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === product.id);
    if (existingItem) {
      console.log("Item already in cart, increasing quantity:", product.id);
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      console.log("New item added:", product.id);
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};

  // ✅ Handle quantity changes from Item component
  const handleQuantityChange = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/scanner"
          element={<Scanner onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/"
          element={<Item cart={cart} onQuantityChange={handleQuantityChange} />}
        />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
