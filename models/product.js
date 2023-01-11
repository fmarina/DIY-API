const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  code: {
    required: true,
    type: Number,
  },
  stock: {
    required: true,
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
