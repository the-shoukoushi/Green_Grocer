const mongoose = require("mongoose");

const vegetableSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const citySchema = new mongoose.Schema({
  name: String,
  vegetables: [vegetableSchema],
});

const City = mongoose.model("City", citySchema);

module.exports = City;
