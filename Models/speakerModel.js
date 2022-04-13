const mongoose = require("mongoose");

// create schema
let speakerSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId },
    Email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: {
        city: { type: String },
        street: { type: String },
        building: { type: String }
    }
})

// register to a collection
module.exports = mongoose.model("speakers", speakerSchema);