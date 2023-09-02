/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/citysearch.css";
import VegetableItem from "./VegetableItem";

function CitySearch() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedVegetables, setSelectedVegetables] = useState([]);
  const [setCartItems] = useState([]);

  const handleAddToCart = async (itemName, itemPrice, quantity) => {
    console.log("Adding Item to Cart:", itemName, itemPrice);

    const newItem = {
      name: itemName,
      price: itemPrice,
      quantity,
    };
    setCartItems((prevItems) => [...prevItems, newItem]);

    // Check if a user is logged in
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      // If no user is logged in, display a message
      alert("Log in to Add to Cart");
      return;
    }

    // Make a POST request to the /api/add-to-cart route
    const response = await fetch("http://localhost:8080/api/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        itemName,
        itemPrice,
        quantity,
      }),
    });

    if (!response.ok) {
      console.error("Error Adding Item to Cart: ", response.statusText);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Cities: ", error);
      });
  }, []);

  const handleSearch = () => {
    if (!selectedCity) {
      setSelectedVegetables([]);
      return;
    }

    axios
      .get(`http://localhost:8080/api/city/${selectedCity}`)
      .then((response) => {
        setSelectedVegetables(response.data.vegetables);
      })
      .catch((error) => {
        console.error("Error Fetching Vegetables: ", error);
        setSelectedVegetables([]);
      });
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <select id="cityInput" value={selectedCity} onChange={handleCityChange}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city._id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <button className="main-btn" onClick={handleSearch}>
        Search
      </button>
      <br />
      <br />
      <br />
      <div className="vegetable-list">
        {selectedVegetables.map((vegetable) => (
          <VegetableItem
            key={vegetable.name}
            image={`images/vegetables/${vegetable.name
              .toLowerCase()
              .split(` `)
              .join(`_`)}.jpeg`}
            name={vegetable.name}
            price={vegetable.price}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default CitySearch;
