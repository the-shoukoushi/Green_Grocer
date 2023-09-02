// auth.js

const express = require("express");
const router = express.Router();
const City = require("../models/cityschema"); // Import your City model
const User = require("../models/userschema"); // Import your User model

router.get("/cities", async (req, res) => {
  try {
    const cities = await City.find({}, { name: 1 }); // Fetch only city names
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/city/:cityName", async (req, res) => {
  const cityName = req.params.cityName;

  try {
    const city = await City.findOne({ name: cityName });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to Cart functionality
router.post("/add-to-cart", async (req, res) => {
  const { userId, itemName, itemPrice, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the item to the user's cart
    user.cart.push({
      name: itemName,
      price: itemPrice,
      quantity,
    });

    await user.save();
    res.json({ message: "Item added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Cart functionality
router.get("/get-cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's cart
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete item from Cart functionality
router.delete("/delete-from-cart/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
    await user.save();
    res.json({ message: "Item deleted from cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Cart Quantity functionality
router.put("/update-cart-quantity/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;
  const { action } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const item = user.cart.find((item) => item._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }

    await user.save();
    res.json({ message: "Cart quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
