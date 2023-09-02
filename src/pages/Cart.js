import React from "react";
import axios from "axios";
import "../styles/cart.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cartItems, setCartItems }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const roundedTotalPrice = Math.round(totalPrice * 100) / 100;

  const handleIncreaseQuantity = async (userId, itemId) => {
    try {
      const updateUrl = `http://localhost:8080/api/update-cart-quantity/${userId}/${itemId}`;
      await axios.put(updateUrl, { action: "increase" });
      // Update cartItems state here
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecreaseQuantity = async (userId, itemId) => {
    try {
      if (cartItems.find((item) => item._id === itemId).quantity <= 1) {
        // Don't allow decreasing below 1
        return;
      }
      const updateUrl = `http://localhost:8080/api/update-cart-quantity/${userId}/${itemId}`;
      await axios.put(updateUrl, { action: "decrease" });
      // Update cartItems state here
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item._id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (userId, itemId) => {
    try {
      const deleteUrl = `http://localhost:8080/api/delete-from-cart/${userId}/${itemId}`;
      await axios.delete(deleteUrl);
      // Update cartItems state here
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_fYBmLVqHmRpeiu",
      amount: data.amount,
      currency: data.currency,
      name: "Green Grocer",
      description: "Test Transaction",

      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#008000",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/payment/orders";
      //const { data } = await axios.post(orderUrl, { amount: totalPrice });
      const amountInPaise = Math.round(totalPrice * 100); // Convert to integer in paise
      const { data } = await axios.post(orderUrl, { amount: amountInPaise });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <div className="cart-item cart-item-header">
          <p>Sr. No.</p>
          <p>Name of Vegetable</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total Amount</p>
        </div>
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <p>{index + 1}</p>
            <p>{item.name}</p>
            <p>Rs {item.price}</p>
            <p>
              <button
                onClick={() => {
                  const userId = sessionStorage.getItem("userId");
                  handleDecreaseQuantity(userId, item._id);
                }}
                className="quantity-button"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              {item.quantity}
              <button
                onClick={() => {
                  const userId = sessionStorage.getItem("userId");
                  handleIncreaseQuantity(userId, item._id);
                }}
                className="quantity-button"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </p>
            <p>Rs {(item.price * item.quantity).toFixed(2)}</p>
            <div className="cart-item-delete">
              <button
                className="delete-icon-button"
                onClick={() => {
                  const userId = sessionStorage.getItem("userId");
                  handleDeleteItem(userId, item._id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total-summary">
          <p>Total Items: {cartItems.length}</p>
          <p>Total Price: Rs {roundedTotalPrice.toFixed(2)}</p>
        </div>
        <button className="buy-button" onClick={handlePayment}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
