import React, { useState } from "react";

const VegetableItem = ({ image, name, price, handleAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (name, price) => {
    handleAddToCart(name, price, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000); // Display the message for 2 seconds
  };

  return (
    <div className="item">
      <img src={image} alt={name} />
      <div className="item-details">
        <h3>{name}</h3>
        <p className="price">Rs {price}/ KG</p>
        <label htmlFor={`quantity_${name}`}>Quantity (KG):</label>
        <select
          id={`quantity_${name}`}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button className="add-to-cart" onClick={() => addToCart(name, price)}>
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default VegetableItem;
