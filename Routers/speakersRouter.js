// import libraries
const express = require("express");
const { body, param, query } = require("express-validator");

const speakersController = require("../Controllers/speakersController");

//initialize router
const router = express.Router();

//assign router's methods
router.route("/speakers")
    .get(speakersController.getAllSpeakers)
    .post(
        [
            body("email").isEmail().withMessage("email is not correct"),
            body("password").isAlphanumeric().isLength({ min: 8, max: 15 }).withMessage("password must between 8 and 15"),
            body("username").notEmpty().withMessage("you must enter a username")
        ],
        speakersController.addSpeaker)
    .put(
        [
            body("email").isEmail().withMessage("email is not correct"),
            body("password").isAlphanumeric().isLength({ min: 8, max: 15 }).withMessage("password must between 8 and 15"),
            body("username").notEmpty().withMessage("you must enter a username")
        ],
        speakersController.updateSpeaker);

router.route("/speakers/:id")
    .get(speakersController.getSpeakerByID)
    .delete(speakersController.deleteSpeaker);


// export the router
module.exports = router;