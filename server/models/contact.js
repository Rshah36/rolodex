const mongoose = require("mongoose");

//define a contact schema for the database
const ContactSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  rank: String,
  current_unit: String,
  notes: String,
//   connected_to: [{ body: String, date: String }],
});

// compile model from schema
module.exports = mongoose.model("contact", ContactSchema);
