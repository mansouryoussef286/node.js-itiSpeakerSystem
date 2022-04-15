const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    let token, decodedToken;
    try {
        // split to remove keyword Bearer in the request header
        token = request.get("Authorization").split(" ")[1];
        decodedToken = jwt.verify(token, "thisismysecuritykey");
        //authenticated
        request.role = decodedToken.role;
        next();
    } catch (error) {
        next(new Error("Not Authenticated"));
    }
}