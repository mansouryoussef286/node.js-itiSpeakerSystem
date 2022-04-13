const mongoose = require("mongoose");

// create schema
let studentSchema = new mongoose.Schema({
    _id: Number,
    Email: { type: String, required: true },
    password: { type: String, required: true }
})

// register to a collection
module.exports = mongoose.model("students", studentSchema);