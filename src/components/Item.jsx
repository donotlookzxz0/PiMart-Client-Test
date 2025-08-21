import React from "react";

const Item = ({ cart }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>🛒 Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>No items scanned yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
                maxWidth: "300px",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <h3>{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>
                <b>${item.price}</b>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Item;
