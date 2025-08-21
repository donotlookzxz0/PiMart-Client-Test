import React from "react";

const Header = () => {
  return (
    <header
      style={{
        padding: "15px",
        backgroundColor: "#007bff",
        color: "white",
        textAlign: "center",
        borderRadius: "8px",
        marginBottom: "20px"
      }}
    >
      <h1>🛍️ PiMart</h1>
      <p>Smart Inventory & Self-Checkout</p>
    </header>
  );
};

export default Header;
