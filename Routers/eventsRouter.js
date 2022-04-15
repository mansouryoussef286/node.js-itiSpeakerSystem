// import libraries
const express = require("express");
const { body, param, query } = require("express-validator");

const eventsController = require("../Controllers/eventsController")

//initialize router
const router = express.Router();

// authorization middle ware || i put it in the main app.js as the whole app have no guests clients
// const authorizationMW = require("./../middle wares/authorizationMiddleWare");
// router.use(authorizationMW);s

//assign router's methods
router.route("/events")
    .get(eventsController.getAllEvents)
    .post(
        [
            body("id").isInt().withMessage("id should be int"),
            body("title").isString().withMessage("title is incorrect"),
            body("date").isDate().withMessage("date is invalid")
        ],
        eventsController.addEvent)
    .put(
        [
            body("id").isInt().withMessage("id should be int"),
            body("title").isString().withMessage("title is incorrect"),
            body("date").isDate().withMessage("date is invalid")
        ],
        eventsController.updateEvent);

router.route("/events/:id")
    .get(
        [
            param("id").isInt().withMessage("id should be int")
        ],
        eventsController.getEventByID)
    .delete(
        [
            param("id").isInt().withMessage("id should be int")
        ],
        eventsController.deleteEvent);

// export the router
module.exports = router;