const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const barterItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  category:{ type: String, required: true}
});

module.exports = mongoose.model("BarterItem", barterItemSchema);
