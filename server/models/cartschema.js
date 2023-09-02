// models/cartschema.js

const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
