const mongoose = require("mongoose");

const Produits = require("../models/barter-item")

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  products: [{type: mongoose.Types.ObjectId, required:true, ref:"BarterItem"}]
});

module.exports = mongoose.model("User", userSchema);
