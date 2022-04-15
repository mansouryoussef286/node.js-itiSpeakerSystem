// connect to the data base
const student = require("./../Models/studentModel");
const checkValidation = require("./../middle wares/checkValidationFn");
const req = require("express/lib/request");


// CRUD operations
module.exports.getAllstudents = (request, response, next) => {
    student.find({})
        .then((data) => {
            response.status(200).json({ message: "get all students", data });
        })
        .catch(error => next(error));
}

module.exports.getstudentByID = (request, response, next) => {
    checkValidation(request);
    student.find({ _id: request.params.id })
        .then((data) => {
            if (data.length > 0)
                response.status(200).json({ message: "get student by id", data });
            else
                throw new Error("student doesnot exist");
        })
        .catch(error => next(error));
}

module.exports.addstudent = (request, response, next) => {
    //no error then add the student
    checkValidation(request);
    // check for email uniqueness
    student.findOne({ Email: request.body.email })
        .then((data) => {
            if (data)
                throw new Error("this email is already taken");
            // add the student
            let newStudent = new student({
                _id: request.body.id,
                Email: request.body.email,
                password: request.body.password
            });
            newStudent.save()
                .then((data) => {
                    response.status(201).json({
                        message: "student added",
                        data
                    });
                })
                .catch((error) => {
                    next(error);
                });
        })
        .catch(error => next(error));
}

module.exports.updatestudent = (request, response, next) => {
    //no error then add the student
    checkValidation(request);
    if (request.role != "student")
        throw new Error("Not Authorized!");
    // check for email uniqueness
    student.findOne({ Email: request.body.email })
        .then((data) => {
            if (data)
                throw new Error("this email is already taken");
            // update the student
            student.updateOne({ _id: request.body.id }, {
                $set: {
                    Email: request.body.email,
                    password: request.body.password,
                }
            }).then((data) => {
                if (data.matchedCount != 0)
                    response.status(200).json({ message: "student updated", data });
                else
                    throw new Error("student doesnot exist");
            }).catch(error => next(error));
        }).catch(error => next(error));
}

module.exports.deletestudent = (request, response, next) => {
    checkValidation(request);
    student.deleteOne({ _id: request.params.id })
        .then((data) => {
            if (data.deletedCount != 0)
                response.status(200).json({ message: "student deleted", data })
            else
                throw new Error("student doesnot exist");
        }).catch(error => next(error))
}