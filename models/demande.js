const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const demandeSchema = new Schema({
  auteur: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  userId: {type: mongoose.Types.ObjectId, required: true, ref: "User"}
});

module.exports = mongoose.model("Demande", demandeSchema);
