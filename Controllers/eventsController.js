const event = require("./../Models/eventModel");
// const mongoose = require("mongoose");
// const checkValidation = require("./../middle wares/checkValidationFn");
const checkValidationFn = require("../middle wares/checkValidationFn");


// CRUD operations
module.exports.getAllEvents = (request, response, next) => {
    response.status(200).json({ message: "get all Events" });
}
module.exports.getEventByID = (request, response, next) => {
    event.find({ _id: request.params.id })
        .then((data) => {
            if (data.length > 0)
                response.status(200).json({ message: "get event by ID", data });
            else
                throw new Error("event doesnot exist");
        })
        .catch(error => next(error));
}
module.exports.addEvent = (request, response, next) => {
    console.log(request.body);
    checkValidationFn(request);
    let newEvent = new event({
        _id: request.body.id,
        title: request.body.title,
        date: request.body.date,
        mainSpeakerID: request.body.mainSpeakerID,
        otherSpeakersID: request.body.otherSpeakersID,
        students: request.body.students,
    });
    newEvent.save()
        .then((data) => {
            response.status(201).json({ message: "speaker added", data });
        }).catch(error => next(error));
}
module.exports.updateEvent = (request, response, next) => {
    response.status(200).json({ message: "update Event" });
}
module.exports.deleteEvent = (request, response, next) => {
    response.status(200).json({ message: "delete Event" });
}