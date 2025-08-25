// Checkout.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Checkout({ cart }) {
  const [paymentMethod] = useState("PayPal"); // fixed payment option
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="container mt-5">
        <div className="card shadow-sm p-4">
          <h2 className="mb-3">Order Confirmation</h2>
          <p>Thank you for your purchase!</p>

          <h5 className="mt-3">Receipt:</h5>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between">
                {item.name} (x{item.quantity})
                <span>₱{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <p className="fw-bold">Total: ₱{totalPrice}</p>
          <p>Payment Method: {paymentMethod}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4">Checkout</h2>

        {/* Cart Review */}
        <div className="mb-4">
          <h5>Your Items:</h5>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  {item.name} (x{item.quantity})
                  <span>₱{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="fw-bold">Total: ₱{totalPrice}</p>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <h5>Payment Method:</h5>
          <input
            type="text"
            className="form-control"
            value={paymentMethod}
            readOnly
          />
        </div>

        {/* Place Order Button */}
        <button
          className="btn btn-primary w-100"
          onClick={handlePlaceOrder}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
