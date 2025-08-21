import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Scanner from "./components/Scanner";
import Item from "./components/Item";

function App() {
  const [cart, setCart] = useState([]);

  // Add product to cart when scanned
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <Header /> {/* Always displayed on all pages */}
      <Routes>
        <Route path="/" element={<Scanner onAddToCart={handleAddToCart} />} />
        <Route path="/item" element={<Item cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
