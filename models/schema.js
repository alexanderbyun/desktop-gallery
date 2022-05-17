const mongoose = require("mongoose");

const desksSchema = new mongoose.Schema(
    {
        submitter: String,
        monitor: String,
        mount: String,
        speakers: String,
        keyboard: String,
        mouse: String,
        image: String,
    },
);

const desksCollection = mongoose.model("Desks", desksSchema);

module.exports = desksCollection;