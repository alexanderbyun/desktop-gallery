// ---------------------------------
// Dependencies
// ---------------------------------
const express = require('express');
const { path } = require('express/lib/application');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;

    //no variable needed below; just allows .env file to be pulled from directory
require('dotenv').config();


// ---------------------------------
// Port
// ---------------------------------
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;


// ---------------------------------
// Database
// ---------------------------------
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
// const mongoURI = "mongodb://localhost:27017/desks"


// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, () => {
  console.log('Mongo live')
});

// mongoose.connect(mongoURI, () => {
//   console.log('Mongo live')
// });

// Error / success
// db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
// db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
// db.on('disconnected', () => console.log('mongo disconnected'));


// ---------------------------------
// Middleware
// ---------------------------------

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


// ---------------------------------
// Models
// ---------------------------------
const Desks = require("./models/schema.js");
const desksSeed = require("./models/seed.js");


// ---------------------------------
// Routes
// ---------------------------------

// Edit
app.get("/:id/edit", (req, res) => {
  Desks.findById(req.params.id, (err, foundDesks) => {
    res.render("edit.ejs", {
      desks: foundDesks,
    });
  });
});

// Update
app.put("/:id", (req, res) => {
  Desks.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedDesks) => {
      if (err) {
        console.log(err.message);
      } else {
        res.redirect(req.params.id);
      }
    }
  );
});

// Delete
app.delete("/:id", (req, res) => {
  Desks.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      res.redirect("/gallery");
    }
  });
});

// NEW
app.get("/new", (req, res) => {
  res.render("new.ejs");
});

// Index
app.get("/", (req, res) => {
  res.render("index.ejs"
  );
});

// Gallery
app.get("/gallery", (req, res) => {
  Desks.find({}, (err, allDesks) => {
    res.render("gallery.ejs", {
      desks: allDesks,
    });
  });
});

// Show
app.get('/:id', (req, res) => {
  Desks.findById(req.params.id,(error,foundDesk) => {
    res.render('show.ejs',{
      desks: foundDesk,
    });
  });
});

// Create
app.post("/", (req, res) => {
  Desks.create(req.body, (err, createdDesks) => {
    res.redirect("/gallery");
  });
});

// Seed data add webpage
// app.get('/seed', (req, res)=>{
//   Desks.create(desksSeed,
//       (err, desksSeed)=>{
//         res.redirect('/');
//       }
//   )
// })


// ---------------------------------
// Listener
// ---------------------------------
app.listen(PORT, () => console.log( 'Listening on port:', PORT));


// ---------------------------------
// Seed data add
// ---------------------------------
// Desks.create(desksSeed, (err, data) => {
//   if (err) console.log(err.message);
//   console.log("Added provided desks data");
// });


// ---------------------------------
// Drop collection
// ---------------------------------
// Desks.collection.drop();