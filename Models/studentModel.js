const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");


// create schema
let studentSchema = new mongoose.Schema({
    // _id: Number,
    Email: { type: String, required: true },
    password: { type: String, required: true }
})

// auto incrementing
let connection = mongoose.createConnection("mongodb://127.0.0.1:27017/itiSpeakers");
autoIncrement.initialize(connection);
studentSchema.plugin(autoIncrement.plugin, { model: "students", startAt: 1 });

// register to a collection
module.exports = mongoose.model("students", studentSchema);

// an error during installing auto increment package
/*PS C:\Users\Blu-Ray\OneDrive\Desktop\iti\nodejs\project> npm install mongoose-auto-increment --save
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: project@1.0.0
npm ERR! Found: mongoose@6.2.11
npm ERR! node_modules/mongoose
npm ERR!   mongoose@"^6.2.10" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer mongoose@"^4.1.12" from mongoose-auto-increment@5.0.1
npm ERR! node_modules/mongoose-auto-increment
npm ERR!   mongoose-auto-increment@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force, or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR! See C:\Users\Blu-Ray\AppData\Local\npm-cache\eresolve-report.txt for a full report.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Blu-Ray\AppData\Local\npm-cache\_logs\2022-04-14T15_31_47_453Z-debug-0.log*/