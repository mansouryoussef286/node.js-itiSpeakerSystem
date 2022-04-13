const { validationResult } = require("express-validator");
module.exports = (request) => {
    let result = validationResult(request);
    // if there is an error
    if (!result.isEmpty()) {
        let errorMessage = result.array().reduce((current, error) => {
            return current + error.msg + ", "
        }, " ");
        // console.log(errorMessage);
        let error = new Error(errorMessage);
        error.status = 422;
        throw error;
    }
}