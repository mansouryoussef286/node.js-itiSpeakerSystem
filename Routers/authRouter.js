// import libraries
const express = require("express");
const { body, param, query } = require("express-validator");

const authController = require("../Controllers/authController")

//initialize router
const router = express.Router();

//assign router's methods
router.route("/login")
    .post(
        [
            body("email").isEmail().withMessage("email is not correct"),
            body("password").isAlphanumeric().isLength({ min: 8, max: 15 }).withMessage("password must between 8 and 15")
        ],
        authController.login);

module.exports = router;