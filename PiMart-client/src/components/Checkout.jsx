import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Checkout({ cart }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (orderPlaced) {
    return (
      <div className="container mt-5">
        <div className="card shadow-sm p-4">
          <h2 className="mb-3">Order Confirmation</h2>
          <p>Thank you for your purchase!</p>
          <h5 className="mt-3">Receipt:</h5>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li
                key={item.barcode}
                className="list-group-item d-flex justify-content-between"
              >
                {item.name} (x{item.quantity})
                <span>₱{Number(item.price) * item.quantity}</span>
              </li>
            ))}
          </ul>
          <p className="fw-bold">Total: ₱{totalPrice}</p>
          <p>Payment Method: PayPal</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Checkout</h2>
        <ul className="list-group mb-3">
          {cart.map((item) => (
            <li
              key={item.barcode}
              className="list-group-item d-flex justify-content-between"
            >
              {item.name} (x{item.quantity})
              <span>₱{Number(item.price) * item.quantity}</span>
            </li>
          ))}
        </ul>
        <p className="fw-bold">Total: ₱{totalPrice}</p>

        {/* PayPal Button */}
        <PayPalScriptProvider
          options={{
            "client-id":
              "AYueOZlJXcrqmCmeSFKy75zvwL9-2J3zBfl7dHr5JdOy8ab8pJ1L4-_robDJu_ZAdeFPFsj8QYXNOY0A",
            currency: "USD",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={async () => {
              console.log("Sending cart to backend for PayPal order:", cart);
              const res = await fetch(
                "http://localhost:3005/api/create-paypal-order",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ cart }),
                }
              );
              const data = await res.json();
              console.log("PayPal order created with ID:", data.id);
              return data.id;
            }}
            onApprove={async (data) => {
              console.log(
                "Order approved by PayPal. Capturing with orderID:",
                data.orderID
              );
              const res = await fetch(
                "http://localhost:3005/api/capture-paypal-order",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderID: data.orderID, cart }),
                }
              );
              const capture = await res.json();
              if (capture.success) {
                console.log("Payment capture success:", capture);
                setOrderPlaced(true);
              } else {
                console.error("Payment capture failed:", capture);
              }
            }}
            onError={(err) => {
              console.error("PayPal button error:", err);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default Checkout;
