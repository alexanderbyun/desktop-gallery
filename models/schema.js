const mongoose = require("mongoose");

const desksSchema = new mongoose.Schema(
  {
    monitor: String,
    mount: String,
    speakers: Date,
    keyboard: Number,
    mouse: Number,
    image: String,
  },
);

// check "Parks" plural vs. singular impact
const desksCollection = mongoose.model("Desks", desksSchema);

module.exports = desksCollection;