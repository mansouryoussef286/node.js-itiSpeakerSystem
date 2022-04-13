const jwt = require("jsonwebtoken");
const student = require("./../Models/studentModel");
const speaker = require("./../Models/speakerModel");
const checkValidation = require("./../middle wares/checkValidationFn");
const bcrypt = require('bcrypt');
const { reject } = require("bcrypt/promises");

const adminEmail = "admin@gmail.com";
const adminPW = "admin123";

module.exports.login = async(request, response, next) => {
    checkValidation(request);
    const email = request.body.email;
    let password = request.body.password;
    let loggedIn = false;

    // check if it's the admin
    if (email == adminEmail && password == adminPW) {
        let token = jwt.sign({
                role: "admin"
            },
            "thisismysecuritykey", { expiresIn: "1h" })
        response.status(200).json({ message: "admin logged in", token });
        loggedIn = true;
    } else if (!loggedIn) {
        // check if it's a student
        await student.findOne({
            Email: email,
            password: password
        }).then((data) => {
            console.log("std");
            console.log(data);
            if (data) {
                let token = jwt.sign({
                        role: "student"
                    },
                    "thisismysecuritykey", { expiresIn: "1h" })
                response.status(200).json({ message: "student logged in", token });
                loggedIn = true;
                console.log("std");
            }
            console.log("std-");
            console.log(loggedIn);
        }).catch(error => next(error));


        if (!loggedIn) {
            // check if it's a speaker
            console.log("speaker");
            await speaker.findOne({
                Email: email
            }).then(async data => {
                console.log("speaker 2");
                if (data) {
                    await bcrypt.compare(password, data.password, (err, result) => {
                        // if the password matches the hashed password for that speaker
                        console.log("decrypt 3");

                        if (result) {
                            let token = jwt.sign({
                                    role: "speaker"
                                },
                                "thisismysecuritykey", { expiresIn: "1h" });
                            response.status(200).json({ message: "speaker logged in", token });
                            loggedIn = true;
                        } else {
                            throw new Error("username or password incorrect");
                        }
                    });
                    console.log("speaker 4");
                }
            }).catch(error => next(error));
        }
    }
    // no one  then respond with error
    // if (!loggedIn) {
    //     throw new Error("username or password incorrect");
    // }
}

// async function decryptAsync(data) {
//     if (data) {
//         await bcrypt.compare(password, data.password, (err, result) => {
//             // if the password matches the hashed password for that speaker
//             if (result) {
//                 let token = jwt.sign({
//                         role: "speaker"
//                     },
//                     "thisismysecuritykey", { expiresIn: "1h" });
//                 response.status(200).json({ message: "speaker logged in", token });
//                 loggedIn = true;
//             }
//         });
//     }
// }

// // function decryptAsyncPromise(data) {
// //     return new Promise((resolve, reject) => {
// //         bcrypt.compare(password, data.password, (err, result) => {
// //             // if the password matches the hashed password for that speaker
// //             if (result) {
// //                 let token = jwt.sign({
// //                         role: "speaker"
// //                     },
// //                     "thisismysecuritykey", { expiresIn: "1h" });
// //                 response.status(200).json({ message: "speaker logged in", token });
// //                 loggedIn = true;
// //             }
// //         });
// //     })
// // }
// function decryptAsyncPromise(data) {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(password, data.password, (err, result) => {
//             // if the password matches the hashed password for that speaker
//             if (result)
//                 resolve(result);
//             else
//                 reject(err)
//         });
//     })
// }