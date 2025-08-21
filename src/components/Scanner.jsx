import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const Scanner = ({ onAddToCart }) => {
  const videoRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [isScanning, setIsScanning] = useState(false); // ✅ Camera toggle
  const [controls, setControls] = useState(null);

  // Fake database (replace later with API or DB)
  const mockDatabase = {
    "12345": { name: "Coca-Cola", category: "Beverage", price: 25 },
    "67890": { name: "Oreo", category: "Snacks", price: 15 },
    "11111": { name: "Lays", category: "Snacks", price: 20 }
  };

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    if (isScanning) {
      const c = codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            const barcode = result.getText();
            const foundProduct = mockDatabase[barcode] || {
              name: "Unknown Product",
              category: "N/A",
              price: 0,
            };
            setProduct(foundProduct);
          }
        }
      );
      setControls(c);
    } else {
      // Stop camera if scanning is off
      if (controls && typeof controls.stop === "function") {
        controls.stop();
      }
    }

    // Cleanup on unmount
    return () => {
      if (controls && typeof controls.stop === "function") {
        controls.stop();
      }
    };
  }, [isScanning]); // rerun when scanning state changes

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>📷 Scan Product</h2>

      <button
        onClick={() => setIsScanning(!isScanning)}
        style={{
          padding: "10px 15px",
          marginBottom: "15px",
          borderRadius: "5px",
          background: isScanning ? "red" : "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isScanning ? "Stop Camera" : "Start Camera"}
      </button>

      <video
        ref={videoRef}
        style={{
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #ccc",
          display: isScanning ? "block" : "none",
        }}
      />

      {product && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginTop: "15px",
            maxWidth: "300px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>
            <b>₱{product.price}</b>
          </p>
          <button onClick={() => onAddToCart(product)}>Add to Cart 🛒</button>
        </div>
      )}
    </div>
  );
};

export default Scanner;
