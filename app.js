// use the express
const express = require("express");
// use the body parser
const body_parser = require("body-parser");
// use mongoose
const mongoose = require("mongoose");


// get the routers
const authRouter = require("./Routers/authRouter");
const eventRouter = require("./Routers/eventsRouter");
const studentRouter = require("./Routers/studentsRouter");
const speakerRouter = require("./Routers/speakersRouter");

// initiate server and start listening
let server = express();
mongoose.connect("mongodb://127.0.0.1:27017/itiSpeakers")
    .then(() => {
        console.log("DB conneccted!");
        server.listen(process.env.PORT || 2525, () => {
            console.log("server started.....");
        })
    })
    .catch(() => {
        console.log("DB connection problem");
    })


// CORS cross domain allow origins

// logger middle ware
server.use((request, response, next) => {
    console.log(request.url, request.method);
    next();
})



// use the body parsing middle ware
server.use(body_parser.json());
server.use(body_parser.urlencoded({ extended: "false" }));


// login authentication middle ware
server.use(authRouter);
// routing middle wares
server.use(eventRouter);
server.use(studentRouter);
server.use(speakerRouter);

// not found middle ware
server.use((request, response) => {
    response.status(404).json({ message: "not found 404" });
})

// error middle ware
server.use((error, request, response, next) => {
    response.status(500).json({ message: error + "" });
})