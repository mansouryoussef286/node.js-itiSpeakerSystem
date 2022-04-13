const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    // is the request of login is registered in the db?
    // if registered add token according to the role 
    // if not then redirect to sign up
}