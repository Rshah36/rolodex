/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// we haven't set up user login yet, so just
// use a hardcoded name for now
const MY_NAME = "rshah36";

// import models so we can interact with the database
const Contact = require("./models/contact");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

router.get("/contacts", (req, res) => {
  // empty selector means get all documents
  Contact.find({}).then((contacts) => res.send(contacts));
});

router.post("/contact", (req, res) => {
  const newContact = new Contact({
    first_name: req.body.first,
    last_name: req.body.last,
    rank: req.body.rank,
    current_unit: req.body.unit,
    notes: req.body.notes,
  });

  newContact.save().then((contact) => res.send(contact));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});


module.exports = router;
