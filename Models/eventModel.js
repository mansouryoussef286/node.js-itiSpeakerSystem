const mongoose = require("mongoose");

// create schema
let eventSchema = new mongoose.Schema({
    _id: { type: Number },
    title: { type: String, required: true },
    date: { type: Date },
    mainSpeakerID: { type: mongoose.Types.ObjectId, ref: "speakers" },
    otherSpeakersID: [{ type: mongoose.Types.ObjectId, ref: "speakers" }],
    students: [{ type: Number, ref: "students" }]
})

// register to a collection
module.exports = mongoose.model("events", eventSchema);