// -------------------------------------------------
// Dependencies
// -------------------------------------------------
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;

    //no variable needed below; just allows .env file to be pulled from directory
require('dotenv').config()


// -------------------------------------------------
// Port
// -------------------------------------------------
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;


// -------------------------------------------------
// Database
// -------------------------------------------------
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
  console.log('Mongo live')
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


// -------------------------------------------------
// Middleware
// -------------------------------------------------

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


// -------------------------------------------------
// Models
// -------------------------------------------------
const Desks = require("./models/schema.js");
const desksSeed = require("./models/seed.js");


// -------------------------------------------------
// Routes
// -------------------------------------------------

// NEW View
// app.get("/new", (req, res) => {
//   res.render("new.ejs");
// });

// Edit
// GET /:id/edit
// app.get("/:id/edit", (req, res) => {
//   Desks.findById(req.params.id, (err, foundDesks) => {
//     res.render("edit.ejs", {
//       desks: foundDesks,
//     });
//   });
// });

// Update
// PUT /:id
// app.put("/:id", (req, res) => {
//   Desks.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, updatedDesks) => {
//       if (err) {
//         console.log(err.message);
//       } else {
//         res.redirect("/desks");
//       }
//     }
//   );
// });

// DELETE desks/:id
// app.delete("/:id", (req, res) => {
//   Desks.findByIdAndRemove(req.params.id, (err, data) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       res.redirect("/desks");
//     }
//   });
// });

// Show
// GET desks/:id
// app.get("/:id", (req, res) => {
//   Desks.findById(req.params.id, (err, foundDesks) => {
//     res.render("show.ejs", {
//       desks: foundDesk,
//     });
//   });
// });

// GET
app.get("/", (req, res) => {
  res.render("index.ejs"
  );
});

// app.get("/", (req, res) => {
//   Desks.find({}, (err, allDesks) => {
//     res.render("index.ejs", {
//       desks: alldesks,
//     });
//   });
// });

// Create
// POST new desk
// app.post("/", (req, res) => {
//   Desks.create(req.body, (err, createdPark) => {
//     res.redirect("/desks");
//   });
// });


// -------------------------------------------------
// Listener
// -------------------------------------------------
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

// -------------------------------------------------
// Seed data add
// -------------------------------------------------
Desks.create(desksSeed, (err, data) => {
  if (err) console.log(err.message);
  console.log("Added provided desks data....");
});

// -------------------------------------------------
// Drop collection
// -------------------------------------------------
// Desks.collection.drop();