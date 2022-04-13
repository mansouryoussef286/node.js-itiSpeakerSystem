// import libraries
const express = require("express");
const { body, param, query } = require("express-validator");

const studentsController = require("../Controllers/studentsController");

//initialize router
const router = express.Router();

//assign router's methods
router.route("/students")
    .get(studentsController.getAllstudents)
    .post(
        [
            body("id").isInt().withMessage("id should be int"),
            body("email").isEmail().withMessage("email is not correct"),
            body("password").isAlphanumeric().isLength({ min: 8, max: 15 }).withMessage("password must between 8 and 15")
        ],
        studentsController.addstudent)
    .put(
        [
            body("id").isInt().withMessage("id should be int"),
            body("email").isEmail().withMessage("email is not correct"),
            body("password").isAlphanumeric().isLength({ min: 8, max: 15 }).withMessage("password must between 8 and 15")
        ],
        studentsController.updatestudent)

router.route("/students/:id")
    .get(
        [
            param("id").isInt().withMessage("id is not integer")
        ],
        studentsController.getstudentByID)
    .delete(
        [
            param("id").isInt().withMessage("id is not integer")
        ],
        studentsController.deletestudent);

// export the router
module.exports = router;